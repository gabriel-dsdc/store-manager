const schemas = require('./schemas');

const saleMiddleware = async (req, res, next) => {
  const validation = schemas.saleSchema.validate(req.body);
  if (!validation.error) return next();

  const { error: { details: [{ type }] } } = validation;
  const { error: { details: [{ message }] } } = validation;

  if (type === 'number.empty' || type === 'any.required') {
    res.status(400).json({ message });
  } else if (type === 'number.min') {
    res.status(422).json({ message });
  }
};

module.exports = saleMiddleware;
