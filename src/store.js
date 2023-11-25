/**
 * Хранилище состояния приложения
 */
class Store {
    constructor(initState = {}) {
        this.state = initState;
        this.listeners = []; // Слушатели изменений состояния
        this.codeNumber =
            [...this.state.list].sort((a, b) => b.code - a.code)[0].code + 1 ||
            0; //учел варианты, когда код в исходном массиве > длины исходного массива
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
     * Добавление новой записи
     */
    // addItem() {
    //     this.setState({
    //         ...this.state,
    //         list: [
    //             ...this.state.list,
    //             { code: this.state.list.length + 1, title: "Новая запись" },
    //         ],
    //     });
    // }
    addItem() {
        this.setState({
            ...this.state,
            list: [
                ...this.state.list,
                { code: this.codeNumber, title: "Новая запись" },
            ],
        });
        this.codeNumber++;
    }

    /**
     * Удаление записи по коду
     * @param code
     */
    deleteItem(code) {
        this.setState({
            ...this.state,
            list: this.state.list.filter((item) => item.code !== code),
        });
    }

    /**
     * Выделение записи по коду
     * @param code
     */
    selectItem(code) {
        this.setState({
            ...this.state,
            list: this.state.list.map((item) => {
                if (item.code === code) {
                    item.selected = !item.selected;
                    if (item.selected)
                        item.selectNumber = item.selectNumber + 1 || 1; //номер выделения
                } else {
                    item.selected = false; //снятие выделения
                }
                return item;
            }),
        });
    }
}

export default Store;
