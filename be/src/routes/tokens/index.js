const router = require("express").Router();

router.use("/", require("./post.token"));
router.use("/", require("./post.validate.token"));
router.use("/", require("./get.token"));

module.exports = router;
