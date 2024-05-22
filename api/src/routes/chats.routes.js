const { Router } = require("express");
const auth = require("../middlewares/auth");
const {
  getChatsHandler,
  getChatHandler,
  postChatHandler,
  deleteChatHandler,
} = require("../handlers/chats/chats.handler");
const { postMessageHandler } = require("../handlers/chats/messages.handler");

const chatsRouter = Router();

// chats
chatsRouter.get("/", auth, getChatsHandler);
chatsRouter.get("/:chat", auth, getChatHandler);
chatsRouter.post("/", auth, postChatHandler);
chatsRouter.delete("/:chat", auth, deleteChatHandler);

// messages
// chatsRouter.get("/message", auth);
chatsRouter.post("/message", auth, postMessageHandler);
// chatsRouter.delete("/message", auth);

module.exports = chatsRouter;

// chats docs
/**
 * @swagger
 * /chats:
 *    get:
 *      summary: Obtener todos los chats del usuario
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Chats
 *      responses:
 *        200:
 *          description: Chats del usuario obtenidos con exito
 *        400:
 *          description: Bad request (client error)
 *        401:
 *          description: Unauthorized (token vencido o no enviado)
 *        500:
 *          description: Internal server error
 */

/**
 * @swagger
 * /chats/{chat}:
 *    get:
 *      summary: Obtener el chat mediante el id
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Chats
 *      parameters:
 *        - in: path
 *          name: chat
 *          required: true
 *          description: Id del chat que se desea obtener
 *          schema:
 *            type: uuid
 *      responses:
 *        200:
 *          description: Chat obtenido con exito
 *        400:
 *          description: Bad request (client error)
 *        401:
 *          description: Unauthorized (token vencido o no enviado)
 *        404:
 *          description: No se encontro ningun chat con este id
 *        500:
 *          description: Internal server error
 */

/**
 * @swagger
 * /chats:
 *    post:
 *      summary: Crear un chat
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Chats
 *      requestBody:
 *        description: Razon de la consulta y el id del medico
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                consult_reason:
 *                  type: string
 *                  description: Razon de la consulta
 *                  example: Esta es la razon de la consulta
 *                id_doctor:
 *                  type: string
 *                  description: Id del medico (uuid type)
 *              required:
 *                - consult_reason
 *                - id_doctor
 *      responses:
 *        201:
 *          description: Chat creado con exito
 *        400:
 *          description: Bad request (client error)
 *        401:
 *          description: Unauthorized (token vencido o no enviado)
 *        500:
 *          description: Internal server error
 */

/**
 * @swagger
 * /chats/{chat}:
 *    delete:
 *      summary: Eliminar un chat mediante el id
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Chats
 *      parameters:
 *        - in: path
 *          name: chat
 *          required: true
 *          description: Id del chat que se desea eliminar
 *          schema:
 *            type: uuid
 *      responses:
 *        200:
 *          description: Chat eliminado con exito
 *        400:
 *          description: Bad request (client error)
 *        401:
 *          description: Unauthorized (token vencido o no enviado)
 *        500:
 *          description: Internal server error
 */

// chat_messages docs
/**
 * @swagger
 * /chats/messages:
 *    post:
 *      summary: Crear un mensaje
 *      security:
 *        - apiKey: []
 *      tags:
 *        - Chat_messages
 *      requestBody:
 *        description: id del chat y mensaje a enviar
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id_chat:
 *                  type: string
 *                  description: Id del chat
 *                message:
 *                  type: string
 *                  description: Mensaje a enviar
 *                  example: Este es un mensaje de texto
 *              required:
 *                - id_chat
 *                - message
 *      responses:
 *        201:
 *          description: Mensaje creado con exito
 *        400:
 *          description: Bad request (client error)
 *        401:
 *          description: Unauthorized (token vencido o no enviado)
 *        500:
 *          description: Internal server error
 */
