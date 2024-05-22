const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "CHAT_MESSAGES",
    {
      id_chat_message: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      sender_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      sender_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      sender_role: {
        type: DataTypes.STRING,
        allowNull: null,
        validate: {
          isIn: {
            args: [["doctor", "patient"]],
            msg: "Must be patient or doctor",
          },
        },
      },
    },
    { freezeTableName: true, timestamps: true, paranoid: true }
  );
};
