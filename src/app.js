import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartInfo from "./components/cart-info";
import Modal from "./components/modal";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const list = store.getState().list;
  const totalAmount = store.getTotalAmount();
  const totalCartItemsNumber = store.getTotalCartItemsNumber();
  const cartItemCodes = store.getState().cartItemCodes || [];
  const cart = store.getState().cart || {};

  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItem(code);
      },
      [store]
    ),

    onSelectItem: useCallback(
      (code) => {
        store.selectItem(code);
      },
      [store]
    ),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onAddCartItem: useCallback(
      (code) => {
        store.addCartItem(code);
      },
      [store]
    ),

    onDeleteCartItem: useCallback(
      (code) => {
        store.deleteCartItem(code);
      },
      [store]
    ),

    onGetTotalCartItems: useCallback(() => {
      return store.getTotalCartItems();
    }, [store]),

    onGetTotalAmount: useCallback(() => {
      return store.getTotalAmount();
    }, [store]),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <CartInfo
          totalAmount={totalAmount}
          totalCartItemsNumber={totalCartItemsNumber}
          setIsModalOpen={setIsModalOpen}
        />
        <List
          list={list}
          onDeleteItem={callbacks.onDeleteItem}
          onSelectItem={callbacks.onSelectItem}
          onAddCartItem={callbacks.onAddCartItem}
        />
      </PageLayout>
      <Modal isModalOpen={isModalOpen}>
        <Cart
          cartItemCodes={cartItemCodes}
          cart={cart}
          setIsModalOpen={setIsModalOpen}
          totalAmount={totalAmount}
          onDeleteCartItem={callbacks.onDeleteCartItem}
        />
      </Modal>
    </>
  );
}

export default App;
