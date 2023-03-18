const routesUsers = require('express')
  .Router(); // создали роутер
const {
  getUsers,
  getUserID,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  validateUpdateUser,
  validateAvatarUser,
  validateUserId,
} = require('../middlewares/validation');

routesUsers.get('/users', auth, getUsers); // возвращает всех пользователей
routesUsers.get('/users/me', auth, getCurrentUser); // возвращает информацию о текущем пользователе
routesUsers.get('/users/:userId', auth, validateUserId, getUserID); // возвращает пользователя по _id
routesUsers.patch('/users/me', auth, validateUpdateUser, updateUser); // обновляет профиль
routesUsers.patch('/users/me/avatar', auth, validateAvatarUser, updateUserAvatar); // обновляет профиль автар

module.exports = routesUsers; // экспортировали роутер
