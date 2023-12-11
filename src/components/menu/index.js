import { memo } from "react";
// import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { NavLink } from "react-router-dom";

function Menu() {
  const cn = bem("menu");
  return (
    <NavLink to="/" className={cn()}>
      Главная
    </NavLink>
  );
}

export default memo(Menu);
