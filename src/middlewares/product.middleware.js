const schemas = require('./schemas');

const productMiddleware = async (req, res, next) => {
  const validation = schemas.productSchema.validate(req.body);
  if (!validation.error) return next();

  const { error: { details: [{ type }] } } = validation;
  const { error: { details: [{ message }] } } = validation;

  if (type === 'string.empty' || type === 'any.required') {
    res.status(400).json({ message });
  } else if (type === 'string.min') {
    res.status(422).json({ message });
  }
};

module.exports = productMiddleware;
