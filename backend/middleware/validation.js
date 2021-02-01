const Joi = require("joi");

/*
This middleware validates the data gotten from the frontend form
*/
module.exports = schema => (req, res, next) => {
  const result = Joi.validate(req.body, schema);

  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });
  next();
};
