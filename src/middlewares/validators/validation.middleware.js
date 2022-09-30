const { validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    next();
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "No se pudo completar la petición",
      data: error.errors,
    });
  }
};

module.exports = { validateResult };
