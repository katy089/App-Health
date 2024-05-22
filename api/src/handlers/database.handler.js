const {
  postDatabaseDataController,
  postSpecialityCatalogueController,
  postChatsController,
} = require("../controllers/database.controller");

const { messageResponse } = require("../lib/response");

const postDatabaseDataHandler = async (_req, res, next) => {
  try {
    await postSpecialityCatalogueController();

    await postDatabaseDataController();

    messageResponse(res, 201, "The database was chargued successfully!!");
  } catch (err) {
    next(err);
  }
};

const postSpecialityCatalogueHandler = async (_req, res, next) => {
  try {
    await postSpecialityCatalogueController();

    messageResponse(
      res,
      201,
      "The speciality catologue was charged successfully"
    );
  } catch (error) {
    next(error);
  }
};

const postChatsHandler = async (_req, res, next) => {
  try {
    await postChatsController();

    messageResponse(res, 201, "The chats was charged successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postDatabaseDataHandler,
  postSpecialityCatalogueHandler,
  postChatsHandler,
};
