import React from 'react'
import './ZipCodeModal.css'

const ZipCodeModal = ({showZipModal, setShowZipModal, }) => {
  return (
    <div className={`set-zip-modal-overlay ${showZipModal ? 'show-zip-modal' :''}`}>
        <div className='set-zip-moda-box'></div>
    </div>
  )
}

export default ZipCodeModal