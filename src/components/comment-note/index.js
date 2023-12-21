import { memo } from "react";
// import PropTypes from "prop-types";
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

// ProfileCard.propTypes = {
//   data: PropTypes.object.isRequired,
// };

// ProfileCard.defaultProps = {
//   onAdd: () => {},
// };

export default memo(CommentNote);
