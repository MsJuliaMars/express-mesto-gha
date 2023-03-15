// eslint-disable-next-line no-unused-vars,import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate'); // Валидация приходящих на сервер данных

const userIdValidate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = userIdValidate;
