import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemPage from "./item-page";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/articles/:itemId" element={<ItemPage />} />
        <Route path="*" element={<div>Страница не найдена</div>} />
      </Routes>
      {activeModal === "basket" && <Basket />}
    </BrowserRouter>
  );
}

export default App;
