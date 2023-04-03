const express = require("express");
const videoRoutes = require("./videos.routes");

const router = express.Router();

router.use("/videos", videoRoutes);

module.exports = router;
