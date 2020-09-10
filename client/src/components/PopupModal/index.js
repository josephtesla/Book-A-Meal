import React from "react";
import "./index.css"

const Modal = ({ handleClose, show, children, headerTitle }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName} >
      <section className="modal-main" style={{ top: showHideClassName ? "50%" : "0" }}>
     
      <div className="close-icon" onClick={handleClose}>
      <h3>{headerTitle}</h3>
        <b>x</b></div>
        {children}
      </section>
    </div>
  );
};

export default Modal;