import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import useSelector from "../../hooks/use-selector";
import { cn as bem } from "@bem-react/classname";

function UserInfo() {
  const navigate = useNavigate();
  const cn = bem("User");

  const select = useSelector((state) => ({
    access: state.user.access,
    name: state.user.userName,
    phone: state.user.userPhone,
    email: state.user.userEmail,
    isLoading: state.user.isLoading,
    isLogin: state.login.isLogin,
  }));

  //   useInit(
  //     () => {
  //       store.actions.user.getAccess();
  //     },
  //     [select.isLogin],
  //     true
  //   );

  useEffect(() => {
    if (!select.isLoading && !select.access) {
      console.log("переходим в логин");
      navigate("/login");
    }
  }, [select.access, select.isLoading]);

  return (
    <div className={cn()}>
      <h1 className={cn("title")}>Профиль</h1>
      <div className={cn("text-wrapper")}>
        <span className={cn("text")}>
          Имя:<b> {select.name}</b>
        </span>
        <span className={cn("text")}>
          Телефон:<b> {select.phone}</b>
        </span>
        <span className={cn("text")}>
          email:<b> {select.email}</b>
        </span>
      </div>
    </div>
  );
}

export default memo(UserInfo);
