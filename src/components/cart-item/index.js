import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

function CartItem(props) {
  const cn = bem("Cart-item");
  return (
    <div className={cn()}>
      <div className={cn("code")}>{props.code}</div>
      <div className={cn("title")}>{props.title}</div>
      <div className={cn("price")}>
        {" "}
        {props.price.toLocaleString("ru-RU", {
          style: "currency",
          currency: "RUB",
          maximumFractionDigits: 0,
        })}
      </div>
      <div className="Cart-item-quantity">{`${props.quantity} шт`}</div>
      <div className="Cart-item-actions">
        <button
          className={cn("button")}
          onClick={() => props.deleteCartItem(props.code)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    deleteCartItem: PropTypes.func.isRequired,
  }),
};
CartItem.defaultProps = {
  deleteCartItem: () => {},
};

export default React.memo(CartItem);
