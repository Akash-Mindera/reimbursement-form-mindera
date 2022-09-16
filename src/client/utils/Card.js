import React from "react";
import "./Card.css";
const Card = (props) => {
  return (
    <div className="cardDiv" style={{ border: props.error && "1px solid red" }}>
      {props.children}
    </div>
  );
};

export default Card;
