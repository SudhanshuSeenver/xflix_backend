const validateSchema = (schema) => async (req, res, next) => {
  const body = req.body;
  const { error } = schema.validate(body);
  if (!error) next();
  else return res.status(400).json({ code: 400, message: error.message });
};

module.exports = validateSchema;
