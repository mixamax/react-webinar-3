import React from "react";
import PropTypes from "prop-types";
import { Children } from "react";
import "./style.css";

function List(props) {
  return (
    <div className="List">
      {Children.map(props.children, (child) => (
        <div className="List-item">{child}</div>
      ))}
    </div>
  );
}

List.propTypes = {
  children: PropTypes.array.isRequired,
};

export default React.memo(List);
