module.exports = {
  errorHandler: (err, req, res, next) => {
    console.error(err);
    if (req.is("application/json") && err.type == "entity.parse.failed") {
      return res
        .status(500)
        .json({ error: true, message: "Json malforado", data: {} });
    } else {
      console.error(err.stack);
      next(err);
    }
  },
};
