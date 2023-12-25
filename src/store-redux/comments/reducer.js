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
      const newPostComment = action.payload.post;
      console.log(newPostComment, "новый пост");
      const newItems = [...state.data.items, newPostComment];
      const newCount = state.data.count + 1;
      return {
        ...state,
        data: {
          items: newItems,
          count: newCount,
          postcomment: newPostComment,
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
