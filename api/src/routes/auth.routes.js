const { Router } = require("express");
const auth = require("../middlewares/auth");
const {
  signUpHandler,
  logInHandler,
  putUserPasswordHandler,
  getGoogleLoginUrl,
  googleRedirect,
} = require("../handlers/auth.handler");

const authRouter = Router();

// login
authRouter.post("/login", logInHandler);

// signup
authRouter.post("/signup", signUpHandler);

authRouter.put("/password", auth, putUserPasswordHandler);

authRouter.get("/google", getGoogleLoginUrl);
authRouter.get("/google/redirect", googleRedirect);

module.exports = authRouter;

// auth docs
/**
 * @swagger
 * /auth/login:
 *      post:
 *          summary: Iniciar sesion
 *          tags:
 *              - Authentication
 *          requestBody:
 *              description: Esquema del login
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/LoginSchema'
 *          responses:
 *              200:
 *                  description: Se pudo iniciar sesion con exito (token)
 *              400:
 *                  description: Bad request (client error)
 *              404:
 *                  description: No se encontro el usuario
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 * /auth/signup:
 *      post:
 *          summary: Registrarse
 *          tags:
 *              - Authentication
 *          requestBody:
 *              description: Esquema de signup
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/SignupSchema'
 *          responses:
 *              200:
 *                  description: El usuario fue registrado con exito
 *              400:
 *                  description: Bad request (client error)
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 * /chats:
 *    put:
 *      summary: Editar contraseña
 *      security:
 *        - apiAuth: []
 *      tags:
 *        - Authentication
 *      requestBody:
 *        description: Nueva contraseña
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                newPassword:
 *                  type: string
 *                  description: Nueva contraseña
 *                  example: contra123
 *              required:
 *                - newPassword
 *      responses:
 *        201:
 *          description: Contraseña editada con exito
 *        400:
 *          description: Bad request (client error)
 *        401:
 *          description: Unauthorized (token vencido o no enviado)
 *        500:
 *          description: Internal server error
 */

/**
 * @swagger
 * /auth/google:
 *    get:
 *      summary: Obtener link para vincular dar permisos a google calendar
 *      tags:
 *        - Authentication
 *      responses:
 *        200:
 *          description: Se obtuvo la url con exito
 *        500:
 *          description: Internal server error
 */

/**
 * @swagger
 * /auth/google/redirect:
 *    get:
 *      summary: Valida el token dado en /auth/google, lo verifica y redirecciona a la pagina principal
 *      tags:
 *        - Authentication
 *      responses:
 *        200:
 *          description: Redireccionamiento a la pagina principal
 *        400:
 *          description: Bad request (No se pudo obtener el token)
 *        500:
 *          description: Internal server error
 */
