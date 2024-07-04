import { type } from "@testing-library/user-event/dist/type";
import {
  INCREMENT,
  DECREMENT,
  INPUT_TEXT,
  COMMEMT_CREATE,
  COMMENT_UPDATE,
  COMMENT_DELETE,
  COMMENTS_LOAD,
  LOADER_DISPLAY_ON,
  LOADER_DISPLAY_OFF,
  ERROR_DISPLAY_ON,
  ERROR_DISPLAY_OFF,
} from "./types";

// в этом файле создаем actions (либо функции, которые возвращают тип actions
// для дальнейшей передачи в dispatch)

// указываем тип действия, а уже reducer по этому типу сделает нужное действие со стейтом
export function incrementLikes() {
  return {
    type: INCREMENT,
  };
}

export function decrementLikes() {
  return {
    type: DECREMENT,
  };
}

// здесь функция возвращает не только тип action, но и дополнительные данные
export function inputText(text) {
  return {
    type: INPUT_TEXT,
    text,
  };
}

export function commentCreate(text, id) {
  return {
    type: COMMEMT_CREATE,
    data: { text, id },
  };
}

export function commentUpdate(text, id) {
  return {
    type: COMMENT_UPDATE,
    data: { text, id },
  };
}

export function commentDelete(id) {
  return {
    type: COMMENT_DELETE,
    id,
  };
}

export function loaderOn() {
  return {
    type: LOADER_DISPLAY_ON,
  };
}

export function loaderOff() {
  return {
    type: LOADER_DISPLAY_OFF,
  };
}

export function errorOn(text) {
  return (dispatch) => {
    dispatch({
      type: ERROR_DISPLAY_ON,
      text,
    });

    // Удаляем ошибку через 2 секунды
    setTimeout(() => {
      dispatch(errorOff());
    }, 2000);
  };
}

export function errorOff() {
  return {
    type: ERROR_DISPLAY_OFF,
  };
}

export function commentsLoad() {
  return async (dispatch) => {
    try {
      // показываем лоудер, пока идет запрос
      dispatch(loaderOn());
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments?_limit=10"
      );
      const jsonData = await response.json();

      setTimeout(() => {
        dispatch({
          type: COMMENTS_LOAD,
          data: jsonData,
        });
        dispatch(loaderOff());
      }, 1000);
    } catch (err) {
      // передаем ошибку в state
      dispatch(errorOn("Ошибка API"));
      //   выключаем лоадер
      dispatch(loaderOff());
    }
  };
}
