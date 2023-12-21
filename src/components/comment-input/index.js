import { memo, useId, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

function CommentInput(props) {
  const cn = bem("Comment-input");
  const [textArea, setTextArea] = useState("");

  const sendComment = (e) => {
    e.preventDefault();
    setTextArea("");
    const body = {
      text: textArea,
      parent: { _id: props.parentId, _type: props.type },
    };
    props.sendComment(body);
    props.setIsActiveComment("none");
  };

  return (
    <div className={cn()}>
      <span className={cn("title")}>{`${"Новый комментарий"}`}</span>
      <form onSubmit={sendComment}>
        <textarea
          name="comment"
          className={cn("textarea")}
          placeholder="Текст"
          value={textArea}
          onChange={(e) => setTextArea(e.target.value)}
        ></textarea>
        <button className={cn("button")} type="submit">
          Отправить
        </button>
        {props.isBackButton && (
          <button
            className={cn("button")}
            onClick={() => props.setIsActiveComment("none")}
          >
            Отмена
          </button>
        )}
      </form>
    </div>
  );
}

CommentInput.propTypes = {
  setIsActiveComment: PropTypes.func.isRequired,
  sendComment: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  isBackButton: PropTypes.bool.isRequired,
  parentId: PropTypes.string.isRequired,
};

CommentInput.defaultProps = {
  setIsActiveComment: () => {},
  sendComment: () => {},
};

export default memo(CommentInput);
