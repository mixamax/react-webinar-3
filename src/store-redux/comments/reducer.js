// Начальное состояние
export const initialState = {
  data: {
    items: [],
    count: 0,
    postcomment: {},
  },
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, data: { items: [], count: 0 }, waiting: true };

    case "comments/load-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "comments/load-error":
      return { ...state, data: { items: [], count: 0 }, waiting: false }; //@todo текст ошибки сохранять?

    case "postcomment/load-success":
      return {
        ...state,
        data: {
          ...action.payload.data.comments,
          postcomment: action.payload.data.post,
        },
      };
    case "postcomment/load-error":
      return state;

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
