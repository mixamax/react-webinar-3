import { memo, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
// import useInit from "../../hooks/use-init";

function Enter() {
  const navigate = useNavigate();
  const store = useStore();
  const select = useSelector((state) => ({
    userName: state.user.userName,
    isLogin: state.login.isLogin,
    access: state.user.access,
  }));

  //   useInit(
  //     () => {
  //       store.actions.login.setLogInState();
  //     },
  //     [],
  //     true
  //   );

  const callbacks = {
    logOut: useCallback(() => store.actions.login.logOut(), [store]),
    getAccess: useCallback(() => store.actions.user.getAccess(), [store]),
  };

  useEffect(() => {
    callbacks.getAccess();
  }, [select.isLogin]);

  return (
    <div className="Enter">
      <Link className="Enter-link" to={`/users/${select.userName}`}>
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
