const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const {PORT = 3000} = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
})
// подключаемся к серверу mongo
// mongoose.connect('mongodb://localhost:27017/mestodb', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// });

const app = express(); //запускаем наш express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  req.user = {
    _id: '63ff8e5b5f67c08e0ee86221'
  };

  next();
});


app.use('/', usersRouter);
app.use('/', cardsRouter);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
});