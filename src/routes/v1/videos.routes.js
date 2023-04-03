const express = require("express");
const router = express.Router();
const videoController = require("../../controllers/video.controller");
const { validateFilterParams } = require("../../middlewares/video");
const validateSchema = require("../../middlewares/validate");
const { videoSchema } = require("../../validations/video.validation");

router.get("/", validateFilterParams, videoController.getAllVideos);

router.get("/:videoId", videoController.getVideo);

router.post("/", validateSchema(videoSchema), videoController.uploadVideo);

module.exports = router;
