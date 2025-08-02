import React from "react";
import { Icon } from "@iconify/react";
import style from "./Modal.module.scss";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={style.modalOverlay} onClick={handleOverlayClick}>
      <div className={style.modalContent}>
        <button className={style.closeButton} onClick={onClose}>
          <Icon icon="mdi:close" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
