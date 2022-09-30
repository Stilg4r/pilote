module.exports = {
  validateJsonHeader: (req, res, next) => {
    if (req.is("application/json")) {
      next();
    } else {
      res.status(400).json({
        error: true,
        message: "Solo se permite application/json",
        data: {},
      });
    }
  },
};
