import React from "react";

export const ConfirmationPopup = ({ show, onClose, onConfirm, title, message }) => {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h2 className="popup-title">{title}</h2>
        </div>
        <div className="popup-content">
          <p>{message}</p>
        </div>
        <div className="popup-footer">
          <button className="popup-button" onClick={onConfirm}>
            Confirm
          </button>
          <button className="popup-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};