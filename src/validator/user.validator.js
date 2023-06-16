const validate = require('./schema/user.schema');

exports.userRegister = (req, res, next) => {
  try {
    const { value, error } = validate.userCreation.validate(req.body);
    if (error) {
      return res.send({ error: error.message.toString() });
    }
    req.body = value;
    next();
  } catch (e) {
    return res.send({ error: e.message.toString() });
  }
};