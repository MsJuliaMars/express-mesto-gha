class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
  }
}

// 403 - сервер понял запрос, но отказывается его авторизовать.
// (например, у пользователя не хватает прав доступа к запрашиваемому ресурсу)
module.exports = ForbiddenError;
