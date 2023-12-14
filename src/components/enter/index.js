import { memo, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";

function Enter() {
  const navigate = useNavigate();
  const store = useStore();
  const select = useSelector((state) => ({
    userName: state.login.userName,
    access: state.login.access,
  }));

  const callbacks = {
    logOut: useCallback(() => store.actions.login.logOut(), [store]),
    getAccess: useCallback(() => store.actions.login.getAccess(), [store]),
  };

  useEffect(() => {
    callbacks.getAccess();
  }, [select.access]);

  return (
    <div className="Enter">
      <Link className="Enter-link" to={"/user"}>
        {select.userName}
      </Link>
      {select.access ? (
        <button className="Enter-button" onClick={callbacks.logOut}>
          Выход
        </button>
      ) : (
        <button onClick={() => navigate("/login")} className="Enter-button">
          Вход
        </button>
      )}
    </div>
  );
}

export default memo(Enter);
