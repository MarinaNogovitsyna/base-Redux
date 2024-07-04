import { useDispatch, useSelector } from "react-redux";
import { inputText } from "./redux/actions";

function Title(props) {
  const dispatch = useDispatch();

  // хук, позволяющий взять данные из state
  const text = useSelector((state) => {
    // достаем конкретный reducer из state
    const { inputReducer } = state;
    // берем наш текст
    return inputReducer.text;
  });

  const handleChange = (e) => {
    // передаем в диспатч редьюсер и введенный текст
    dispatch(inputText(e.target.value));
  };

  return (
    <div className="card-title">
      <div className="card-title-top">
        <input type="text" onChange={handleChange} />
      </div>
      <p>{text}</p>
    </div>
  );
}

export default Title;
