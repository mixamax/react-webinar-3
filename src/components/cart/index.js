import React from "react";
import PropTypes, { number } from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import CartHead from "../cart-head";
import CartList from "../cart-list";

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
      <CartList
        cartItemCodes={cartItemCodes}
        cart={cart}
        totalAmount={totalAmount}
        onDeleteCartItem={onDeleteCartItem}
      />
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
