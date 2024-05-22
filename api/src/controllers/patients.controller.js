const { PATIENTS } = require("../database/db");
// const { Op } = require("sequelize");'

const { ClientError } = require("../lib/errors");

const getPatientController = async (id_patient) => {
  const patient = await PATIENTS.findOne({
    attributes: ["id_patient", "fullname", "email", "sex", "profile_image"],
    where: {
      id_patient,
    },
  });

  if (!patient)
    throw new ClientError("The patient with this id not exist", 404);
  return patient;
};

const putPatientController = async (id_patient, fullname, email, sex) => {
  const patient = await PATIENTS.findByPk(id_patient);

  if (patient) {
    await patient.set({
      fullname,
      email,
      sex,
    });

    await patient.save();
  }
};

module.exports = {
  getPatientController,
  putPatientController,
};
