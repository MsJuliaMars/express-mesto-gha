// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs'); // модуль для хеширования пароля
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken'); // модуль jsonwebtoken модуль для создания токена
const User = require('../models/user');
const NotFound = require('../errors/NotFound');
// eslint-disable-next-line quotes
const {
  STATUS_CODE,
  MESSAGE,
} = require('../utils/constantsError');

// GET /users — возвращает всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(STATUS_CODE.OK)
      .send({ users }))
    .catch(next);
};

// GET /users/:userId - возвращает пользователя по _id
const getUserID = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(STATUS_CODE.NOT_FOUND)
          .send({ message: `Извините, пользователь _id=${req.params.userId} не найден.` });
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(STATUS_CODE.BAD_REQUEST)
          .send({ message: 'Некорректный userID ' });
      }
      return next(err);
    });
};

// POST /signup - регистрация пользователя и соответсвено его создание
const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(STATUS_CODE.OK)
      .send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_CODE.BAD_REQUEST)
          .send({ message: MESSAGE.ERROR_CREATE_USER });
      } else if (err.code === 11000) {
        res.status(STATUS_CODE.CONFLICT_ERROR)
          .send({ message: MESSAGE.ERROR_CONFLICT_EMAIL });
      } else {
        res.status(STATUS_CODE.SERVER_ERROR)
          .send({ message: MESSAGE.USER_SERVER_ERROR });
      }
    });
};

// POST /signin

// GET /users/me
const getCurrentUser = (req, res) => {
  res.status(200)
    .send({ message: 'getCurrentUser OK' });
};

// POST /signin контроллер аутентификации
const login = (req, res) => {
  const {
    email,
    password,
  } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // eslint-disable-next-line no-underscore-dangle
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 3600000,
      }); // возвращаем токен
      res.status(STATUS_CODE.OK).send({ message: 'Вы успешно автризировались', token });
    })
    .catch((err) => {
      res.status(401)
        .send({ message: err.message });
    });
};

// PATCH /users/me — обновляет профиль
const updateUser = (req, res, next) => {
  const {
    name,
    about,
  } = req.body;
  User.findOneAndUpdate(req.params.userId, {
    name,
    about,
  }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      // eslint-disable-next-line no-new
      new NotFound();
    })
    .then((user) => res.status(STATUS_CODE.OK)
      .send({ data: user }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(STATUS_CODE.NOT_FOUND)
          .send({ message: MESSAGE.USER_NOT_FOUND });
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(STATUS_CODE.BAD_REQUEST)
          .send({ message: ' Переданы некорректные данные при обновлении профиля. ' });
      }
      return next(err);
    });
};

// PATCH /users/me/avatar — обновляет аватар
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  // eslint-disable-next-line max-len
  User.findOneAndUpdate(req.params.userId, { avatar }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      // eslint-disable-next-line no-new
      new NotFound(`Извините, пользователь _id=${req.params.userId} не найден.`);
    })
    .then((user) => res.status(STATUS_CODE.OK)
      .send({ data: user }))
    .catch((err) => {
      if (err.name === 'SyntaxError') {
        res.status(STATUS_CODE.BAD_REQUEST)
          .send({ message: ' Переданы некорректные данные при обновлении профиля. ' });
      }
      return next(err);
    });
};

module.exports = {
  getUsers,
  getUserID,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  getCurrentUser,
};
