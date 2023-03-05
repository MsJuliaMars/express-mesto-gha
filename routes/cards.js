const routesCards = require('express').Router(); // создали роутер
const {getCard, createCard, deleteCard, likeCard, dislikeCard} = require('../controllers/cards');

routesCards.get('/cards', getCard); //возвращает все карточки
routesCards.post('/cards', createCard); // создаёт карточку
routesCards.delete('/cards/:cardId', deleteCard);// удаляет карточку по идентификатору
routesCards.put('/cards/:cardId/likes', likeCard); // поставить лайк карточке
routesCards.delete('/cards/:cardId/likes', dislikeCard) // убрать лайк с карточки

module.exports = routesCards; // экспортировали роутер