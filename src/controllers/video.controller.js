const videoService = require("../services/video.service");

async function getAllVideos(req, res) {
  try {
    // return res.status(200).send("videos");
    const { title, genres, contentRating, sortBy } = req.query;

    const videos = await videoService.getVideos(
      title,
      genres,
      contentRating,
      sortBy
    );
    if (!videos)
      return res.status(404).json({ code: 404, message: "No videos found" });
    if (title) {
      const filterByTitle = videos.filter((video) => {
        const vTitle = video.title.toLowerCase();
        return vTitle.includes(title.toLowerCase());
      });
      //   console.log(filterByTitle);
      return res.status(200).json({ videos: filterByTitle });
    }

    return res.status(200).json({ videos: videos });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, message: err.message });
  }
}

async function getVideo(req, res) {
  try {
    const { videoId } = req.params;

    const video = await videoService.getVideoById(videoId);
    if (!video)
      return res
        .status(404)
        .json({ code: 404, message: "No video found with matching id" });
    return res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message });
  }
}

async function uploadVideo(req, res) {
  try {
    const video = await videoService.addVideo(req.body);
    if (!video)
      return res.status(500).json({ code: 500, message: err.message });
    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message });
  }
}

async function changeVotes(req, res) {
  try {
    const { videoId } = req.params;
    const body = req.body;
    const video = await videoService.updateVote(videoId, body);
    if (!video)
      return res
        .status(404)
        .json({ code: 404, message: "No video found with matching id" });
    res.status(204).send();
    // res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message });
  }
}

async function changeViews(req, res) {
  try {
    const { videoId } = req.params;

    const video = await videoService.updateViews(videoId);
    if (!video)
      return res
        .status(404)
        .json({ code: 404, message: "No video found with matching id" });
    res.status(204).send();
    // res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message });
  }
}

module.exports = {
  getAllVideos,
  getVideo,
  uploadVideo,
  changeVotes,
  changeViews,
};
