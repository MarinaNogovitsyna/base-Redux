import { useEffect, useState } from "react";
import SingleComment from "./SingleComment";
import { useDispatch, useSelector } from "react-redux";
import { commentCreate, commentsLoad } from "./redux/actions";
import uniqid from "uniqid";

function Comments(props) {
  console.log("Comments props > ", props);

  const dispatch = useDispatch();
  const [textComment, setTextComment] = useState("");

  //  забираем с помощью хука массив из комментариев из стейта
  const comments = useSelector((state) => {
    console.log("state > ", state);
    const { commentsReducer } = state;
    return commentsReducer.comments;
  });

  const handleInput = (e) => {
    setTextComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // создаем с помощью отдельной библиотеки уникальный id
    const id = uniqid();
    dispatch(commentCreate(textComment, id));
  };

  useEffect(() => {
    dispatch(commentsLoad());
  }, []);
  console.log(comments);

  return (
    <div className="card-comments">
      <form onSubmit={handleSubmit} className="comments-item-create">
        <input type="text" value={textComment} onChange={handleInput} />
        <input type="submit" hidden />
      </form>
      {!!comments.length &&
        comments.map((el) => {
          return <SingleComment key={el.id} data={el} />;
        })}
    </div>
  );
}

export default Comments;
