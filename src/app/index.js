import { Routes, Route } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import LogIn from "./login";
import User from "./user";
import useStore from "../hooks/use-store";
import useInit from "../hooks/use-init";
import UserPageContainer from "../containers/user-page-container";
/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const select = useSelector((state) => ({
    isLogin: state.login.isLogin,
    activeModal: state.modals.name,
  }));

  useInit(() => {
    store.actions.login.setLogInState();
  }, [select.isLogin]);

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/login"} element={<LogIn />} />
        <Route
          path={"/users/:name"}
          element={
            <UserPageContainer redirect={"/login"} isLogin={select.isLogin}>
              <User />
            </UserPageContainer>
          }
        />
      </Routes>

      {select.activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
