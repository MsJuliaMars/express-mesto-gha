const mongoose = require('mongoose');

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
      validator(avatar) {
        return /^(http:|https:)\/\/w*\w/.test(avatar);
      },
      message: 'Ссылка на аватар некорректна',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
