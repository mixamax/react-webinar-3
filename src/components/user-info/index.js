import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import useSelector from "../../hooks/use-selector";
import { cn as bem } from "@bem-react/classname";

function UserInfo() {
  const navigate = useNavigate();
  const cn = bem("User");

  const select = useSelector((state) => ({
    access: state.login.access,
    name: state.login.userName,
    phone: state.login.userPhone,
    email: state.login.userEmail,
  }));

  useEffect(() => {
    if (!select.access) {
      navigate("/login");
    }
  }, [select.access]);

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
