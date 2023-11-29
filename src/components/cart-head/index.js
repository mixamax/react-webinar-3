import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CartHead({ title, setIsModalOpen }) {
  const cn = bem("Cart-head");
  return (
    <div className={cn()}>
      <h1>{title}</h1>
      <div className={cn("actions")}>
        <button className={cn("button")} onClick={() => setIsModalOpen(false)}>
          Закрыть
        </button>
      </div>
    </div>
  );
}

CartHead.propTypes = {
  title: PropTypes.string.isRequired,
  setIsModalOpen: PropTypes.func,
};

CartHead.defaultProps = {
  setIsModalOpen: () => {},
};
export default React.memo(CartHead);
