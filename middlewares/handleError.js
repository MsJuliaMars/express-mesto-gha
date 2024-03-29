const handleError = (err, req, res, next) => {
  const {
    statusCode = 500,
    message = 'Неизвестная ошибка сервера _',
  } = err;
  res
    .status(statusCode)
    .json({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
};

module.exports = handleError;
