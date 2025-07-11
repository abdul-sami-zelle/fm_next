import React from 'react'
import './MessageModal.css'
import { IoIosClose } from "react-icons/io";

const MessageModal = ({showMessage, message, footerMessage, closeModal}) => {
  return (
    <div className={`warning-modal-main-container ${showMessage ? 'show-warining-modal' : ''}`} onClick={closeModal}>
        <div className={`warning-modal-body ${showMessage ? 'show-modal-body' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className='warning-moda-head'>
                <h3>Alert</h3>
                <button onClick={closeModal}>
                    <IoIosClose size={25} color='#595959' />
                </button>
            </div>
            <div className='warning-modal-message-container'>
                <p>{message}</p>
            </div>
            <div className='warning-modal-footer'>
                <p>{footerMessage}</p>
            </div>
        </div>
    </div>
  )
}

export default MessageModal