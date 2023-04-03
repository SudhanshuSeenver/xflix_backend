const videoService = require("../services/video.service");
const { validMongoId } = require("../validations/video.validation");

async function getAllVideos(req, res) {
  try {
    // return res.status(200).send("videos");
    const { title, genre, contentRating, sortBy } = req.query;

    const videos = await videoService.getVideos(
      title,
      genre,
      contentRating,
      sortBy
    );
    if (!videos) res.status(404).send("No videos found");
    if (title) {
      const filterByTitle = videos.filter((video) => {
        const vTitle = video.title.toLowerCase();
        return vTitle.includes(title.toLowerCase());
      });
      //   console.log(filterByTitle);
      return res.status(200).json(filterByTitle);
    }

    return res.status(200).json(videos);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
}

async function getVideo(req, res) {
  try {
    const { videoId } = req.params;

    // Check for valid mongoDB id
    if (!validMongoId(videoId)) {
      return res
        .status(400)
        .json({ message: '"videoId" must be a valid mongo id' });
    }

    const video = await videoService.getVideoById(videoId);
    if (!video)
      res.status(404).json({ message: "No video found with matching id" });
    return res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function uploadVideo(req, res) {
  try {
    const video = await videoService.addVideo(req.body);
    if (!video) true;
    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAllVideos,
  getVideo,
  uploadVideo,
};
