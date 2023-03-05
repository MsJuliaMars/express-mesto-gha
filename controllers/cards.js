/* eslint-disable no-underscore-dangle */
const Card = require('../models/card');
const { STATUS_CODE, MESSAGE } = require('../utils/constantsError');

// GET /cards — возвращает все карточки
const getCard = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(STATUS_CODE.OK).send(cards))
    .catch(next);
};

// POST /cards — создаёт карточку
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((card) => {
      res.status(STATUS_CODE.OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_CODE.BAD_REQUEST).send({ message: MESSAGE.ERROR_CREATE_CARD });
      }
      return next;
    });
};

// DELETE /cards/:cardId — удаляет карточку по идентификатору
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (req.user._id === card.owner.toString()) {
        Card.findByIdAndDelete(cardId)
          .then(() => {
            res.status(STATUS_CODE.OK).send({ data: card });
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(STATUS_CODE.NOT_FOUND).send({ message: `Карточка с указанным _id=${req.params.cardId} не найдена.` });
      }
      return next;
    });
};

// PUT /cards/:cardId/likes — поставить лайк карточке
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).then((card) => res.status(STATUS_CODE.OK).send({ data: card }))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// DELETE /cards/:cardId/likes — убрать лайк с карточки
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  ).then((card) => res.status(STATUS_CODE.OK).send({ data: card }))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

module.exports = {
  getCard, createCard, deleteCard, likeCard, dislikeCard,
};
