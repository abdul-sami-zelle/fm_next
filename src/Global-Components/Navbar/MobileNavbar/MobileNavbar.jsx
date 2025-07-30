import React, { useState } from 'react'
import './MobileNavbar.css'
import Link from 'next/link';
import { useDisableBodyScroll } from '../../../utils/api';
import Image from 'next/image';
import { HiOutlineShoppingBag } from "react-icons/hi2";

import { MdKeyboardArrowRight } from "react-icons/md";
import { useGlobalContext } from '@/context/GlobalContext/globalContext';
import { CiUser } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import { useUserDashboardContext } from '@/context/userDashboardContext/userDashboard';

const MobileNavbar = ({ showMobileNav, setMobileNavVisible, headerData, sale_data, headerOffer }) => {


  const handleNavbarClose = () => {
    setMobileNavVisible(false)
  }
  const {CalculateGrandTotal} = useGlobalContext()

  const [isTokenValid, setIsTokenValid] = useState(false);


  const menuFooterIcons = [
    {icon: '/icons/order-icon.png', link: '#'},
    {icon: '/icons/wishlist.png', link: '#'},
    {icon: '/icons/store-locator.png', link: '#'},
    {icon: '/icons/help-icon.png', link: '#'},
  ]

  const router = useRouter()

  const handleNAvigateToCart = () => {
    router.push('/cart')
    handleNavbarClose()
  }

  const {setSigninClicked} = useUserDashboardContext()
  const handleNAvigateToLogin = () => {
    router.push('/user-dashboard/:id');
    setSigninClicked(true);
    handleNavbarClose()
  }

  useDisableBodyScroll(isTokenValid)

  return (
    <div className={`mobile-menu-overlay ${showMobileNav ? 'show-mobile-nav' : ''}`} onClick={handleNavbarClose}>
      <div className={`mobile-nav-main-container`} onClick={(e) => e.stopPropagation()}>

        <div className='mobile-nav-head'>
          <div className='mobile-nav-head-container'>
            <Image src={'/icons/close-charcoal.svg'} width={15} height={15} alt='close' onClick={handleNavbarClose} />
            <Link href={'/'} className='mobile-nav-header-image-contianer' onClick={handleNavbarClose}>
              <Image src={'/Assets/Logo/new-main-logo.png'} width={180} height={40} alt='main-logo' />
            </Link>
              <CiUser strokeWidth={0.8} className='mobile-user-icon' onClick={handleNAvigateToLogin} />
          </div>

          <div className='mobile-nav-cart-container' onClick={handleNAvigateToCart}>
            <div className='mobile-nav-cart-icon-and-total-container'>
              <span >
                <HiOutlineShoppingBag size={30} color='#FFFFFF' />
              </span>
              <div className='mobile-head-cart-total-container'>
                <p>Cart</p>
                <h3>USD {CalculateGrandTotal()}</h3>
              </div>
            </div>
            <div className='mobile-nav-head-total-price-arrow-container'>
              <MdKeyboardArrowRight size={20} color='#FFFFFF' />
            </div>
          </div>
        </div>

        <div className='mobile-nav-links-container'>
          {headerData.map((items, index) => (
            <Link href={`/${items.category_slug}`} className='mobile-nav-single-link-container' key={index} >
              <div  className='mobile-nav-single-item-name-anchor' onClick={handleNavbarClose}>
                <Image src={'/Assets/mobile-nav-assets/living-room-set.png'} width={70} height={60} alt='nav-icon' />
                <p>{items.category}</p>
              </div>
              <span>
                <MdKeyboardArrowRight size={20} color='#595959' />
              </span>
            </Link>
          ))}

          <Link href={`/call/${headerOffer.category_slug}`} className='mobile-nav-single-link-container'>
              <div  className='mobile-nav-single-item-name-anchor' onClick={handleNavbarClose}>
                <Image src={'/Assets/mobile-nav-assets/living-room-set.png'} width={70} height={60} alt='nav-icon' />
                <p>{headerOffer.category} 🔥</p>
              </div>
              <span>
                <MdKeyboardArrowRight size={20} color='#595959' />
              </span>
            </Link>

            <Link href={`/sale/${sale_data.category_slug}`} className='mobile-nav-single-link-container' >
              <div  className='mobile-nav-single-item-name-anchor' onClick={handleNavbarClose}>
                <Image src={'/Assets/mobile-nav-assets/living-room-set.png'} width={70} height={60} alt='nav-icon' />
                <p>{sale_data.category}</p>
              </div>
              <span>
                <MdKeyboardArrowRight size={20} color='#595959' />
              </span>
            </Link>
        </div>


        <div className='mobile-nav-footer-buttons'>
          {menuFooterIcons.map((item, index) => (
            <Link key={index} href={item.link}>
              <Image src={item.icon} width={40} height={40} alt='icon' />
            </Link>
          ))}
        </div>

      </div>

    </div>

  )
}

export default MobileNavbar
