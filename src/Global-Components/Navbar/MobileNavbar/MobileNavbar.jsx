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

const MobileNavbar = ({ showMobileNav, setMobileNavVisible, headerData }) => {

  // States and Vaeiables
  // const [headerData, setHeaderData] = useState([]);
  const [headerSale, setHeaderSale] = useState([]);
  const [subNavData, setSubNavData] = useState([])
  const [openSubNav, setOpenSubNav] = useState(false)
  const router = useRouter()


  // Functions
  // async function fetchHeaderPayloads() {
  //   try {
  //     const response = await fetch(`${url}/api/v1/header-payloads/get`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json", // Adjust headers as needed
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status} ${response.statusText}`);
  //     }

  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching data:", error.message);
  //     throw error;
  //   }
  // }

  // useEffect(() => {
  //   fetchHeaderPayloads().then(data => {
  //     setHeaderData(data.data[0].categories)
  //     setHeaderSale(data.data[0].sale)
  //   }).catch(error => {
  //     console.error(error);
  //   });
  // }, [])

  const handleNavbarClose = () => {
    setMobileNavVisible(false)
  }

  const handleOpenSubNav = (item) => {
    setOpenSubNav(true);
    setSubNavData(item)
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
    console.log("navigate close clicked")
  }

  const handleNavigateToLogin = () => {
    router.push('/my-account')
    setIsTokenValid(false)
    setMobileNavVisible(false)
    console.log("navigate clickd")
  }

  useDisableBodyScroll(isTokenValid)

  return (
    <div className={`mobile-menu-overlay ${showMobileNav ? 'show-mobile-nav' : ''}`}>
      <div className={`mobile-nav-main-container`}>
        <button className='mobile-nav-close' onClick={handleNavbarClose}>
          {/* <Image src={`/Assets/icons/close-btn.png`} width={20} height={20} alt='close-nav' /> */}
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
            <Image src={'/Assets/icons/order.png'} width={25} height={25} alt='nav-icon' />
              <p>Favorite</p>
            </Link>
            <div onClick={handleClickOnOrders} className='mobile-nav-head-items'>
              <Image src={'/Assets/icons/order.png'} width={25} height={25} alt='nav-icon' />
              <p>My Orders</p>
            </div>
          </div>
          <div className='mobile-nav-containt-body'>
            <h3 className='mobile-nav-body-sec-heading'>Categories</h3>
            <div className='mobile-nav-main-items'>
              {headerData.map((items, index) => (
                <div className='mobile-nav-single-item' key={index} >
                  <Link href={`/${items.category_slug}`} className='mobile-nav-single-item-name' onClick={() => setMobileNavVisible(false)}>
                    <Image src={'/Assets/icons/order.png'} width={25} height={25} alt='nav-icon' />
                    <p>{items.category}</p>
                  </Link>
                  {/* <Image
                  src={`/Assets/icons/nav-arrow.png`}
                  width={20}
                  height={20}
                  alt='nav-icon'
                  className='mobile-nav-single-item-nav-arrow'
                  onClick={() => handleOpenSubNav(items)}
                /> */}
                </div>
              ))}
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
