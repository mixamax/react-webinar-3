import { memo } from "react";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";

function UserInfo(props) {
  const cn = bem("User");

  return (
    <div className={cn()}>
      <h1 className={cn("title")}>Профиль</h1>
      <div className={cn("text-wrapper")}>
        <span className={cn("text")}>
          Имя:<b> {props.name}</b>
        </span>
        <span className={cn("text")}>
          Телефон:<b> {props.phone}</b>
        </span>
        <span className={cn("text")}>
          email:<b> {props.email}</b>
        </span>
      </div>
    </div>
  );
}

export default memo(UserInfo);

UserInfo.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
};
