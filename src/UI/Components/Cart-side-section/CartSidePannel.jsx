'use client'

import React, { useEffect, useState } from 'react'
import './CartSidePannel.css';
import CartSideSection from './CartSideSection';
// import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/cartContext/cartContext';
import { formatedPrice } from '@/utils/api';
import EmptyCart from '../Cart-Components/Empty-Cart/EmptyCart';
import { useRouter } from 'next/navigation';
import { IoIosClose } from 'react-icons/io';
import Image from 'next/image';

const CartSidePannel = (
  {
    cartData,
    addToCartClicked,
    setAddToCartClick,
    handleCartSectionClose,
    removeFromCart,
    decreamentQuantity,
    increamentQuantity,

  }) => {



  const {
    subTotal,
    isCartProtected,
    isProfessionalAssembly,
    handleCartProtected,
    handleCartAssembly,
    cartProducts,
    isCartLoading, totalProtectionValue, professionalAssemblyValue
  } = useCart()


  // const [singleCart, setSingleCart] = useState(cartData)
  const navigate = useRouter()


  const handleCLoseCartPanel = () => {
    setAddToCartClick(false)
    navigate.push(`/cart`)

  }

  const navigateToCheckout = () => {
    setAddToCartClick(false)
    navigate.push("/check-out");
  }

  // useEffect(() => {
  //   if (!isCartLoading && addToCartClicked) {
  //     // Force a reflow to ensure scrolling works after update
  //     const scrollableContainer = document.querySelector('.cart-section-products');
  //     const scrollinnerContainer = document.querySelector('.cart-section-product-cards-contianer');
  //     if (scrollableContainer) {
  //       scrollableContainer.style.overflowY = 'auto';
  //       scrollinnerContainer.style.overflowY = 'auto';
  //     }
  //   }
  // }, [isCartLoading, addToCartClicked]);

  setTimeout(() => {
    const el = document.querySelector('.cart-section-product-cards-contianer');
    if (el) {
      el.scrollTop = el.scrollHeight; // scrolls to bottom
      el.style.overflowY = 'auto';
    }
  }, 200);





  return (
    <div
      className={`cart-side-main-section ${addToCartClicked ? 'show-side-cart' : ''} `}
      onClick={handleCartSectionClose}
    >
      <button className='cart-section-close-btn' onClick={handleCartSectionClose}>
        <Image src={'/icons/close-charcoal.svg'} width={15} height={15} alt='close btn' />
      </button>
      {/* <IoIosClose size={25} color='#595959' className='cart-section-close-btn' onClick={handleCartSectionClose} /> */}
      <div
        className={`cart-side-section-containt-div ${addToCartClicked ? 'show-side-cart-containt' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >

        <div className='cart-section-heading-div'>
          <div className='cart-side-section-cart-bag-div'>
            <img src={'/Assets/icons/cart-bag-new.png'} alt='cart icon' />
            {cartData && (<p className='cart-side-panel-item-count'>{(cartData?.products?.length)}</p>)}
          </div>
          <p>Your Cart </p>
        </div>

        <div className='cart-section-products'>
          <div className='cart-section-product-cards-contianer'>
            {cartProducts?.products?.length <= 0 && <EmptyCart />}
            {cartProducts && cartProducts?.products?.map((items, index) => {
              return <CartSideSection
                // key={items.product_uid ?? index}
                key={index}
                attributes={items.attributes}
                handleItemRemove={() => removeFromCart(items.isVariable === 1 ? items.variation_uid : items.product_uid, items.isVariable === 1)}
                closeBtn={'/Assets/icons/close-btn.png'}
                sku={items.sku}
                productTitle={items.name}
                mainImage={items.image}
                priceTag={items.regular_price}
                decreamentQuantity={() => decreamentQuantity(items.isVariable === 1 ? items.variation_uid : items.product_uid, items.isVariable === 1)}
                minusBtn={'/Assets/icons/minus-white.png'}
                quantity={items.quantity}
                increamentQuantity={() => increamentQuantity(items.isVariable === 1 ? items.variation_uid : items.product_uid, items.isVariable === 1)}

                plusBtn={'/Assets/icons/plus-white.png'}
                sale_price={items.sale_price}
                regular_price={items.regular_price}
                type={items.type}
                isProtected={items.is_protected}
              />
            })}
          </div>

          <div className='mobile-professional-assembly-and-protection'>

            {cartProducts?.products?.length > 0 ? (
              <div className='proffesional-assembly-check-sec'>
                <label className='order-summary-proffesional-check-item-label-one'>
                  <input
                    type="checkbox"
                    className='order-summary-checkbox'
                    checked={isProfessionalAssembly}
                    onChange={() => handleCartAssembly()}
                  />
                  Professional Assembly (+ ${totalProtectionValue})
                </label>
                {/* {isProfessionalAssembly ? ( */}
                <p className='order-summary-proffesional-check-item-detail'>Full-service delivery to your room of choice, unpacking, assembly and trash removal. Our most popular option!</p>
                {/* ) : (
                    <p className='cart-protection-plan-cart-desc'>({formatedPrice(totalProtectionValue)})</p>
                  )} */}
              </div>
            ) : (<></>)}

            {cartProducts?.products?.length > 1 ? (
              <div className='proffesional-assembly-check-sec'>
                <label className='order-summary-proffesional-check-item-label'>
                  <input
                    type="checkbox"
                    className='order-summary-checkbox'
                    checked={isCartProtected}
                    onChange={() => handleCartProtected()}
                  />
                  Elite Platinum Furniture Protection(+ ${professionalAssemblyValue})
                </label>
                <p className='order-summary-proffesional-check-item-detail'>Our Elite Furniture Protection Plan covers accidental stains and damage to your new fabric, leather, and wood (and other hard surfaces) furniture.</p>
              </div>
            ) : (<></>)}
          </div>


        </div>

        <div className='cart-side-section-buttons'>

          <div className='desktop-protextion-and-assembily-contianer'>
            {cartProducts?.products?.length > 0 ? (
              <div className='proffesional-assembly-check-sec'>
                <label className='order-summary-proffesional-check-item-label-one'>
                  <input
                    type="checkbox"
                    className='order-summary-checkbox'
                    checked={isProfessionalAssembly}
                    onChange={() => handleCartAssembly()}
                  />
                  Professional Assembly (+ ${totalProtectionValue})
                </label>
                <p className='order-summary-proffesional-check-item-detail'>Full-service delivery to your room of choice, unpacking, assembly and trash removal. Our most popular option!</p>
              </div>
            ) : (<></>)}

            {cartProducts?.products?.length > 1 ? (
              <div className='proffesional-assembly-check-sec'>
                <label className='order-summary-proffesional-check-item-label'>
                  <input
                    type="checkbox"
                    className='order-summary-checkbox'
                    checked={isCartProtected}
                    onChange={() => handleCartProtected()}
                  />
                  Elite Platinum Furniture Protection(+ ${professionalAssemblyValue})
                </label>
                <p className='order-summary-proffesional-check-item-detail'>Our Elite Furniture Protection Plan covers accidental stains and damage to your new fabric, leather, and wood (and other hard surfaces) furniture.</p>
              </div>
            ) : (<></>)}
          </div>

          <div className='cart-side-paner-total-and-sub-total-container'>
            <p>Sub Total</p>
            <h3>{formatedPrice(subTotal)}</h3>
          </div>

          <div className='cart-section-view-cart-and-checkout-btn'>
            <button className='cart-side-section-view-cart' onClick={handleCLoseCartPanel}>
              View Cart
            </button>
            <button onClick={navigateToCheckout} className='cart-side-section-checkout'>
              Checkout
            </button>
          </div>
        </div>
        {isCartLoading && <div className="loader_overlay">
          <div className="loader">

          </div>
        </div>}
      </div>
    </div>
  )
}

export default CartSidePannel