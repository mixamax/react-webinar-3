import { memo } from "react";
import "./style.css";
import useSelector from "../../hooks/use-selector";
import { cn as bem } from "@bem-react/classname";

function UserInfo() {
  const cn = bem("User");

  const select = useSelector((state) => ({
    access: state.user.access,
    name: state.user.userName,
    phone: state.user.userPhone,
    email: state.user.userEmail,
    isLoading: state.user.isLoading,
    isLogin: state.login.isLogin,
  }));

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
