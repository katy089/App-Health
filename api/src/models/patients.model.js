const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "PATIENTS",
    {
      id_patient: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
        validate: {
          isEmail: {
            msg: "Must be an email",
          },
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      sex: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [["male", "female"]],
            msg: "Must be male or female",
          },
        },
      },

      profile_image: {
        type: DataTypes.STRING,
        defaultValue:
          "https://res.cloudinary.com/dub4acwkh/image/upload/v1711998040/no_image/user_no_image_cz4nv3.webp",
        validate: {
          isUrl: {
            msg: "Must be an url",
          },
        },
      },

      //   historial_medico: {
      //     type: DataTypes. ARCHIVO?
      //   }
    },
    { freezeTableName: true, timestamps: true, paranoid: true }
  );
};
