const { Router } = require("express");
const auth = require("../middlewares/auth");
const {
  getMeetingsHandler,
  getMeetingHandler,
  postMeetingHandler,
  deleteMeetingHandler,
} = require("../handlers/meetings.handler");

const meetingsRouter = Router();

meetingsRouter.get("/", auth, getMeetingsHandler);
meetingsRouter.get("/:meet", auth, getMeetingHandler);
meetingsRouter.post("/", auth, postMeetingHandler);
meetingsRouter.delete("/:meet", auth, deleteMeetingHandler);

module.exports = meetingsRouter;

// meettings docs
/**
 * @swagger
 * /meetings:
 *    get:
 *      summary: Obtener todas las meets del usuario
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Meetings
 *      responses:
 *        200:
 *          description: Meets del usuario obtenidas con exito
 *        400:
 *          description: Bad request (client error)
 *        401:
 *          description: Unauthorized (token vencido o no enviado)
 *        500:
 *          description: Internal server error
 */

/**
 * @swagger
 * /meetings/{meet}:
 *    get:
 *      summary: Obtener la meet mediante el id
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Meetings
 *      parameters:
 *        - in: path
 *          name: meet
 *          required: true
 *          description: Id de la meet que se desea obtener
 *          schema:
 *            type: uuid
 *      responses:
 *        200:
 *          description: Meet obtenido con exito
 *        400:
 *          description: Bad request (client error)
 *        401:
 *          description: Unauthorized (token vencido o no enviado)
 *        404:
 *          description: No se encontro ninguna meet con este id
 *        500:
 *          description: Internal server error
 */

/**
 * @swagger
 * /meetings:
 *    post:
 *      summary: Crear una meet
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Meetings
 *      requestBody:
 *        description: Razon de la consulta, la fecha y el id del medico
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
 *                date:
 *                  type: string
 *                  description: Fecha de la meet (date type)
 *                  example: 2024-06-17 12:00:00
 *                id_patient:
 *                  type: string
 *                  description: Id del medico (uuid type)
 *              required:
 *                - consult_reason
 *                - date
 *                - id_patient
 *      responses:
 *        201:
 *          description: Meet creada con exito
 *        400:
 *          description: Bad request (client error)
 *        401:
 *          description: Unauthorized (token vencido o no enviado)
 *        500:
 *          description: Internal server error
 */

/**
 * @swagger
 * /meetings/{meet}:
 *    delete:
 *      summary: Eliminar una meet mediante el id
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Meetings
 *      parameters:
 *        - in: path
 *          name: meet
 *          required: true
 *          description: Id de la meet que se desea eliminar
 *          schema:
 *            type: uuid
 *      responses:
 *        200:
 *          description: Meet eliminada con exito
 *        400:
 *          description: Bad request (client error)
 *        401:
 *          description: Unauthorized (token vencido o no enviado)
 *        500:
 *          description: Internal server error
 */
