import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useGlobalConxtet } from './context';

const Modal = () => {
  const { isModalOpen, closeModal } = useGlobalConxtet();
  return (
    <div className={`modal-overlay ${isModalOpen && 'show-modal'}`}>
      <div className="modal-container">
        <h3>modal contet</h3>
        <button className="close-modal-btn" onClick={closeModal}>
          <FaTimes />
        </button>
      </div>
    </div>
  )
}

export default Modal
