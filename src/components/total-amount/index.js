import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

function TotalAmount({ totalAmount }) {
  const cn = bem("Amount");
  return (
    <div className={cn()}>
      <span>Итого</span>
      <span className={cn("number")}>
        {totalAmount.toLocaleString("ru-RU", {
          style: "currency",
          currency: "RUB",
          maximumFractionDigits: 0,
        })}
      </span>
    </div>
  );
}

TotalAmount.propTypes = {
  totalAmount: PropTypes.number.isRequired,
};

export default React.memo(TotalAmount);
