require("dotenv").config();
const { Sequelize } = require("sequelize");
const {
  handlerSequelizeModels,
  handlerAssociationModels,
} = require("./associations.js");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_ONLINE_URL, DB_MODE } =
  process.env;

let sequelize;

switch (DB_MODE) {
  case "online":
    sequelize = new Sequelize(DB_ONLINE_URL, {
      logging: false,
      native: false,
    });
    break;
  case "local":
    sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      dialect: "mysql",
      logging: false,
      native: false,
    });
    break;
}

handlerSequelizeModels({ sequelize }); //generate sequelize models
handlerAssociationModels({ sequelize }); //generate models associations

module.exports = {
  ...sequelize.models,
  connection: sequelize,
};
