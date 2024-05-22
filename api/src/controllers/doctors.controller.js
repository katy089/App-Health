const { DOCTORS, UNIVERSAL_CATALOGUE } = require("../database/db");
const { Op } = require("sequelize");

const { ClientError } = require("../lib/errors");

const getDoctorsController = async (fullname, sex, speciality) => {
  const doctors = await DOCTORS.findAll({
    attributes: ["id_doctor", "fullname", "email", "sex", "profile_image"],
    where: {
      fullname: {
        [Op.like]: fullname ? `%${fullname}%` : "%%",
      },
      sex: {
        [Op.like]: sex ? `%${sex}%` : "%%",
      },
    },
    include: {
      model: UNIVERSAL_CATALOGUE,
      as: "speciality",
      attributes: ["id_universal_catalogue", "name"],
      where: {
        id_universal_catalogue: {
          [Op.like]: speciality ? speciality : "%%",
        },
      },
    },
  });

  return doctors;
};

const getDoctorController = async (id) => {
  const doctor = await DOCTORS.findOne({
    attributes: ["id_doctor", "fullname", "email", "sex", "profile_image"],
    where: {
      id_doctor: id,
    },
    include: {
      model: UNIVERSAL_CATALOGUE,
      as: "speciality",
      attributes: ["id_universal_catalogue", "name"],
    },
  });

  if (!doctor) throw new ClientError("The doctor with this id not exist", 404);
  return doctor;
};

const putDoctorController = async (
  id_doctor,
  fullname,
  email,
  sex,
  id_especiality
) => {
  const doctor = await DOCTORS.findByPk(id_doctor);

  if (doctor) {
    await doctor.set({
      fullname,
      email,
      sex,
      id_especiality,
    });

    await doctor.save();
  }
};

module.exports = {
  getDoctorsController,
  getDoctorController,
  putDoctorController,
};
