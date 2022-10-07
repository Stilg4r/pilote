const router = require("express").Router();

const { status } = require("../../controllers/application/application.controller");

router
  .route("/")
  .get(status);

module.exports = router;
