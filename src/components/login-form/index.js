import { memo, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function LoginForm() {
  const [logValue, setLogValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const store = useStore();
  const navigate = useNavigate();
  const select = useSelector((state) => ({
    logError: state.login.logError,
    access: state.login.access,
  }));

  const callbacks = {
    logIn: useCallback(
      (log, pass) => store.actions.login.logIn(log, pass),
      [store]
    ),
  };

  useEffect(() => {
    if (select.access) {
      navigate("/");
    }
  }, [select.access]);

  return (
    <div className="Login">
      <h1 className="Login-title">Вход</h1>
      <form
        className="Login-form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e);
          callbacks.logIn(logValue, passValue);
          setLogValue("");
          setPassValue("");
        }}
      >
        <label className="Login-form-label">
          Логин
          <input
            className="Login-form-input"
            name="log"
            value={logValue}
            onChange={(e) => setLogValue(e.target.value)}
          ></input>
        </label>
        <label className="Login-form-label">
          Пароль
          <input
            className="Login-form-input"
            name="pass"
            value={passValue}
            onChange={(e) => setPassValue(e.target.value)}
          ></input>
        </label>
        {select.logError && (
          <span className="error-text">{select.logError}</span>
        )}
        <input type="submit" className="Login-form-submit" value="Войти" />
      </form>
    </div>
  );
}

export default memo(LoginForm);
