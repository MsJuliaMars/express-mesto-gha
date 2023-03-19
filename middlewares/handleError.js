const {
  MESSAGE,
} = require('../utils/constantsError');

const handleError = (err, req, res, next) => {
  const serverError = {
    status: 500,
    message: 'Ошибка работы сервера',
  };
  res.status(serverError.status)
    .send({ message: serverError.status === 500 ? `${MESSAGE.USER_SERVER_ERROR}: ${err.message}` : err.message });

  next();
};

module.exports = handleError;
