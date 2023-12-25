import { memo, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentNote(props) {
  const cn = bem("Comment-note");
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef();
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

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate("/login", {
        state: { back: location.pathname },
      });
    }, [location.pathname]),
  };

  return (
    <div ref={ref} className={cn()} style={{ marginLeft: `${30 * margin}px` }}>
      <button className={cn("loginlink")} onClick={callbacks.onSignIn}>
        Войдите
      </button>

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
