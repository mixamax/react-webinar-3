export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  loadComments: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: "comments/load-start" });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });

        // комментарии загружены успешно
        dispatch({
          type: "comments/load-success",
          payload: { data: res.data.result },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "comments/load-error" });
      }
    };
  },

  sendComment: (body, articleId) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "postcomment/load-start" });
      try {
        const resPost = await services.api.request({
          url: `/api/v1/comments`,
          method: "POST",
          body: JSON.stringify(body),
        });
        dispatch({
          type: "postcomment/load-success",
          payload: {
            post: resPost.data.result,
          },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "postcomment/load-error" });
      }
    };
  },
  setActiveComment: (id, parentMargin, idForAnswer) => {
    return (dispatch, getState, services) => {
      dispatch({
        type: "setActiveComment",
        payload: {
          data: { id, parentMargin, idForAnswer },
        },
      });
    };
  },
};
