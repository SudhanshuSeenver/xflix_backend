const express = require("express");
const router = express.Router();
const videoController = require("../../controllers/video.controller");
const { validateFilterParams } = require("../../middlewares/video");
const validateSchema = require("../../middlewares/validate");
const {
  videoSchema,
  voteSchema,
} = require("../../validations/video.validation");

const { validMongoId } = require("../../middlewares/video");

router.get("/", validateFilterParams, videoController.getAllVideos);

router.post("/", validateSchema(videoSchema), videoController.uploadVideo);

// router.use(validMongoId);
router.get("/:videoId", validMongoId, videoController.getVideo);
router.patch(
  "/:videoId/votes",
  validMongoId,
  validateSchema(voteSchema),
  videoController.changeVotes
);

router.patch("/:videoId/views", validMongoId, videoController.changeViews);

module.exports = router;
