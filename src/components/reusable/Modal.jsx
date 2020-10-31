import React from "react";
import "react-responsive-modal/styles.css";
import { Modal as RRModal } from "react-responsive-modal";

import useModal from "../../hooks/useModal.js";
import "./Modal.css";

function Modal({ button, children }) {
  const { isModalOpen, openModal, closeModal } = useModal();
  return (
    <>
      <span onClick={openModal}>{button}</span>
      <RRModal
        open={isModalOpen}
        onClose={closeModal}
        center
        classNames={{
          overlay: "modal__overlay",
          modal: "modal",
          closeButton: "modal__close-btn",
        }}
      >
        {children}
      </RRModal>
    </>
  );
}

export default Modal;
