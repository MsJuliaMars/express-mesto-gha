const routesCards = require('express')
  .Router(); // создали роутер
const {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');
const {
  validateCard,
  validateCardId,
} = require('../middlewares/validation');

routesCards.get('/cards', auth, getCard); // возвращает все карточки
routesCards.post('/cards', auth, validateCard, createCard); // создаёт карточку
routesCards.delete('/cards/:cardId', auth, validateCardId, deleteCard);// удаляет карточку по идентификатору
routesCards.put('/cards/:cardId/likes', auth, validateCardId, likeCard); // поставить лайк карточке
routesCards.delete('/cards/:cardId/likes', auth, validateCardId, dislikeCard); // убрать лайк с карточки

module.exports = routesCards; // экспортировали роутер
