const routesCards = require('express')
  .Router(); // создали роутер
const {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  validateCard,
  validateCardId,
} = require('../middlewares/validation');

routesCards.get('/cards', getCard); // возвращает все карточки
routesCards.post('/cards', validateCard, createCard); // создаёт карточку
routesCards.delete('/cards/:cardId', deleteCard, validateCardId);// удаляет карточку по идентификатору
routesCards.put('/cards/:cardId/likes', likeCard, validateCardId); // поставить лайк карточке
routesCards.delete('/cards/:cardId/likes', dislikeCard, validateCardId); // убрать лайк с карточки

module.exports = routesCards; // экспортировали роутер
