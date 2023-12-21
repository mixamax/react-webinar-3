import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentNote(props) {
  const cn = bem("Comment-note");

  return (
    <div className={cn()}>
      <a href="/login" className={cn("loginlink")}>
        Войдите
      </a>
      <span>, чтобы иметь возможность ответить. </span>
      {props.isBackButton && (
        <button
          className={cn("button")}
          onClick={() => props.setIsActiveComment("none")}
        >
          Отмена
        </button>
      )}
    </div>
  );
}

CommentNote.propTypes = {
  isBackButton: PropTypes.bool.isRequired,
  setIsActiveComment: PropTypes.func,
};

CommentNote.defaultProps = {
  setIsActiveComment: () => {},
};

export default memo(CommentNote);
