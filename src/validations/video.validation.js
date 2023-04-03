const ObjectId = require("mongoose").Types.ObjectId;
const Joi = require("joi");

function validMongoId(id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
  }
  return false;
}

function validGenre(genre) {
  const genres = {
    education: true,
    sports: true,
    movies: true,
    comedy: true,
    lifestyle: true,
    all: true,
  };
  const falseGenre = genre.split(",").filter((genr) => {
    if (!genres[genr.toLowerCase()]) return genr;
  });

  if (falseGenre.length !== 0) return [false, falseGenre.join(",")];
  return [true, ""];
}

function validContentRating(rating) {
  const conRatings = {
    anyone: true,
    "7+": true,
    "12+": true,
    "16+": true,
    "18+": true,
  };
  if (!conRatings[rating.toLowerCase()]) return false;
  return true;
}

function validSortBy(sortBy) {
  const sortBys = {
    releasedate: true,
    viewcount: true,
  };

  if (!sortBys[sortBy.toLowerCase()]) return false;
  return true;
}

const embedYTPattern = new RegExp("^youtube.com/embed/[A-z0-9]+");
const videoSchema = Joi.object({
  title: Joi.string().min(3).required(),
  videoLink: Joi.string().regex(embedYTPattern).required(),
  genre: Joi.string()
    .valid("Education", "Sports", "Movies", "Comedy", "Lifestyle")
    .required(),
  contentRating: Joi.string()
    .valid("Anyone", "7+", "12+", "16+", "18+")
    .required(),
  releaseDate: Joi.date().required(),
  previewImage: Joi.string().required(),
});

module.exports = {
  validMongoId,
  validGenre,
  validContentRating,
  validSortBy,
  videoSchema,
};
