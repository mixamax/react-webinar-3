import { memo, useEffect, useId, useRef, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

function CommentInput(props) {
  const cn = bem("Comment-input");
  const [textArea, setTextArea] = useState("");
  const ref = useRef();

  const sendComment = (e) => {
    e.preventDefault();
    setTextArea("");
    const body = {
      text: textArea,
      parent: { _id: props.parentId, _type: props.type },
    };
    if (textArea.trim() === "") return;
    props.sendComment(body);
    props.setIsActiveComment("none");
  };
  let margin = 0;
  if (props.margin !== "none") margin = props.margin + 1;
  useEffect(() => {
    if (props.margin !== "none") {
      window.scrollTo({
        top: ref.current.offsetTop - document.documentElement.clientHeight / 2,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div ref={ref} style={{ marginLeft: `${30 * margin}px` }} className={cn()}>
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
