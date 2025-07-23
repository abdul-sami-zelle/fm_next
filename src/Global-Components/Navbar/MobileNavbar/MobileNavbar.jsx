import React, { useState, useEffect } from 'react'
import './MobileNavbar.css'
import MobileSubNav from './MobileSubNav/MobileSubNav';
import Link from 'next/link';
import { url, useDisableBodyScroll } from '../../../utils/api';
import Image from 'next/image';
import { useUserDashboardContext } from '@/context/userDashboardContext/userDashboard';
// import ordersIcon from '../../../Assets/icons/order.png';
import { useRouter } from 'next/navigation';
import { IoIosClose } from "react-icons/io";

const MobileNavbar = ({ showMobileNav, setMobileNavVisible, headerData, sale_data, headerOffer }) => {

  // States and Vaeiables
  const [subNavData, setSubNavData] = useState([])
  const [openSubNav, setOpenSubNav] = useState(false)
  const router = useRouter()

  const handleNavbarClose = () => {
    setMobileNavVisible(false)
  }


  const { setUserToken } = useUserDashboardContext();
  const [isTokenValid, setIsTokenValid] = useState(false);

  const handleClickOnOrders = async () => {
    if (typeof window !== "undefined") {
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
            setMobileNavVisible(false)
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
    setMobileNavVisible(false)
  }

  useDisableBodyScroll(isTokenValid)

  return (
    <div className={`mobile-menu-overlay ${showMobileNav ? 'show-mobile-nav' : ''}`} onClick={handleNavbarClose}>
      <div className={`mobile-nav-main-container`} onClick={(e) => e.stopPropagation()}>
        <button className='mobile-nav-close' onClick={handleNavbarClose}>
          <IoIosClose className='mobile-nav-close-icon' />
        </button>
        <div className='mobile-nav-logo-section'>
          <Link href={'/'}>
            <Image src={'/Assets/Logo/main-logo.png'} width={180} height={35} alt='website-logo' />
          </Link>
        </div>
        <div className='mobile-nav-containt-section'>
          <div className='mobile-nav-containt-header'>
            <Link href={'/wishlist'} className='mobile-nav-head-items' onClick={() => setMobileNavVisible(false)}>
            <Image src={'/icons/menu-heart.svg'} width={25} height={25} alt='nav-icon' />
              <p>Wishlist</p>
            </Link>
            <div onClick={handleClickOnOrders} className='mobile-nav-head-items'>
              <Image src={'/icons/menu-order.svg'} width={25} height={25} alt='nav-icon' />
              <p>My Orders</p>
            </div>
          </div>
          <div className='mobile-nav-containt-body'>
            <h3 className='mobile-nav-body-sec-heading'>Shop By Categories</h3>
            <div className='mobile-nav-main-items'>
              {headerData.map((items, index) => (
                <div className='mobile-nav-single-item' key={index} >
                  <Link href={`/${items.category_slug}`} className='mobile-nav-single-item-name' onClick={() => setMobileNavVisible(false)}>
                    <Image src={'/icons/menu-order.svg'} width={25} height={25} alt='nav-icon' />
                    <p>{items.category}</p>
                  </Link>
                </div>
              ))}

              <div className='mobile-nav-single-item'>
                  <Link href={`/${headerOffer.category_slug}`} className='mobile-nav-single-item-name' onClick={() => setMobileNavVisible(false)}>
                    <Image src={'/icons/menu-order.svg'} width={25} height={25} alt='nav-icon' />
                    <p className='last-call-mobile'>{headerOffer.category} 🔥 </p>
                  </Link>
                </div>

                <div className='mobile-nav-single-item' >
                  <Link href={`/${sale_data.category_slug}`} className='mobile-nav-single-item-name' onClick={() => setMobileNavVisible(false)}>
                    <Image src={'/icons/menu-order.svg'} width={25} height={25} alt='nav-icon' />
                    <p className='sale-offer-mobile'>{sale_data.category}</p>
                  </Link>
                </div>
              

            </div>
          </div>
        </div>
        <MobileSubNav
          openSubNav={openSubNav}
          setOpenSubNav={setOpenSubNav}
          subNavData={subNavData}
          setMobileNavVisible={setMobileNavVisible}
        />

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

    </div>

  )
}

export default MobileNavbar
