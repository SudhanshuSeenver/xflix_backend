const {
  validGenre,
  validContentRating,
  validSortBy,
} = require("../validations/video.validation");
const ObjectId = require("mongoose").Types.ObjectId;

function validMongoId(req, res, next) {
  const { videoId: id } = req.params;

  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) {
      return next();
    }
  }
  return res
    .status(400)
    .json({ code: 400, message: '"videoId" must be a valid mongo id' });
}

async function validateFilterParams(req, res, next) {
  try {
    const { title, genres, contentRating, sortBy } = req.query;
    // console.log(title, genres, contentRating);

    if (sortBy) {
      const valid = validSortBy(sortBy);
      if (!valid) {
        return res
          .status(400)
          .json({
            code: 400,
            message: '"sortBy" must be one of [viewCount, releaseDate]',
          });
      }
    }

    if (contentRating) {
      const valid = validContentRating(contentRating);
      if (!valid) {
        return res
          .status(400)
          .json({
            code: 400,
            message:
              '"contentRating" must be one of [Anyone, 7+, 12+, 16+, 18+, All]',
          });
      }
    }

    if (genres) {
      const valid = validGenre(genres);
    //   console.log(valid);
      if (!valid[0]) {
        return res
          .status(400)
          .json({
            code: 400,
            message: `\"${valid[1]}\" must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]`,
          });
      }
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, message: err.message });
  }
}

module.exports = { validateFilterParams, validMongoId };
