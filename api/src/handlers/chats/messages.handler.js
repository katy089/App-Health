const {
  postMessageController,
} = require("../../controllers/chats/messages.controller");

const { ClientError } = require("../../lib/errors");
const { dataResponse } = require("../../lib/response");

const postMessageHandler = async (req, res, next) => {
  try {
    const { id_doctor, id_patient } = req.user;
    const { id_chat, message } = req.body;

    const sender_id = id_doctor ? id_doctor : id_patient ? id_patient : null;
    const sender_role = id_doctor ? "doctor" : id_patient ? "patient" : null;

    if (!message || !id_chat || !sender_id || !sender_role)
      throw new ClientError("Missing data");

    const createdMessage = await postMessageController(
      id_chat,
      message,
      sender_id,
      sender_role
    );

    dataResponse(res, 200, createdMessage);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postMessageHandler,
};
