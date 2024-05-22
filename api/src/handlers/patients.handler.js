const {
  getPatientController,
  putPatientController,
} = require("../controllers/patients.controller");
const { dataResponse, messageResponse } = require("../lib/response");

const { ClientError } = require("../lib/errors");

const getPatientHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new ClientError("Missing data");

    const patient = await getPatientController(id);

    dataResponse(res, 200, patient);
  } catch (error) {
    next(error);
  }
};

const putPatientHandler = async (req, res, next) => {
  try {
    const { id_patient } = req.user;
    const { fullname, email, sex } = req.body;

    await putPatientController(id_patient, fullname, email, sex);

    messageResponse(res, 200, "The user was edited successfully");
  } catch (error) {}
};

module.exports = { getPatientHandler, putPatientHandler };
