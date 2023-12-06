import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";

function ItemParams(props) {
  console.log(props._id);
  const cn = bem("Item-params");
  return (
    <div className={cn()}>
      <span className={cn("description")}>{props.data.description}</span>
      <span className={cn("description")}>
        Страна производитель: <b>{props.data.madeIn}</b>
      </span>
      <span className={cn("description")}>
        Категория: <b>{props.data.category}</b>
      </span>
      <span className={cn("description")}>
        Год выпуска: <b>{props.data.edition}</b>
      </span>
      <span className={cn("price")}>
        Цена: {numberFormat(props.data.price)} ₽
      </span>
      <button
        className={cn("button")}
        onClick={() => props.addToBasket(props._id)}
      >
        Добавить
      </button>
    </div>
  );
}

export default memo(ItemParams);

ItemParams.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string,
    madeIn: PropTypes.string,
    category: PropTypes.string,
    edition: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  addToBasket: PropTypes.func,
  _id: PropTypes.string,
};

ItemParams.defaultProps = {
  addToBasket: () => {},
};
