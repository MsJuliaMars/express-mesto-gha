const Card = require('../models/card');

// GET /cards — возвращает все карточки
const getCard = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(400).send({err: err}));
};
const createCard = (req, res) => {
  const { name, link } = req.body;
  console.log(req.user._id);
  const ownerId  = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({message: 'Данные карточки не подходят'});
      }
    });
};


// POST /cards — создаёт карточку
// const createCard = (req, res) => {
//   const {name, link} = req.body;
//   Card.create({name, link})
//     .then((card) => res.send({data: card}))
//     .catch((err) => {
//       res.send({err: err});
//     });
// }

// DELETE /cards/:cardId — удаляет карточку по идентификатору
const deleteCard = (req, res) => {
  const {cardId} = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (req.user._id === card.owner.toString()) {
        Card.findByIdAndDelete(cardId)
          .then(() => {
            res
              .status(200)
              .send({data: card});
          });
      }
    })
    .catch((err) => {
      res.send({err: err});
    });

}

module.exports = {getCard, createCard, deleteCard};