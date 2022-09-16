import React from "react";
import "./Modal.css";
const Modal = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal" onClick={props.onClose}>
      {console.log(props.show)}
      <div
        className={`modal-content ${props.show ? "show" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h4 className="modal-title">{props.title}</h4>
        </div>
        <div className="modal-body">
          <p className="modal-para">{props.content}</p>{" "}
        </div>
        <div className="modal-footer">
          <button className="cancelButton" onClick={props.onClose}>
            Cancel
          </button>
          <button className="clearButton" onClick={props.clearFormHandler}>
            Clear Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
