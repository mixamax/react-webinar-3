import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { plural } from "../../utils";
import { cn as bem } from "@bem-react/classname";

function CartInfo(props) {
  const cn = bem("Cart-info");
  return (
    <div className={cn()}>
      {props.totalCartItemsNumber === 0 ? (
        <span className={cn("text")}>
          В корзине <b>пусто</b>
        </span>
      ) : (
        <span className={cn("text")}>
          В корзине:
          <b>{`  ${props.totalCartItemsNumber} ${plural(
            props.totalCartItemsNumber,
            {
              one: "товар",
              few: "товара",
              many: "товаров",
            }
          )} / ${props.totalAmount.toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
          })}`}</b>
        </span>
      )}

      <div className={cn("actions")}>
        <button
          className={cn("button")}
          onClick={() => props.setIsModalOpen(true)}
        >
          Перейти
        </button>
      </div>
    </div>
  );
}

CartInfo.propTypes = {
  item: PropTypes.shape({
    totalCartItemsNumber: PropTypes.number.isRequired,
    totalAmount: PropTypes.number.isRequired,
    setIsModalOpen: PropTypes.func.isRequired,
  }),
};

CartInfo.defaultProps = {
  setIsModalOpen: () => {},
};

export default React.memo(CartInfo);
