const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const isURL = require('validator/es/lib/isURL');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return isURL(url);
      },
      message: 'Ссылка некорректна',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
