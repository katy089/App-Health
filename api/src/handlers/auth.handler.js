const {
  signUpAdminController,
  signUpDoctorController,
  signUpPatientController,
  logInAdminController,
  logInUserController,
  putUserPasswordController,
} = require("../controllers/auth.controller");
const { ClientError } = require("../lib/errors");
const { oauth2Client, scopes } = require("../lib/google");

const { messageResponse, dataResponse } = require("../lib/response");
const { generateToken } = require("../lib/jwt");

const signUpHandler = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (role === "admin") {
      const { username, password } = req.body;

      if (!username || !password)
        throw new ClientError("Missing admin user body data");

      await signUpAdminController(username, password);
    } else if (role) {
      const { fullname, email, password, sex } = req.body;

      if (!fullname || !email || !password || !sex)
        throw new ClientError("Missing user body data");

      if (role === "doctor") {
        const { id_speciality } = req.body;

        if (!id_speciality) throw new ClientError("Missing speciality id");

        await signUpDoctorController(
          fullname,
          email,
          password,
          sex,
          id_speciality
        );
      } else if (role === "patient")
        await signUpPatientController(fullname, email, password, sex);
    } else throw new ClientError("Missing the user role");

    messageResponse(res, 201, "The user was created successfully!");
  } catch (error) {
    next(error);
  }
};

const logInHandler = async (req, res, next) => {
  try {
    const { role } = req.body;
    let user;

    if (role === "admin") {
      const { username, password } = req.body;

      if (!username || !password) throw new ClientError("Missing body data");

      user = await logInAdminController(username, password);
    } else if (role) {
      const { email, password } = req.body;

      if (!email || !password) throw new ClientError("Missing body data");

      user = await logInUserController(email, password, role);
    } else throw new ClientError("Missing the user role");

    const token = generateToken({ ...user, role });

    dataResponse(res, 200, token);
  } catch (error) {
    next(error);
  }
};

const putUserPasswordHandler = async (req, res, next) => {
  try {
    const { id_doctor, id_patient } = req.user;
    const { newPassword } = req.body;
    await putUserPasswordController(id_doctor, id_patient, newPassword);

    messageResponse(res, 200, "The password was changed successfully!");
  } catch (error) {
    next(error);
  }
};

const getGoogleLoginUrl = (_req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  dataResponse(res, 200, url);
};

const googleRedirect = async (req, res) => {
  const { code } = req.query;

  const { tokens } = await oauth2Client.getToken(code).catch(() => {
    throw new ClientError("Couldn't get token", 401);
  });

  oauth2Client.setCredentials(tokens);

  res.redirect("https://health-link-web.onrender.com/create-teleconsult");
};

module.exports = {
  signUpHandler,
  logInHandler,
  putUserPasswordHandler,
  getGoogleLoginUrl,
  googleRedirect,
};
