const { CHAT, CHAT_MESSAGES, DOCTORS, PATIENTS } = require("../../database/db");
const { Op } = require("sequelize");

const { ClientError } = require("../../lib/errors");

const getChatsController = async (id) => {
  const chats = await CHAT.findAll({
    attributes: ["id_chat", "consult_reason"],
    where: {
      [Op.or]: {
        id_doctor: id,
        id_patient: id,
      },
    },
    include: [
      {
        model: DOCTORS,
        as: "doctor_chat",
        attributes: ["id_doctor", "fullname", "profile_image"],
      },
      {
        model: PATIENTS,
        as: "patient_chat",
        attributes: ["id_patient", "fullname", "profile_image"],
      },
    ],
  });

  if (!chats) return [];
  return chats;
};

const getChatController = async (id_chat) => {
  const chat_messages = await CHAT.findOne({
    where: {
      id_chat,
    },
    include: [
      {
        model: DOCTORS,
        as: "doctor_chat",
        attributes: ["id_doctor", "fullname", "email"],
      },
      {
        model: PATIENTS,
        as: "patient_chat",
        attributes: ["id_patient", "fullname", "email"],
      },
      {
        model: CHAT_MESSAGES,
        as: "messages",
        attributes: [
          "id_chat_message",
          "message",
          "sender_id",
          "sender_name",
          "sender_role",
          "createdAt",
        ],
      },
    ],
    order: [["messages", "createdAt", "ASC"]],
  });

  if (!chat_messages)
    throw new ClientError("The chat with this id not exists", 404);
  return chat_messages;
};

const postChatController = async (consult_reason, id_doctor, id_patient) => {
  const chat = CHAT.create({
    consult_reason,
    id_doctor,
    id_patient,
  });

  if (!chat) throw new ClientError("This chat could not to be created", 500);
  return chat;
};

const deleteChatController = async (id_chat) => {
  await CHAT_MESSAGES.destroy({
    where: {
      id_chat,
    },
    force: true,
  });

  await CHAT.destroy({
    where: {
      id_chat,
    },
    force: true,
  });
};

module.exports = {
  getChatsController,
  getChatController,
  postChatController,
  deleteChatController,
};
