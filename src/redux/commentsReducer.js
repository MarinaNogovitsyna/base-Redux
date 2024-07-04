import {
  COMMEMT_CREATE,
  COMMENTS_LOAD,
  COMMENT_DELETE,
  COMMENT_UPDATE,
} from "./types";

const initialState = {
  comments: [],
};

export function commentsReducer(state = initialState, action) {
  console.log("commentsReducer > ", action);
  switch (action.type) {
    case COMMEMT_CREATE: {
      return {
        ...state,
        // к существующим комментариям добавляем новый, при этом каждый комментарий
        // вида {text: '...', id: ''}
        comments: [...state.comments, action.data],
      };
    }

    case COMMENTS_LOAD: {
      // подгоняем полученные данные извне к виду нашего комментария
      const commentsNew = action.data.map((res) => {
        return {
          text: res.name,
          id: res.id,
        };
      });
      return {
        ...state,
        comments: commentsNew,
      };
    }

    case COMMENT_UPDATE: {
      const { data } = action;
      const { comments } = state;
      const indexItem = comments.findIndex((el) => el.id === data.id);
      const nextComments = [
        ...comments.slice(0, indexItem),
        data,
        ...comments.slice(indexItem + 1),
      ];

      return {
        ...state,
        comments: nextComments,
      };
    }

    case COMMENT_UPDATE: {
      const { data } = action;
      const { comments } = state;
      const indexItem = comments.findIndex((el) => el.id === data.id);
      const nextComments = [
        ...comments.slice(0, indexItem),
        data,
        ...comments.slice(indexItem + 1),
      ];

      return {
        ...state,
        comments: nextComments,
      };
    }

    case COMMENT_DELETE:
      return (() => {
        const { id } = action;
        const { comments } = state;
        const indexItem = comments.findIndex((el) => el.id === id);
        const nextComments = [
          ...comments.slice(0, indexItem),
          ...comments.slice(indexItem + 1),
        ];

        return {
          ...state,
          comments: nextComments,
        };
      })();

    default:
      return state;
  }
}
