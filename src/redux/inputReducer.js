import { INPUT_TEXT } from "./types";

const initialState = {
  text: ''
};

export const inputReducer = (state = initialState, action) => {
  //   в зависимости от типа действия(action) будем как-то менять state
  // причем менять напрямую нельзя, нужно создать копию (...state), сделать изменения там, а потом вернуть
  switch (action.type) {
    case INPUT_TEXT:
      return {
        ...state,
        text: action.text,
      };

    default:
      return state;
  }
};
