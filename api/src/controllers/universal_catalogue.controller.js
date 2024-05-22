const { Op } = require("sequelize");
const { UNIVERSAL_CATALOGUE } = require("../database/db");
const { ClientError } = require("../lib/errors");

const getSpecialitysController = async (name) => {
  const specialitys = UNIVERSAL_CATALOGUE.findAll({
    where: {
      catalogue_type: "9e01c8ed-a098-4bf1-9db9-8a3d645668ba",
      name: { [Op.like]: name ? `%${name}%` : "%%" },
      [Op.not]: {
        name: "doctor_speciality",
      },
    },
  });

  if (!specialitys) throw new ClientError("Doctors speciality not exists", 404);
  return specialitys;
};

const postSpecialityController = async (name) => {
  const [speciality, created] = await UNIVERSAL_CATALOGUE.findOrCreate({
    where: {
      name,
      catalogue_type: "9e01c8ed-a098-4bf1-9db9-8a3d645668ba",
    },
  });

  // if (!created) throw new ClientError("This speciality already exist");
  return speciality;
};

module.exports = {
  getSpecialitysController,
  postSpecialityController,
};
