import React from "react";
import PropTypes, { number } from "prop-types";
import "./style.css";
import CartItem from "../cart-item";
import { cn as bem } from "@bem-react/classname";

function CartList({ cartItemCodes, cart, totalAmount, onDeleteCartItem }) {
  const cn = bem("Cart-list");
  return (
    <>
      <div className={cn()}>
        {cartItemCodes.map((code) => (
          <div key={code} className={cn("item")}>
            <CartItem
              code={code}
              price={cart[code].price}
              quantity={cart[code].quantity}
              title={cart[code].title}
              deleteCartItem={onDeleteCartItem}
            />
          </div>
        ))}
      </div>
      <div className={cn("amount")}>
        <span>
          <b>Итого</b>
        </span>
        <span className={cn("amount-number")}>
          <b>
            {totalAmount.toLocaleString("ru-RU", {
              style: "currency",
              currency: "RUB",
            })}
          </b>
        </span>
      </div>
    </>
  );
}

CartList.propTypes = {
  cartItemCodes: PropTypes.arrayOf(number).isRequired,
  cart: PropTypes.object.isRequired,
  totalAmount: PropTypes.number.isRequired,
  onDeleteCartItem: PropTypes.func.isRequired,
};

CartList.defaultProps = {
  onDeleteCartItem: () => {},
};

export default React.memo(CartList);
