import React, { Component } from "react";
import "./index.css"

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName} >
      <section className="modal-main" style={{ top: showHideClassName ? "50%" : "0" }}>
        <div className="close-icon" onClick={handleClose}><b>x</b></div>
        {children}
      </section>
    </div>
  );
};

export default Modal;