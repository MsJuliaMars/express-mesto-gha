const routes = require('express')
  .Router();
const {
  login,
  createUser,
} = require('../controllers/users');
const {
  validateLoginUser,
  validateUser,
} = require('../middlewares/validation');

routes.post('/signup', validateUser, createUser); // регистрация пользователя и его создание
// логин пользователя
routes.post('/signin', validateLoginUser, login);

module.exports = routes;
