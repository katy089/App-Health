const fs = require("fs");
const path = require("path");

const handlerSequelizeModels = ({ sequelize }) => {
  const basename = path.basename(__filename);

  const modelDefiners = [];

  fs.readdirSync(path.join(__dirname, "../models"))
    .filter(
      (file) =>
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
    .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, "../models", file)));
    });

  modelDefiners.forEach((model) => model(sequelize));

  let entries = Object.entries(sequelize.models);
  let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1],
  ]);
  sequelize.models = Object.fromEntries(capsEntries);
};

const handlerAssociationModels = ({ sequelize }) => {
  const {
    DOCTORS,
    PATIENTS,
    MEETINGS,
    CHAT,
    CHAT_MESSAGES,
    UNIVERSAL_CATALOGUE,
  } = sequelize.models;

  // MEETINGS associations
  DOCTORS.hasMany(MEETINGS, {
    as: "doctor_meeting",
    foreignKey: {
      name: "id_doctor",
    },
  });

  PATIENTS.hasMany(MEETINGS, {
    as: "patient_meeting",
    foreignKey: {
      name: "id_patient",
    },
  });

  MEETINGS.belongsTo(DOCTORS, {
    as: "doctor_meeting",
    foreignKey: {
      name: "id_doctor",
    },
  });

  MEETINGS.belongsTo(PATIENTS, {
    as: "patient_meeting",
    foreignKey: {
      name: "id_patient",
    },
  });

  // CHAT associations
  DOCTORS.hasMany(CHAT, {
    as: "doctor_chat",
    foreignKey: {
      name: "id_doctor",
    },
  });

  PATIENTS.hasMany(CHAT, {
    as: "patient_chat",
    foreignKey: {
      name: "id_patient",
    },
  });

  CHAT.belongsTo(DOCTORS, {
    as: "doctor_chat",
    foreignKey: {
      name: "id_doctor",
    },
  });

  CHAT.belongsTo(PATIENTS, {
    as: "patient_chat",
    foreignKey: {
      name: "id_patient",
    },
  });

  // CHAT_MESSAGES associations
  CHAT.hasMany(CHAT_MESSAGES, {
    as: "messages",
    foreignKey: {
      name: "id_chat",
    },
  });

  CHAT_MESSAGES.belongsTo(CHAT, {
    as: "messages",
    foreignKey: {
      name: "id_chat",
    },
  });

  // UNIVERSAL_CATALOGUE
  UNIVERSAL_CATALOGUE.hasOne(UNIVERSAL_CATALOGUE, {
    foreignKey: {
      name: "catalogue_type",
    },
  });

  UNIVERSAL_CATALOGUE.belongsTo(UNIVERSAL_CATALOGUE, {
    foreignKey: {
      name: "catalogue_type",
    },
  });

  DOCTORS.belongsTo(UNIVERSAL_CATALOGUE, {
    as: "speciality",
    foreignKey: {
      name: "id_speciality",
    },
  });
};

module.exports = {
  handlerSequelizeModels,
  handlerAssociationModels,
};
