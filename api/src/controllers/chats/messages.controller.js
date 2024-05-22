const { CHAT_MESSAGES, DOCTORS, PATIENTS } = require("../../database/db");
const { ClientError } = require("../../lib/errors");

const postMessageController = async (
  id_chat,
  message,
  sender_id,
  sender_role
) => {
  const {
    dataValues: { fullname },
  } =
    sender_role === "doctor"
      ? await DOCTORS.findByPk(sender_id)
      : await PATIENTS.findByPk(sender_id);

  if (!fullname) throw new ClientError("This sender not exists");

  const createdMessage = await CHAT_MESSAGES.create({
    message,
    sender_id,
    sender_name: fullname,
    sender_role,
    id_chat,
  });

  if (!createdMessage)
    throw new ClientError("This message could not to be sended");
  return createdMessage;
};

module.exports = {
  postMessageController,
};
