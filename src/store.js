import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   */
  addCartItem(code) {
    const listItem = this.state.list.find((item) => item.code === code);
    const itemCodes = this.state?.cartItemCodes || [];

    this.setState({
      ...this.state,
      cart: {
        ...(this.state?.cart || {}),
        [code]: {
          title: listItem.title,
          price: listItem.price,
          quantity: this.state?.cart?.[code]?.quantity + 1 || 1,
        },
      },
      cartItemCodes: itemCodes.includes(code)
        ? itemCodes
        : [...itemCodes, code],
    });
  }
  /**
   * Удаление товара из корзины
   */
  deleteCartItem(code) {
    const newcartItemCodes = this.state.cartItemCodes.filter(
      (itemCode) => itemCode !== code
    );
    const newCart = {};
    newcartItemCodes.forEach((itemCode) => {
      newCart[itemCode] = {
        title: this.state.cart[code].title,
        price: this.state.cart[code].price,
        quantity: this.state.cart[code].quantity,
      };
    });

    this.setState({
      ...this.state,
      cart: newCart,
      cartItemCodes: newcartItemCodes,
    });
  }
  /**
   * Количество наименований в корзине
   */
  getTotalCartItemsNumber() {
    return this.state?.cartItemCodes?.length || 0;
  }
  /**
   * Итоговая сумма товаров
   */
  getTotalAmount() {
    const amount =
      this.state?.cartItemCodes?.reduce(
        (prev, curr) =>
          prev + this.state.cart[curr].quantity * this.state.cart[curr].price,
        0
      ) || 0;

    return amount;
  }
}

export default Store;
