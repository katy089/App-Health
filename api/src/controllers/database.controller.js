const universal_catalogue = require("../lib/MOCK_DATA/universal_catalogue.json");
const admins = require("../lib/MOCK_DATA/admins.json");
const doctors = require("../lib/MOCK_DATA/doctors.json");
const patients = require("../lib/MOCK_DATA/patients.json");
const chat = require("../lib/MOCK_DATA/chat.json");
const chat_messages = require("../lib/MOCK_DATA/chat_messages.json");

const {
  ADMINS,
  DOCTORS,
  PATIENTS,
  UNIVERSAL_CATALOGUE,
  CHAT,
  CHAT_MESSAGES,
} = require("../database/db");

const postDatabaseDataController = async () => {
  const haveAdmins = await ADMINS.findOne();
  const haveDoctors = await DOCTORS.findOne();
  const havePatients = await PATIENTS.findOne();

  if (!haveAdmins) {
    for (let register of admins) {
      ADMINS.findOrCreate({
        where: register,
      });
    }
  }

  if (!haveDoctors) {
    for (let register of doctors) {
      DOCTORS.findOrCreate({
        where: register,
      });
    }
  }

  if (!havePatients) {
    for (let register of patients) {
      PATIENTS.findOrCreate({
        where: register,
      });
    }
  }
};

const postSpecialityCatalogueController = async () => {
  const [specialityRegister, created] = await UNIVERSAL_CATALOGUE.findOrCreate({
    where: {
      id_universal_catalogue: "9e01c8ed-a098-4bf1-9db9-8a3d645668ba",
      name: "doctor_speciality",
    },
  });

  if (created) {
    specialityRegister.set({
      catalogue_type: specialityRegister.dataValues.id_universal_catalogue,
    });

    specialityRegister.save();

    for (let register of universal_catalogue) {
      UNIVERSAL_CATALOGUE.findOrCreate({
        where: {
          ...register,
          catalogue_type: specialityRegister.dataValues.id_universal_catalogue,
        },
      });
    }
  }
};

const postChatsController = async () => {
  const haveChats = await CHAT.findOne();
  const haveChatMessages = await CHAT_MESSAGES.findOne();

  if (!haveChats) {
    for (let register of chat) {
      CHAT.findOrCreate({
        where: register,
      });
    }
  }

  if (!haveChatMessages) {
    for (let register of chat_messages) {
      CHAT_MESSAGES.findOrCreate({
        where: register,
      });
    }
  }
};

module.exports = {
  postDatabaseDataController,
  postSpecialityCatalogueController,
  postChatsController,
};
