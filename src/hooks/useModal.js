import { useState } from "react";

function useModal() {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return { isModalOpen, openModal, closeModal };
}

export default useModal;
