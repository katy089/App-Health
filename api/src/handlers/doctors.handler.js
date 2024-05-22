const {
  getDoctorsController,
  getDoctorController,
  putDoctorController,
} = require("../controllers/doctors.controller");

const { dataResponse, messageResponse } = require("../lib/response");
const { ClientError } = require("../lib/errors");

const getDoctorsHandler = async (req, res, next) => {
  try {
    const { fullname, sex, speciality } = req.query;

    const doctors = await getDoctorsController(fullname, sex, speciality);

    dataResponse(res, 200, doctors);
  } catch (error) {
    next(error);
  }
};

const getDoctorHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new ClientError("Missing id");

    const doctor = await getDoctorController(id);

    dataResponse(res, 200, doctor);
  } catch (error) {
    next(error);
  }
};

const putDoctorHandler = async (req, res, next) => {
  try {
    const { id_doctor } = req.user;
    const { fullname, email, sex, id_speciality } = req.body;

    if (!fullname || !email || !sex || !id_speciality)
      throw new ClientError("Missing data");

    await putDoctorController(id_doctor, fullname, email, sex, id_speciality);

    messageResponse(res, 200, "The user was edited successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDoctorsHandler,
  getDoctorHandler,
  putDoctorHandler,
};
