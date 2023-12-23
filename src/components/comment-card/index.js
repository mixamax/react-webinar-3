import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import CommentInput from "../comment-input";
import CommentNote from "../comment-note";

function CommentCard(props) {
  const cn = bem("Comment-card");

  let dateCorrect = props.date.replace(/ г\./gi, "");

  return (
    <div style={{ marginLeft: `${30 * props.margin}px` }} className={cn()}>
      <div className={cn("title")}>
        <span
          className={
            props.userName === props.name
              ? cn("title", { text: "bold", textcolor: "grey" })
              : cn("title", { text: "bold" })
          }
        >
          {props.name}
        </span>
        <span className={cn("title", { textcolor: "grey" })}>
          {dateCorrect}
        </span>{" "}
      </div>
      <p className={cn("text")}>{props.text}</p>
      <button
        className={cn("button")}
        onClick={() => {
          props.setIsActiveComment(props.id);
        }}
      >
        Ответить
      </button>
      {props.activeComment === props.id &&
        (props.exists ? (
          <CommentInput
            parentId={props.id}
            type={"comment"}
            isBackButton={true}
            setIsActiveComment={props.setIsActiveComment}
            sendComment={props.sendComment}
          />
        ) : (
          <CommentNote
            isBackButton={true}
            setIsActiveComment={props.setIsActiveComment}
          />
        ))}
    </div>
  );
}

CommentCard.propTypes = {
  id: PropTypes.string.isRequired,
  articleId: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired,
  waiting: PropTypes.bool.isRequired,
  exists: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  margin: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  setIsActiveComment: PropTypes.func.isRequired,
  activeComment: PropTypes.string.isRequired,
  sendComment: PropTypes.func.isRequired,
  userName: PropTypes.string,
};

CommentCard.defaultProps = {
  sendComment: () => {},
  setIsActiveComment: () => {},
};

export default memo(CommentCard);
