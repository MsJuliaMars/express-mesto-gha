const User = require('../models/user');
const {NotFound} = require('../errors/NotFound');

// GET /users — возвращает всех пользователей
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({users}))
    .catch((err) => {
      res.status(500).send({message: err.message});
    });
};

// GET /users/:userId - возвращает пользователя по _id
const getUserID = (req, res) => {
  User.findById(req.params.userId).orFail(new NotFound('Переданны некорректные данные вот так вот.'))
    .then((user) => res.send({data: user}))
    .catch((err) => {
     // const { status = 500, message = 'Руизвестная ошибка сервера 1'} =err;
      if (err.name === 'CastError') {
        res.status(400).send({message: `Извините, '${req.params.userId}' не валидный Id`});
      } else  if (err.name === 'ValidationError') {
        res.status(400).send({message: err.message});
      } else {
        res.status(500).send({message: err.message});
      }
    });
};

//POST /users — создаёт пользователя
const createUser = (req, res) => {
  const {name, about, avatar} = req.body;
  User.create({name, about, avatar})
    .then((user) => res.send({data: user}))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({message: err.message});
      } else {
        res.status(500).send({message: err.message});
      }
    })
}

module.exports = {getUsers, getUserID, createUser};