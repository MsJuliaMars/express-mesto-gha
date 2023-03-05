// ответ от сервера (статус-код)
module.exports.STATUS_CODE = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

// сообщения от сервера
module.exports.MESSAGE = {
  ERROR_CREATE_USER: 'Переданы некорректные данные при создании пользователя',
  ERROR_SEARCH_USER: 'Переданы некорректные данные при поиске пользователя по id',
  USER_NOT_FOUND: 'Запрашиваемый пользователь не найден',
  USER_SERVER_ERROR: 'На сервере произошла ошибка',
  ERROR_CREATE_CARD: 'Переданы некорректные данные при создании карточки',
};
