const mongoose = require("mongoose");
const validator = require("validator");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  videoLink: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    trim: true,
    required: true,
  },
  contentRating: {
    type: String,
    trim: true,
    required: true,
  },
  releaseDate: {
    type: Date,
  },
  previewImage: {
    type: String,
    trim: true,
    required: true,
    validate: (link) => validator.isURL(link),
  },
  votes: {
    upVotes: {
      type: Number,
      default: 0,
    },
    downVotes: {
      type: Number,
      default: 0,
    },
  },
  viewCount: {
    type: Number,
    default: 0,
  },
});

module.exports = { Video: mongoose.model("Video", videoSchema) };
