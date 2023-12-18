import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css";

function Enter(props) {
  return (
    <div className="Enter">
      <Link className="Enter-link" to={`/users/${props.userName}`}>
        {props.userName}
      </Link>
      {props.access ? (
        <button className="Enter-button" onClick={props.logOut}>
          Выход
        </button>
      ) : (
        <button onClick={() => props.navigate()} className="Enter-button">
          Вход
        </button>
      )}
    </div>
  );
}

Enter.propTypes = {
  userName: PropTypes.string,
  access: PropTypes.bool,
  logOut: PropTypes.func,
  navigate: PropTypes.func,
};

Enter.defaultProps = {
  logOut: () => {},
  navigate: () => {},
};
export default memo(Enter);
