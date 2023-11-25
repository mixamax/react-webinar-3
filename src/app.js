import React from "react";
import { createElement } from "./utils.js";
import "./styles.css";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
    const list = store.getState().list;

    return (
        <div className="App">
            <div className="App-head">
                <h1>Приложение на чистом JS</h1>
            </div>
            <div className="App-controls">
                <button onClick={() => store.addItem()}>Добавить</button>
            </div>
            <div className="App-center">
                <div className="List">
                    {list.map((item) => (
                        <div key={item.code} className="List-item">
                            <div
                                className={
                                    "Item" +
                                    (item.selected ? " Item_selected" : "")
                                }
                                onClick={() => store.selectItem(item.code)}
                            >
                                <div className="Item-code">{item.code}</div>
                                <div className="Item-title">
                                    {item.title}
                                    {!!item.selectNumber &&
                                        ` | Выделяли ${
                                            item.selectNumber
                                        } ${plural(item.selectNumber)}`}
                                </div>
                                <div className="Item-actions">
                                    <button
                                        onClick={() =>
                                            store.deleteItem(item.code)
                                        }
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;

function plural(n) {
    const forms = ["раза", "раз"];
    let idx;
    if (
        (n % 10 === 2 && n % 100 !== 12) ||
        (n % 10 === 3 && n % 100 !== 13) ||
        (n % 10 === 4 && n % 100 !== 14)
    ) {
        idx = 0; // 'раза'
    } else {
        idx = 1; // 'раз'
    }
    return forms[idx] || "";
}
