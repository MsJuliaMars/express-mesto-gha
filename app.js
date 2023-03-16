const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const cookieParser = require('cookie-parser');
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const routes = require('./routes/index');
const { STATUS_CODE } = require('./utils/constantsError');
const handleError = require('./middlewares/handleError');
const auth = require('./middlewares/auth');

const
  { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {});

const app = express(); // запускаем наш express

app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(errors()); // обработчик ошибок celebrate
app.use(handleError);
// app.use((req, res, next) => {
//   req.user = {
//     _id: '63ff8e5b5f67c08e0ee86221',
//   };
//
//   next();
// });

app.use(routes);
app.use('/', usersRouter);
app.use('/', cardsRouter);

// Обработка неправильного пути '*'
app.use('*', (req, res) => {
  res.status(STATUS_CODE.NOT_FOUND).send({ message: 'Обработка неправильного пути' });
});

app.use(auth);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
