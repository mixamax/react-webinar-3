import { memo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import Enter from "../../components/enter";

function EnterContainer() {
  const navigate = useNavigate();
  const store = useStore();
  const select = useSelector((state) => ({
    userName: state.user.userName,
    isLogin: state.login.isLogin,
    access: state.user.access,
  }));

  const callbacks = {
    logOut: useCallback(() => store.actions.login.logOut(), [store]),
    getAccess: useCallback(() => store.actions.user.getAccess(), [store]),
    navigate: useCallback(() => navigate("/login")),
  };

  useEffect(() => {
    callbacks.getAccess();
  }, [select.isLogin]);

  return (
    <Enter
      userName={select.userName}
      logOut={callbacks.logOut}
      access={select.access}
      navigate={callbacks.navigate}
    />
  );
}

export default memo(EnterContainer);
