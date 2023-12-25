import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import CommentInput from "../comment-input";
import CommentNote from "../comment-note";

function CommentCard(props) {
  const cn = bem("Comment-card");
  let margin = props.margin;
  if (props.margin >= 14) margin = 14;

  let dateCorrect = props.date.replace(/ г\./gi, "");

  return (
    <div className={cn()}>
      <div style={{ marginLeft: `${30 * margin}px` }}>
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
            props.setParentMargin(margin);
            props.setIsActiveComment(() =>
              searchLastChildren(props.children, props.id)
            );
            props.setIdForAnswer(props.id);
          }}
        >
          Ответить
        </button>
      </div>
      {props.activeComment === props.id &&
        (props.exists ? (
          <CommentInput
            margin={props.parentMargin}
            parentId={props.idForAnswer}
            type={"comment"}
            isBackButton={true}
            setIsActiveComment={props.setIsActiveComment}
            sendComment={props.sendComment}
          />
        ) : (
          <CommentNote
            margin={props.parentMargin}
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
  parentMargin: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  setIsActiveComment: PropTypes.func.isRequired,
  activeComment: PropTypes.string.isRequired,
  sendComment: PropTypes.func.isRequired,
  setParentMargin: PropTypes.func.isRequired,
  userName: PropTypes.string,
  children: PropTypes.array.isRequired,
  idForAnswer: PropTypes.string,
};

CommentCard.defaultProps = {
  sendComment: () => {},
  setIsActiveComment: () => {},
  setParentMargin: () => {},
};

export default memo(CommentCard);

let idForInput = "0";
function searchLastChildren(children, id) {
  if (children.length === 0) {
    idForInput = id;
  } else {
    let lastChildrenId = children[children.length - 1]._id;
    let newChildren = children[children.length - 1].children;
    searchLastChildren(newChildren, lastChildrenId);
  }
  return idForInput;
}
