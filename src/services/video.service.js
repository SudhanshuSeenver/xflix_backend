const { Video } = require("../models/video.model");

async function getVideos(title, genre, contentRating, sortBy) {
  const filter = {};
  const sortBy_option = sortBy || "releaseDate";
  // if(title){}

  if (genre && genre.toLowerCase() !== "all") {
    filter.genre = { $in: [...genre.split(",")] };
  }
  if (contentRating && contentRating.toLowerCase() !== "all") {
    filter.contentRating = contentRating;
  }

  const videos = await Video.find(filter).sort({ [`${sortBy_option}`]: -1 });
  //   console.log(videos);
  return videos;
}

async function getVideoById(id) {
  const video = await Video.findById(id);
  if (!video) return false;
  return video;
}

async function addVideo(data) {
  const video = await Video.create(data);
  if (!video) return false;
  return video;
}

async function updateVote(id, data) {
  const video = await Video.findById(id);
  if (!video) return false;
  if (data.vote === "upVote") {
    const val = data.change === "increase" ? 1 : -1;
    video.votes.upVotes = video.votes.upVotes + val;
  }

  if (data.vote === "downVote") {
    const val = data.change === "increase" ? 1 : -1;
    video.votes.downVotes = video.votes.downVotes + val;
  }
  await video.save();
  return video;
}

async function updateViews(id) {
  const video = await Video.findById(id);
  if (!video) return false;
  video.viewCounts = video.viewCounts + 1;
  await video.save();
  return video;
}

module.exports = {
  getVideos,
  getVideoById,
  addVideo,
  updateVote,
  updateViews,
};
