import React, { useState } from 'react'
import './LanguagePopUp.css';
import closeBtn from '../../../Assets/icons/close-btn-black.png';
import usaFlag from '../../../Assets/icons/usa-flage.png'

const LanguagePopUp = ({ changeLanguage, setChangeLanguage, handleCLoseLanguageModal, currentSelectedCountry, setCurrentSelectedCountry, currentSelectedCountryFlag, setCurrentSelectedCountryFlag }) => {
  const [currentLenIndex, setCurrentLenIndex] = useState(0)
  const [lanDrop, setLanDrop] = useState(false);

  const languagesData = [
    { lan: 'English', icon: '/Assets/icons/usa-flage.png' },
  ]

  const handleActiveIndex = (index) => {
    setCurrentLenIndex(index)
    const selectedLanguage = languagesData[index];
    setCurrentSelectedCountry(selectedLanguage.lan);
    setCurrentSelectedCountryFlag(selectedLanguage.icon);
    setLanDrop(false);
  }

  const handleLanguageDropDown = () => {
    setLanDrop(false);
  }

  return (
    <div
      className={`show-language-modal ${changeLanguage ? 'increase-width-language-modal' : ''} `}
      onClick={handleCLoseLanguageModal}
    >
      <div
        className={`language-modal-containt-div ${changeLanguage ? 'show-language-modal-inner-container' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={`close-language-modal ${changeLanguage ? '' : 'hide-close-btn'}`} onClick={handleCLoseLanguageModal}>
          <img src={'/Assets/icons/close-btn-black.png'} alt='close btn' />
        </button>
        <div className='select-language-container'>
          <div className='modal-headin-div'>
            <h3>Language</h3>
          </div>
          <div className='select-language-dropdown'>
            <h3>Select Language:</h3>
            <div className={`languages-drop-down ${lanDrop ? 'open-language-dropdown' : ''}`}>
              <div className='selected-language' onClick={handleLanguageDropDown}>
                <span>
                  <img src={currentSelectedCountryFlag || '/Assets/icons/usa-flage.png'} alt='usa' />
                  <h3>{currentSelectedCountry || 'English'}</h3>
                </span>
              </div>
              <div className='defrent-languages'>
                {languagesData.map((item, index) => (
                  <div key={index} className={currentLenIndex === index ? 'single-selected-language' : 'single-language'} onClick={() => handleActiveIndex(index)} >
                    <img src={item.icon} alt='icon' />
                    <h3>{item.lan}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LanguagePopUp
