const { Router } = require("express");
const auth = require("../middlewares/auth");
const {
  getDoctorsHandler,
  getDoctorHandler,
  putDoctorHandler,
} = require("../handlers/doctors.handler");

const doctorsRouter = Router();

doctorsRouter.get("/", getDoctorsHandler);
doctorsRouter.get("/:id", getDoctorHandler);
doctorsRouter.put("/", auth, putDoctorHandler);

module.exports = doctorsRouter;

// doctors docs
/**
 * @swagger
 * /doctors:
 *  get:
 *      summary: Obtener todos los medicos
 *      tags:
 *          - Doctors
 *      parameters:
 *        - in: query
 *          name: speciality
 *          schema:
 *            type: uuid
 *          description: Debe ser el id de la especialidad
 *        - in: query
 *          name: sex
 *          schema:
 *            type: string
 *          enum:
 *            - male
 *            - female
 *          description: Debe ser el genero del medico
 *        - in: query
 *          name: fullname
 *          schema:
 *            type: string
 *          description: Debe ser el nombre del medico o una parte del mismo
 *      responses:
 *          200:
 *              description: Informacion de todos los doctores obtenida con exito
 *          400:
 *              description: Bad request (client error)
 *          500:
 *              description: Internal server error
 */

/**
 * @swagger
 * /doctors/:id:
 *  get:
 *      summary: Obtener los datos de un doctor
 *      tags:
 *          - Doctors
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Id del doctor
 *            schema:
 *                type: uuid
 *      responses:
 *          200:
 *              description: Informacion del doctor obtenida con exito
 *          400:
 *              description: Bad request (client error)
 *          404:
 *              description: No se encontro ningun doctor con este id
 *          500:
 *              description: Internal server error
 */

/**
 * @swagger
 * /doctors:
 *  put:
 *    summary: Editar los datos del medico
 *    security:
 *      - apiKey: []
 *    tags:
 *      - Doctors
 *    requestBody:
 *        description: Datos del medico
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                fullname:
 *                  type: string
 *                  description: Nombre completo del medico
 *                  example: Jonh
 *                email:
 *                  type: string
 *                  description: Email del medico
 *                  example: jonh@gmail.com
 *                sex:
 *                  type: string
 *                  enum:
 *                    - male
 *                    - female
 *                  description: Genero del medico
 *                  example: male
 *                id_speciality:
 *                  type: string
 *                  description: Id de la especialidad del medico (id)
 *              required:
 *                - fullname
 *                - email
 *                - sex
 *                - profile_image
 *                - id_speciality
 *    responses:
 *      200:
 *        description: El usuario del medico fue editado con exito
 *      400:
 *        description: Bad request (client error)
 *      401:
 *        description: Unathorized (token vencido o no enviado)
 *      500:
 *        description: Internal server error
 */
