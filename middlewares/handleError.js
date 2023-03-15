const {
  STATUS_CODE,
  MESSAGE,
} = require('../utils/constantsError');

const handleError = (err, req, res, next) => {
  const message = STATUS_CODE === 500 ? `${MESSAGE.USER_SERVER_ERROR}: ${err.message}` : err.message;
  res.status(STATUS_CODE.SERVER_ERROR)
    .send({ message });

  next();
};

module.exports = handleError;
