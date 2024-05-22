const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "MEETINGS",
    {
      id_meeting: {
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

      link: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {
            msg: "Must be an url",
          },
        },
      },

      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: "Must be a date",
          },
        },
      },
    },
    { freezeTableName: true, timestamps: true, paranoid: true }
  );
};
