import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import CommentCard from "../comment-card";
import CommentInput from "../comment-input";
import CommentNote from "../comment-note";

function Comments(props) {
  const cn = bem("Comments");
  const [activeComment, setIsActiveComment] = useState("none");
  const [idForAnswer, setIdForAnswer] = useState("none");
  const [parentMargin, setParentMargin] = useState(0);

  console.log("отсортиров комменты", props.comments);
  return (
    <div className={cn()}>
      <h2 className={cn("title")}>Комментарии ({props.count})</h2>
      <div className={cn("list")}>
        {props.comments.map((item) => (
          <CommentCard
            userName={props.userName}
            key={item.id}
            id={item.id}
            articleId={props.articleId}
            parentId={item.parentId}
            waiting={props.waiting}
            exists={props.exists}
            name={item.name}
            text={item.text}
            margin={item.margin}
            date={item.date}
            setIsActiveComment={setIsActiveComment}
            setIdForAnswer={setIdForAnswer}
            activeComment={activeComment}
            sendComment={props.sendComment}
            children={item.children}
            idForAnswer={idForAnswer}
            parentMargin={parentMargin}
            setParentMargin={setParentMargin}
          />
        ))}

        {activeComment === "none" &&
          (props.exists ? (
            <CommentInput
              margin={"none"}
              isBackButton={false}
              parentId={props.articleId}
              type={"article"}
              sendComment={props.sendComment}
              setIsActiveComment={setIsActiveComment}
            />
          ) : (
            <CommentNote margin={"none"} isBackButton={false} />
          ))}
      </div>
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  sendComment: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired,
  waiting: PropTypes.bool.isRequired,
  exists: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  userName: PropTypes.string,
};

Comments.defaultProps = {
  sendComment: () => {},
};

export default memo(Comments);
