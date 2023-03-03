const routesUsers = require('express').Router(); // создали роутер
const {getUsers, getUserID, createUser} = require('../controllers/users');

routesUsers.get('/users', getUsers); // возвращает всех пользователей
routesUsers.get('/users/:userId', getUserID); // возвращает пользователя по _id
routesUsers.post('/users', createUser);// создаёт пользователя

module.exports = routesUsers; // экспортировали роутер