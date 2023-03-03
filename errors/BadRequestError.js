class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
//400 — переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля;
module.exports = BadRequestError;