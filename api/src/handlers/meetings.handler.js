const {
  getMeetingsController,
  getMeetingController,
  postMeetingController,
  deleteMeetingController,
} = require("../controllers/meetings.controller");

const { ClientError } = require("../lib/errors");
const { dataResponse, messageResponse } = require("../lib/response");

const getMeetingsHandler = async (req, res, next) => {
  try {
    const { id_doctor, id_patient } = req.user;
    let role = "",
      id;

    if (id_doctor) {
      id = id_doctor;
      role = "doctor";
    } else if (id_patient) {
      id = id_patient;
      role = "patient";
    } else throw new ClientError("Missing user id");

    const meetings = await getMeetingsController(id, role);

    dataResponse(res, 200, meetings);
  } catch (error) {
    next(error);
  }
};

const getMeetingHandler = async (req, res, next) => {
  try {
    const { meet } = req.params;

    if (!meet) throw new ClientError("Missing params");

    const meetDetails = await getMeetingController(meet);

    dataResponse(res, 200, meetDetails);
  } catch (error) {
    next(error);
  }
};

const postMeetingHandler = async (req, res, next) => {
  try {
    const { id_doctor } = req.user;
    const { consult_reason, date, id_patient } = req.body;

    if (!id_doctor || !date || !id_patient || !consult_reason)
      throw new ClientError("Missing data");

    const meet = await postMeetingController(
      consult_reason,
      date,
      id_patient,
      id_doctor
    );

    dataResponse(res, 201, meet);
  } catch (error) {
    next(error);
  }
};

const deleteMeetingHandler = async (req, res, next) => {
  try {
    const { meet } = req.params;

    if (!meet) throw new ClientError("Missing meet id");

    await deleteMeetingController(meet);

    messageResponse(res, 200, "The meeting was deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMeetingsHandler,
  postMeetingHandler,
  deleteMeetingHandler,
  getMeetingHandler,
};
