import { errorOn } from "./actions";
import { COMMEMT_CREATE } from "./types";

const badWords = ["козел", "осел"];

export function spamFilter(store) {
  return function (next) {
    return function (action) {
      if (action.type === COMMEMT_CREATE) {
        const hasBadWords = badWords.some((res) =>
          action.data.text.includes(res)
        );
        if (hasBadWords) {
          return store.dispatch(errorOn("Такие слова запрещены"));
        }
      }
      return next(action);
    };
  };
}
