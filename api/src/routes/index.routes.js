const { Router } = require("express");

const databaseRouter = require("./database.routes");
const authRouter = require("./auth.routes");
const meetingsRouter = require("./meetings.routes");
const chatsRouter = require("./chats.routes");
const doctorsRouter = require("./doctors.routes");
const universalCatalogueRouter = require("./universal_catalogue.routes");
const patientsRouter = require("./patients.routes");

const router = Router();

router.use("/database", databaseRouter);
router.use("/auth", authRouter);
router.use("/meetings", meetingsRouter);
router.use("/chats", chatsRouter);
router.use("/doctors", doctorsRouter);
router.use("/universal_catalogue", universalCatalogueRouter);
router.use("/patients", patientsRouter);

module.exports = router;

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      apiAuth:
 *          type: apiKey
 *          in: header
 *          name: authorization
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      LoginSchema:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  format: email
 *                  description: Correo electronico del usuario
 *                  example: gerardoignacio@gmail.com
 *              password:
 *                  type: string
 *                  description: Contrasenia del usuario
 *                  example: pass123
 *              role:
 *                  type: string
 *                  enum:
 *                      - doctor
 *                      - patient
 *                  description: Rol del usuario
 *                  example: patient
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      SignupSchema:
 *          type: object
 *          properties:
 *              fullname:
 *                  type: string
 *                  description: Nombre completo del usuario
 *                  example: Juan Manuel
 *              email:
 *                  type: string
 *                  format: email
 *                  description: Correo electronico del usuario
 *                  example: juanmanuel@gmail.com
 *              password:
 *                  type: string
 *                  description: Contrasenia del usuario
 *                  example: contra123
 *              sex:
 *                  type: string
 *                  enum:
 *                      - male
 *                      - female
 *                  description: Genero del usuario
 *                  example: male
 *              id_speciality:
 *                  type: string
 *                  description: Si su rol es 'doctor', especialidad del medico (id)
 *              role:
 *                  type: string
 *                  enum:
 *                      - doctor
 *                      - patient
 *                  description: Rol del usuario
 *                  example: doctor
 */
