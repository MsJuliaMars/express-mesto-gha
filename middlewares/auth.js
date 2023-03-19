// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const {
  STATUS_CODE,
  MESSAGE,
} = require('../utils/constantsError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer')) {
    res.status(STATUS_CODE.UNAUTHORIZED_ERROR)
      .send({ message: MESSAGE.ERROR_UNAUTHORIZED });
  }
  // извлечём токен
  const token = authorization.replace('Bearer ', '');

  // верифицируем токен
  let payload;
  try {
    // попытаемся верифицировать токен
    // eslint-disable-next-line no-unused-vars
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    // отправим ошибку если не получится
    return res.status(STATUS_CODE.UNAUTHORIZED_ERROR)
      .send({ message: MESSAGE.ERROR_UNAUTHORIZED });
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
