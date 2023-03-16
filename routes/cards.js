const routesCards = require('express').Router(); // создали роутер
const {
  getCard, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');

routesCards.get('/cards', auth, getCard); // возвращает все карточки
routesCards.post('/cards', auth, createCard); // создаёт карточку
routesCards.delete('/cards/:cardId', auth, deleteCard);// удаляет карточку по идентификатору
routesCards.put('/cards/:cardId/likes', auth, likeCard); // поставить лайк карточке
routesCards.delete('/cards/:cardId/likes', auth, dislikeCard); // убрать лайк с карточки

module.exports = routesCards; // экспортировали роутер
