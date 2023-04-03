const { Video } = require("../models/video.model");

function sortByViewCount(vid_A, vid_B) {
  return parseInt(vid_B.viewCount) - parseInt(vid_A.viewCount);
}
function sortByDate(vid_A, vid_B) {
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return new Date(vid_B.releaseDate) - new Date(vid_A.releaseDate);
}

async function getVideos(title, genre, contentRating, sortBy) {
  const filter = {};
  const sortBy_option = sortBy || "releaseDate";

  // if(title){}
  let result_videos = [];
  if (genre && genre.toLowerCase() !== "all") {
    // console.log("genre Section");
    filter.genre = { $in: [...genre.split(",")] };
  }
  const videos = await Video.find(filter);
  //   const videos = await Video.find(filter).sort({ [`${sortBy_option}`]: -1 });
  if (videos.length === 0) return false;
  result_videos = videos;

  //   filtering for content rating
  if (contentRating && contentRating.toLowerCase() !== "all") {
    // filter.contentRating = contentRating;
    numContentRt = parseInt(contentRating.split("+")[0]);
    const videos_updated = result_videos.filter((video) => {
      const vidRt = parseInt(video.contentRating.split("+")[0]) || "anyone";
      if (vidRt === "anyone") {
        return true;
      } else if (vidRt <= numContentRt) {
        return true;
      }
      return false;
    });
    result_videos = videos_updated;
  }

  // sorting according to releaseDate or viewCount

  if (sortBy_option === "releaseDate")
    result_videos = result_videos.sort(sortByDate);
  else if (sortBy_option === "viewCount")
    result_videos = result_videos.sort(sortByViewCount);

  //   console.log(videos);
  return result_videos;
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

// votes should be eqaul to or greater than that
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
  video.viewCount = video.viewCount + 1;
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
