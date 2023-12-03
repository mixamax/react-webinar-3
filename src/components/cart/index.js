import React from "react";
import PropTypes, { number } from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import CartHead from "../cart-head";
import List from "../list";
import CartItem from "../cart-item";
import TotalAmount from "../total-amount";

function Cart({
  cartItemCodes,
  cart,
  setIsModalOpen,
  totalAmount,
  onDeleteCartItem,
}) {
  const cn = bem("Cart");

  return (
    <div className={cn()}>
      <CartHead title="Корзина" setIsModalOpen={setIsModalOpen} />
      <List>
        {cartItemCodes.map((code) => (
          <CartItem
            key={code}
            code={code}
            price={cart[code].price}
            quantity={cart[code].quantity}
            title={cart[code].title}
            deleteCartItem={onDeleteCartItem}
          />
        ))}
      </List>
      <TotalAmount totalAmount={totalAmount} />
    </div>
  );
}

Cart.propTypes = {
  cartItemCodes: PropTypes.arrayOf(number).isRequired,
  cart: PropTypes.object.isRequired,
  totalAmount: PropTypes.number.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  onDeleteCartItem: PropTypes.func.isRequired,
};
Cart.defaultProps = {
  setIsModalOpen: () => {},
  onDeleteCartItem: () => {},
};

export default React.memo(Cart);
