const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "CHAT",
    {
      id_chat: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      consult_reason: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 50],
        },
      },
    },
    { freezeTableName: true, timestamps: true, paranoid: true }
  );
};
