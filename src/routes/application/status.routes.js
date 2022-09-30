const router = require("express").Router();

const {
  status,
} = require("../../controllers/application/application.controller");

router.get("/", status);
router
  .route("/")
  .get(status)
  .all((req, res) => {
    res.status(405).send("Method not allowed");
  });
module.exports = router;
