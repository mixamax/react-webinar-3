import React from "react";
import PropTypes, { bool } from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Modal({ isModalOpen, children }) {
  const cn = bem("Modal");

  return (
    <div className={cn()} style={isModalOpen ? {} : { display: "none" }}>
      <div className={cn("center")}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  isModalOpen: bool,
};

export default React.memo(Modal);
