const {
  validGenre,
  validContentRating,
  validSortBy,
} = require("../validations/video.validation");

async function validateFilterParams(req, res, next) {
  try {
    const { title, genre, contentRating, sortBy } = req.query;
    console.log(title, genre, contentRating);

    if (sortBy) {
      const valid = validSortBy(sortBy);
      if (!valid) {
        return res
          .status(400)
          .json({ message: "\"sortBy\" must be one of [viewCount, releaseDate]"});
      }
    }

    if (contentRating) {
      const valid = validContentRating(contentRating);
      if (!valid) {
        return res.status(400).json({
          message:
            '"contentRating" must be one of [Anyone, 7+, 12+, 16+, 18+, All]',
        });
      }
    }

    if (genre) {
      const valid = validGenre(genre);
      console.log(valid);
      if (!valid[0]) {
        return res.status(400).json({
          message: `\"${valid[1]}\" must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]`,
        });
      }
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
}

module.exports = { validateFilterParams };
