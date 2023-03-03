class NotFound extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}
// 404 — карточка или пользователь не найден. или был запрошен несуществующий роут
module.exports = NotFound;