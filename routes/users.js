const routesUsers = require('express').Router(); // создали роутер
const {
  getUsers, getUserID, updateUser, updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');
const userIdValidate = require('../middlewares/validation');

routesUsers.get('/users', getUsers); // возвращает всех пользователей
routesUsers.get('/users/me', getCurrentUser); // ??????????????
routesUsers.get('/users/:userId', userIdValidate, getUserID); // возвращает пользователя по _id
// routesUsers.post('/users', createUser);// создаёт пользователя
routesUsers.patch('/users/me', updateUser); // обновляет профиль
routesUsers.patch('/users/me/avatar', updateUserAvatar); // обновляет профиль

module.exports = routesUsers; // экспортировали роутер
