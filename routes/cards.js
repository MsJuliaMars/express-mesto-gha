const routesCards = require('express').Router(); // создали роутер
const {getCard, createCard, deleteCard} = require('../controllers/cards');

routesCards.get('/cards', getCard); //возвращает все карточки
routesCards.post('/cards', createCard); // создаёт карточку
routesCards.delete('/cards/:cardId', deleteCard);// удаляет карточку по идентификатору

module.exports = routesCards; // экспортировали роутер