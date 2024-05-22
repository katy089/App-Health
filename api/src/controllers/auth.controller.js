const {
  ADMINS,
  DOCTORS,
  PATIENTS,
  UNIVERSAL_CATALOGUE,
} = require("../database/db");
const { ClientError } = require("../lib/errors");

// signup
const signUpAdminController = async (username, password) => {
  const [admins, created] = await ADMINS.findOrCreate({
    where: {
      username,
      password,
    },
  });

  if (!created) throw new ClientError("This user already exist");
};

const signUpDoctorController = async (
  fullname,
  email,
  password,
  sex,
  id_speciality
) => {
  const [doctors, created] = await DOCTORS.findOrCreate({
    where: {
      fullname,
      email,
      password,
      sex,
      id_speciality,
    },
  });

  if (!created) throw new ClientError("This user already exist");
};

const signUpPatientController = async (fullname, email, password, sex) => {
  const [patients, created] = await PATIENTS.findOrCreate({
    where: {
      fullname,
      email,
      password,
      sex,
    },
  });

  if (!created) throw new ClientError("This user already exist");
};

// login
const logInAdminController = async (username, password) => {
  const admin = await ADMINS.findOne({
    attributes: ["id_admin", "username"],
    where: {
      username,
      password,
    },
  });

  if (!admin) throw new ClientError("The username or password is incorrect");
  else return admin.dataValues;
};

const logInUserController = async (email, password, role) => {
  let user;

  if (role === "doctor") {
    user = await DOCTORS.findOne({
      attributes: ["id_doctor", "fullname", "email", "sex", "profile_image"],
      where: {
        email,
        password,
      },
      include: {
        model: UNIVERSAL_CATALOGUE,
        as: "speciality",
        attributes: ["id_universal_catalogue", "name"],
      },
    });
  } else if (role === "patient") {
    user = await PATIENTS.findOne({
      attributes: ["id_patient", "fullname", "email", "sex", "profile_image"],
      where: {
        email,
        password,
      },
    });
  }

  if (!user) throw new ClientError("The email or password is incorrect");
  else return user.dataValues;
};

const putUserPasswordController = async (
  id_doctor,
  id_patient,
  newPassword
) => {
  if (id_doctor) {
    const doctor = await DOCTORS.findByPk(id_doctor);

    await doctor.set({
      password: newPassword,
    });

    await doctor.save();
  } else if (id_patient) {
    const patient = await PATIENTS.findByPk(id_patient);

    await patient.set({
      password: newPassword,
    });

    await patient.save();
  } else ClientError("Missing id");
};

module.exports = {
  signUpAdminController,
  signUpDoctorController,
  signUpPatientController,
  logInAdminController,
  logInUserController,
  putUserPasswordController,
};
