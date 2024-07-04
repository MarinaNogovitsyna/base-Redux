import { connect } from "react-redux";
import { decrementLikes, incrementLikes } from "./redux/actions";

// В качестве пропсов в результате будет state
function Likes(props) {
  console.log(props);

  return (
    <div className="button-controls">
      {/* забираем данные из props(state) */}
      <button onClick={props.onIncrementLikes}>♥︎ {props.likes}</button>
      <button onClick={props.onDecrementtLikes}>Dislike</button>
    </div>
  );
}

// функция для передачи state в качестве props, здесь мы вытаскиваем likes из state
function mapStateToProps(state) {
  console.log(state);
  //   достанем likes из state
  const { likesReducer } = state;
  return {
    likes: likesReducer.likes,
  };
}

// функция для передачи в props каких-то функций
function mapDispatchToProps(dispatch) {
  return {
    // запускаем (диспачим) action
    // функции incrementLikes() и decrementLikes() возвращают типы нужных actions
    onIncrementLikes: () => dispatch(incrementLikes()),
    onDecrementtLikes: () => dispatch(decrementLikes()),
  };
}

// связываем state с нашим компонентом
export default connect(mapStateToProps, mapDispatchToProps)(Likes);
