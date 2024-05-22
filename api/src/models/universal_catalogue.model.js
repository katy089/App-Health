const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "UNIVERSAL_CATALOGUE",
    {
      id_universal_catalogue: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
};
