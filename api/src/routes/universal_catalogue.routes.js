const { Router } = require("express");
const {
  getSpecialitysHandler,
  postSpecialityHandler,
} = require("../handlers/universal_catalogue.handler");

const universalCatalogueRouter = Router();

universalCatalogueRouter.get("/speciality", getSpecialitysHandler);
universalCatalogueRouter.post("/speciality", postSpecialityHandler);

module.exports = universalCatalogueRouter;

/**
 * @swagger
 * /universal_catalogue/speciality:
 *  get:
 *      summary: Obtener todas las especialidades de los doctores
 *      tags:
 *          - Universal_catalogue
 *      responses:
 *          200:
 *              description: Se obtuvieron todas las especialidades con exito
 *          404:
 *              description: No se encontraron las especialidades
 *          500:
 *              description: Internal server error
 */

/**
 * @swagger
 * /universal_catalogue/speciality:
 *  post:
 *      summary: Crear una especialidad que no exista
 *      tags:
 *          - Universal_catalogue
 *      requestBody:
 *        description: Se require el nombre de la especialidad
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: Nombre de la especialidad
 *                  example: Ginecologia
 *              required:
 *                - name
 *      responses:
 *          201:
 *              description: Se creo la nueva especialidad con exito
 *          400:
 *              description: La especialidad ya existe, por lo que no pudo ser creada
 *          500:
 *              description: Internal server error
 */
