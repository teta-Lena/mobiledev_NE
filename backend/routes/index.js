const userroutes = require("./user.routes");

const express = require("express");
const router = express.Router();

router.use("/u", userroutes);

module.exports = router;
