'use client'

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import './PromotionalBanner.css';
// import { Link, useNavigate } from 'react-router-dom';
import  Link  from 'next/link'

// import deliverTo from '../../../Assets/icons/delivery.png'
import deliverTo from '../../../Assets/icons/delivery.png'
import { useUserDashboardContext } from '../../../context/userDashboardContext/userDashboard';
import { url, useDisableBodyScroll } from '../../../utils/api';
// import crossButton from '../../../Assets/icons/close-btn.png'
import crossButton from '../../../Assets/icons/close-btn.png'
import Image from 'next/image';


const PromotionalBanner = (
  { 
    handleLanguageModal, 
    handleDeliverModal, 
    currentSelectedCountryFlag, 
    usaFlag, 
    currentSelectedCountry 
  }) => {

  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0);
  const dynamicHeading = [0, 1, 2]
  useEffect(() => {
    const intervelId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dynamicHeading.length)
    }, 5000)
    return () => clearInterval(intervelId);
  }, [])


  // const { setMainLoader } = useGlobalContext();
  const { setUserToken } = useUserDashboardContext();
  const [isTokenValid, setIsTokenValid] = useState(false);

  const handleClickOnOrders = async () => {
    if(typeof window !== "undefined") {
      const token = localStorage.getItem('userToken');
      const id = localStorage.getItem('uuid');
  
      try {
        if (token) {
          const response = await fetch(`${url}/api/v1/web-users/verify-token`, {
            method: "GET",
            headers: {
              authorization: `${token}`,
            },
          });
          if (response.ok) {
            router.push(`/user-dashboard/${id}`);
          }
        } else {
          localStorage.removeItem('userToken');
          setUserToken(null);
          setIsTokenValid(true);
        }
      } catch (error) {
        console.error("Unexpected Error", error)
      }
    }
  }

  const handleCloseLoginMessageModal = () => {
    setIsTokenValid(false)
  }

  const handleNavigateToLogin = () => {
    router.push('/my-account')
    setIsTokenValid(false)
  }

  useDisableBodyScroll(isTokenValid)

  return (
    <div className='furniture-mecca-promotional-banner'>
      <div className='rotating-message'>
        {currentIndex === 1 ? (
          <span>
            Need help ordering?{' '}
            <a className='toll-free-ancor' href='tel:2153521600'>
              Call 215 352 1600
            </a>
          </span>
        ) : currentIndex === 2 ? (
          <span>
            Learn about my{' '}
            <Link href='/financing' className='toll-free-ancor'>
              Financing Options
            </Link>
          </span>
        ) : (
          <span>Shop everyday low prices!</span>
        )}
      </div>

      <div className='header-links-and-select-language'>
        <div className='banner-link-container'>
          <Link href={'/blogs'}>Blogs</Link>
          <span>
            <Link href={'#'}>Log In</Link> | <Link href={'#'}>Sign up</Link>
          </span>
          <Link href={'#'}>Free Design Consultation</Link>
          <Link href={'/store-locator'}>Stores</Link>
          <p onClick={handleClickOnOrders}>Orders</p>
          <Link href={'/financing'}>Financing</Link>
          <Link href={'/contact-us'}>Help</Link>
        </div>
        <div className='header-main-banner-language-div'>
          <button onClick={handleLanguageModal}>
            <Image src={currentSelectedCountryFlag || usaFlag} width={22} height={22} alt='flag' />
            {currentSelectedCountry || 'English'}
          </button>
        </div>
      </div>
      <div className='on-tab-deliver-to' onClick={handleDeliverModal}>
        <img src={'/Assets/icons/delivery.png'} alt="delivery" />
        <div className='mobile-view-delever-to'>
          <p>Deliver to : </p>
          <Link href={'#'}> PA 19134</Link>
        </div>
      </div>

      <div className={`login-warning-modal-main-container ${isTokenValid ? 'show-login-warning-modal' : ''}`} onClick={handleCloseLoginMessageModal}>
        <div className={`login-warning-modal-inner-container ${isTokenValid ? 'zoom-login-inner-modal' : ''}`} onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={handleCloseLoginMessageModal}
            className='login-warning-modal-close-btn'
          >
              <img src={'/Assets/icons/close-btn.png'} alt='cross' />
          </button>
          <div className='login-warning-modal-inner-content'>
            <p>Login Required</p>
            <p>To access your orders dashboard, please log in.</p>
            <div className='navigate-to-login-btn-container'>
              <button className='navigate-to-login-btn' onClick={handleNavigateToLogin}>
                Login
              </button>
            </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default PromotionalBanner