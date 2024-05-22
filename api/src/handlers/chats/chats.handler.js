const {
  getChatsController,
  getChatController,
  postChatController,
  deleteChatController,
} = require("../../controllers/chats/chats.controller");

const { ClientError } = require("../../lib/errors");
const { dataResponse, messageResponse } = require("../../lib/response");

// chats
const getChatsHandler = async (req, res, next) => {
  try {
    const { id_doctor, id_patient } = req.user;
    let chats;

    if (id_doctor) {
      chats = await getChatsController(id_doctor);
    } else if (id_patient) {
      chats = await getChatsController(id_patient);
    } else throw new ClientError("Missing id");

    dataResponse(res, 200, chats);
  } catch (error) {
    next(error);
  }
};

// with messages
const getChatHandler = async (req, res, next) => {
  try {
    const { chat } = req.params;

    if (!chat) throw new ClientError("Missing id chat");

    const chat_messages = await getChatController(chat);

    dataResponse(res, 200, chat_messages);
  } catch (error) {
    next(error);
  }
};

const postChatHandler = async (req, res, next) => {
  try {
    const { id_patient } = req.user; //la consulta/chat (creacion) siempre la realiza el paciente
    const { consult_reason, id_doctor } = req.body;

    if (!id_patient || !id_doctor || !consult_reason)
      throw new ClientError("Missing data");

    const chat = await postChatController(
      consult_reason,
      id_doctor,
      id_patient
    );

    dataResponse(res, 200, chat);
  } catch (error) {
    next(error);
  }
};

const deleteChatHandler = async (req, res, next) => {
  try {
    const { chat } = req.params;

    await deleteChatController(chat);

    messageResponse(res, 200, "Chat deleted successfully!");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getChatsHandler,
  getChatHandler,
  postChatHandler,
  deleteChatHandler,
};
