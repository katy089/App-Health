const {
  getSpecialitysController,
  postSpecialityController,
} = require("../controllers/universal_catalogue.controller");

const { dataResponse } = require("../lib/response");

const getSpecialitysHandler = async (req, res, next) => {
  try {
    const { name } = req.query;

    const specialitys = await getSpecialitysController(name);

    dataResponse(res, 200, specialitys);
  } catch (error) {
    next(error);
  }
};

const postSpecialityHandler = async (req, res, next) => {
  try {
    const { name } = req.body;

    const speciality = await postSpecialityController(name);

    dataResponse(res, 201, speciality);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSpecialitysHandler,
  postSpecialityHandler,
};
