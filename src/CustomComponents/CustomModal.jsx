import React from "react";
import "./CustomModal.css";

const CustomModal = ({ show, message, onClose }) => {

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <h3>{message}</h3>

        <button className="modal-btn" onClick={onClose}>
          OK
        </button>

      </div>
    </div>
  );
};

export default CustomModal;