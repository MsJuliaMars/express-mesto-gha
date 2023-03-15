const routes = require('express')
  .Router();
const {
  login,
  createUser,
} = require('../controllers/users');

routes.post('/signup', createUser); // регистрация пользователя и его создание
routes.post('/signin', login); // логин пользователя

module.exports = routes;
