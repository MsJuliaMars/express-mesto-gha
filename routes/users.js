const routesUsers = require('express').Router(); // создали роутер
const {
  getUsers, getUserID, createUser, updateUser, updateUserAvatar,
} = require('../controllers/users');

routesUsers.get('/users', getUsers); // возвращает всех пользователей
routesUsers.get('/users/:userId', getUserID); // возвращает пользователя по _id
routesUsers.post('/users', createUser);// создаёт пользователя
routesUsers.patch('/users/me', updateUser); // обновляет профиль
routesUsers.patch('/users/me/avatar', updateUserAvatar); // обновляет профиль

module.exports = routesUsers; // экспортировали роутер
