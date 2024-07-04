import { INCREMENT, DECREMENT } from "./types";

const initialState = {
  likes: 0,
};

export const likesReducer = (state = initialState, action) => {
  //   в зависимости от типа действия(action) будем как-то менять state
  // причем менять напрямую нельзя, нужно создать копию (...state), сделать изменения там, а потом вернуть
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        likes: state.likes + 1,
      };

    case DECREMENT: {
      return {
        ...state,
        likes: state.likes - 1,
      };
    }

    default:
      return state;
  }
};
