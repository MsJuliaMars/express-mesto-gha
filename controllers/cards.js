/* eslint-disable no-underscore-dangle */
const Card = require('../models/card');
const {
  STATUS_CODE,
  MESSAGE,
} = require('../utils/constantsError');
const NotFound = require('../errors/NotFound');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');

// GET /cards — возвращает все карточки
const getCard = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(STATUS_CODE.OK)
      .send(cards))
    .catch(next);
};

// POST /cards — создаёт карточку
const createCard = (req, res, next) => {
  const {
    name,
    link,
  } = req.body;
  const ownerId = req.user._id;
  Card.create({
    name,
    link,
    owner: ownerId,
  })
    .then((card) => {
      res.status(STATUS_CODE.OK)
        .send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(MESSAGE.ERROR_CREATE_CARD));
      }
      return next(err);
    });
};

// DELETE /cards/:cardId — удаляет карточку по идентификатору
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(new NotFound(`Карточка с указанным _id=${req.params.cardId} не найдена.`))
    .then((card) => {
      if (req.user._id === card.owner.toString()) {
        Card.findByIdAndDelete(req.params.cardId)
          .then(() => {
            res.status(STATUS_CODE.OK)
              .send({ data: card });
          });
      } else {
        throw new ForbiddenError('MESSAGE.ERROR_CONFLICT_CARD');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'TypeError') {
        next(new NotFound(`Карточка с указанным _id=${req.params.cardId} не найдена.`));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// PUT /cards/:cardId/likes — поставить лайк карточке
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      // eslint-disable-next-line no-new
      new NotFound(MESSAGE.ERROR_NOT_LIKE);
    })
    .then((card) => {
      res.status(STATUS_CODE.OK)
        .send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFound(MESSAGE.ERROR_CREATE_LIKE));
      } else if (err.name === 'CastError') {
        next(new BadRequestError(MESSAGE.ERROR_NOT_LIKE));
      }
      next(err);
    });
};

// DELETE /cards/:cardId/likes — убрать лайк с карточки
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => {
      // eslint-disable-next-line no-new
      new NotFound(MESSAGE.ERROR_NOT_LIKE);
    })
    .then((card) => res.status(STATUS_CODE.OK)
      .send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(MESSAGE.ERROR_NOT_LIKE));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFound(MESSAGE.ERROR_CREATE_LIKE));
      }
      next(err);
    });
};

module.exports = {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
