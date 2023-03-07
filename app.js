const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { STATUS_CODE } = require('./utils/constantsError');

const
  { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {});

const app = express(); // запускаем наш express
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use((req, res, next) => {
  req.user = {
    _id: '63ff8e5b5f67c08e0ee86221',
  };

  next();
});

app.use('/', usersRouter);
app.use('/', cardsRouter);

// Обработка неправильного пути '*'
app.use('*', (req, res) => {
  res.status(STATUS_CODE.NOT_FOUND).send({ message: 'Обработка неправильного пути' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
