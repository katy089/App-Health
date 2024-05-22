const { Router } = require("express");
const {
  postDatabaseDataHandler,
  postSpecialityCatalogueHandler,
  postChatsHandler,
} = require("../handlers/database.handler");

const databaseRouter = Router();

databaseRouter.post("/catalogue", postSpecialityCatalogueHandler); //cargar catalogo
databaseRouter.post("/data", postDatabaseDataHandler); //cargar datos
databaseRouter.post("/chats", postChatsHandler); //cargar chats

module.exports = databaseRouter;
