const User = require('../models/user');
const NotFound = require('../errors/NotFound');
// eslint-disable-next-line quotes
// const BadRequestError = require('../errors/BadRequestError');
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
  User.findById(req.params.userId).orFail(() => {
    // eslint-disable-next-line no-new
    new NotFound();
  })
    .then((user) => {
      if (!user) {
        res.status(STATUS_CODE.NOT_FOUND).send({ message: `Извините, пользователь _id=${req.params.userId} не найден.` });
      } else { res.send({ data: user }); }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(STATUS_CODE.BAD_REQUEST).send({ message: 'Некорректный userID' });
      }
      return next(err);
    });
};

// POST /users — создаёт пользователя
const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
  } = req.body;
  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.status(STATUS_CODE.OK)
      .send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_CODE.BAD_REQUEST)
          .send({ message: MESSAGE.ERROR_CREATE_USER });
      } else {
        res.status(STATUS_CODE.SERVER_ERROR)
          .send({ message: MESSAGE.USER_SERVER_ERROR });
      }
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
  }).orFail(() => {
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
};
