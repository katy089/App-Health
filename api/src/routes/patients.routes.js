const { Router } = require("express");
const auth = require("../middlewares/auth");
const {
  getPatientHandler,
  putPatientHandler,
} = require("../handlers/patients.handler");

const patientsRouter = Router();

// patientsRouter.get("/", getDoctorsHandler);
patientsRouter.get("/:id", getPatientHandler);
patientsRouter.put("/", auth, putPatientHandler);

module.exports = patientsRouter;

// patients docs
/**
 * @swagger
 * /patients/:id:
 *  get:
 *      summary: Obtener los datos de un paciente
 *      tags:
 *          - Patients
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Id del paciente
 *            schema:
 *                type: uuid
 *      responses:
 *          200:
 *              description: Informacion del paciente obtenida con exito
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
 *              required:
 *                - fullname
 *                - email
 *                - sex
 *                - profile_image
 *    responses:
 *      200:
 *        description: El usuario del paciente fue editado con exito
 *      400:
 *        description: Bad request (client error)
 *      401:
 *        description: Unathorized (token vencido o no enviado)
 *      500:
 *        description: Internal server error
 */
