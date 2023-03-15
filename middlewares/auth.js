// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startWith('Bearer')) {
    res.status(401)
      .send({ message: 'Необходима авторизация' });
  }
  // извлечём токен
  const token = authorization.replace('Bearer', '');

  // верифицируем токен
  let payload;
  try {
    // попытаемся верифицировать токен
    // eslint-disable-next-line no-unused-vars
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    // отправим ошибку если не получится
    return res.status(401)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
