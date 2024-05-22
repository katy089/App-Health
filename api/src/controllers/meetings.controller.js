const {
  MEETINGS,
  DOCTORS,
  PATIENTS,
  UNIVERSAL_CATALOGUE,
} = require("../database/db");
const { ClientError } = require("../lib/errors");

const { createGoogleMeetEvent } = require("../lib/google");

const getMeetingsController = async (id, role) => {
  if (role === "doctor") {
    const meetings = await MEETINGS.findAll({
      where: {
        id_doctor: id,
      },
      include: [
        {
          model: DOCTORS,
          as: "doctor_meeting",
          attributes: ["id_doctor", "fullname", "email"],
          include: {
            model: UNIVERSAL_CATALOGUE,
            as: "speciality",
            attributes: ["name"],
          },
        },
        {
          model: PATIENTS,
          as: "patient_meeting",
          attributes: ["id_patient", "fullname", "email"],
        },
      ],
    });

    if (!meetings) return [];
    return meetings;
  } else if (role === "patient") {
    const meetings = await MEETINGS.findAll({
      attributes: ["id_meeting", "consult_reason", "link", "date"],
      where: {
        id_patient: id,
      },
      include: [
        {
          model: DOCTORS,
          as: "doctor_meeting",
          attributes: ["id_doctor", "fullname", "email"],
          include: {
            model: UNIVERSAL_CATALOGUE,
            as: "speciality",
            attributes: ["name"],
          },
        },
        {
          model: PATIENTS,
          as: "patient_meeting",
          attributes: ["id_patient", "fullname", "email"],
        },
      ],
    });

    if (!meetings) return [];
    return meetings;
  }
};

const getMeetingController = async (id_meeting) => {
  const meeting = await MEETINGS.findOne({
    attributes: ["id_meeting", "consult_reason", "link", "date"],
    where: {
      id_meeting,
    },
    include: [
      {
        model: DOCTORS,
        as: "doctor_meeting",
        attributes: ["id_doctor", "fullname", "email", "sex", "profile_image"],
        include: {
          model: UNIVERSAL_CATALOGUE,
          as: "speciality",
          attributes: ["id_universal_catalogue", "name"],
        },
      },
      {
        model: PATIENTS,
        as: "patient_meeting",
        attributes: [
          "id_patient",
          "fullname",
          "email",
          "password",
          "sex",
          "profile_image",
        ],
      },
    ],
  });

  if (!meeting) throw new ClientError("The meet with this id not exist", 404);

  return meeting;
};

const postMeetingController = async (
  consult_reason,
  date,
  id_patient,
  id_doctor
) => {
  const patient = await PATIENTS.findByPk(id_patient);

  if (!patient) throw new ClientError("This patient id not exist in database");

  const link = await createGoogleMeetEvent(
    patient.dataValues.email,
    consult_reason,
    date
  );

  const meet = await MEETINGS.create({
    consult_reason,
    link,
    date,
    id_doctor,
    id_patient,
  });

  if (!meet) throw new ClientError("Could not create the meet", 500);
  return meet;
};

const deleteMeetingController = async (id_meeting) => {
  const meeting = MEETINGS.destroy({
    where: {
      id_meeting,
    },
    force: true,
  });

  if (!meeting)
    throw new ClientError("The meeting could not to be deleted", 500);
};

module.exports = {
  getMeetingsController,
  getMeetingController,
  postMeetingController,
  deleteMeetingController,
};
