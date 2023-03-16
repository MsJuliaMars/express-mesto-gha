const routesUsers = require('express').Router(); // создали роутер
const {
  getUsers, getUserID, updateUser, updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');
// const userIdValidate = require('../middlewares/validation');
const auth = require('../middlewares/auth');

routesUsers.get('/users', auth, getUsers); // возвращает всех пользователей
routesUsers.get('/users/me', auth, getCurrentUser); // возвращает информацию о текущем пользователе
routesUsers.get('/users/:userId', auth, getUserID); // возвращает пользователя по _id
routesUsers.patch('/users/me', auth, updateUser); // обновляет профиль
routesUsers.patch('/users/me/avatar', auth, updateUserAvatar); // обновляет профиль

module.exports = routesUsers; // экспортировали роутер
