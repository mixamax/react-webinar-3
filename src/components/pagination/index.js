import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Pagination({ activePage, setActivePage, count }) {
  const cn = bem("Pagination");
  if (activePage === 1) {
    return (
      <div className={cn()}>
        <div className={cn("number", { active: "true" })}>{activePage}</div>
        <div
          className={cn("number")}
          onClick={() => setActivePage((activePage) => activePage + 1)}
        >
          {activePage + 1}
        </div>
        <div
          className={cn("number")}
          onClick={() => setActivePage((activePage) => activePage + 2)}
        >
          {activePage + 2}
        </div>
        <div className={cn("number", { color: "grey" })}>...</div>
        <div className={cn("number")} onClick={() => setActivePage(count)}>
          {count}
        </div>
      </div>
    );
  }
  if (activePage === count) {
    return (
      <div className={cn()}>
        <div className={cn("number")} onClick={() => setActivePage(1)}>
          1
        </div>
        <div className={cn("number", { color: "grey" })}>...</div>
        <div
          className={cn("number")}
          onClick={() => setActivePage((activePage) => activePage - 2)}
        >
          {activePage - 2}
        </div>
        <div
          className={cn("number")}
          onClick={() => setActivePage((activePage) => activePage - 1)}
        >
          {activePage - 1}
        </div>

        <div
          className={cn("number", { active: "true" })}
          onClick={() => setActivePage(count)}
        >
          {count}
        </div>
      </div>
    );
  }
  return (
    <div className={cn()}>
      {activePage > 2 && (
        <div className={cn("number")} onClick={() => setActivePage(1)}>
          1
        </div>
      )}
      {activePage > 3 && (
        <div className={cn("number", { color: "grey" })}>...</div>
      )}
      <div
        className={cn("number")}
        onClick={() => setActivePage((activePage) => activePage - 1)}
      >
        {activePage - 1}
      </div>
      <div className={cn("number", { active: "true" })}>{activePage}</div>
      <div
        className={cn("number")}
        onClick={() => setActivePage((activePage) => activePage + 1)}
      >
        {activePage + 1}
      </div>
      {activePage < count - 2 && (
        <div className={cn("number", { color: "grey" })}>...</div>
      )}
      {activePage < count - 1 && (
        <div className={cn("number")} onClick={() => setActivePage(count)}>
          {count}
        </div>
      )}
    </div>
  );
}

Pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  setActivePage: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  setActivePage: () => {},
  activePage: 1,
};

export default memo(Pagination);
