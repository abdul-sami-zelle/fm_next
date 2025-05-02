'use client'

import React from 'react'
import './CartSidePannel.css';
import closeBtn from '../../../Assets/icons/close-btn.png'
import CartSideSection from './CartSideSection';
import cartBlack from '../../../Assets/icons/cart-bag-new.png';
import minusBtn from '../../../Assets/icons/minus-white.png';
import plusBtn from '../../../Assets/icons/plus-white.png';
// import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/cartContext/cartContext';
import { formatedPrice } from '@/utils/api';
import { useGlobalContext } from '../../../context/GlobalContext/globalContext';
import EmptyCart from '../Cart-Components/Empty-Cart/EmptyCart';
import { useRouter } from 'next/navigation';

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
        CalculateGrandTotal
      } = useGlobalContext();


      // console.log("card Data", cartData)
    
      

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

  const handleContinueShopping = () => {
    setAddToCartClick(false)
  }

  const navigateToCheckout = () => {
    setAddToCartClick(false)
    navigate.push("/check-out");
  }

  

  return (
    <div
      className={`cart-side-main-section ${addToCartClicked ? 'show-side-cart' : ''} `}
      onClick={handleCartSectionClose}
    >
      <button className='cart-section-close-btn' onClick={handleCartSectionClose}>
        <img src={'/Assets/icons/close-btn.png'} alt='close btn' />
      </button>
      <div
        className={`cart-side-section-containt-div ${addToCartClicked ? 'show-side-cart-containt' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >

        <div className='cart-section-heading-div'>
          <div className='cart-side-section-cart-bag-div'>
            <img src={'/Assets/icons/cart-bag-new.png'} alt='cart icon' />
            <p className='cart-side-panel-item-count'>{(cartData?.products?.length)}</p>
          </div>
          <p>Your Cart </p>
        </div>

        <div className='cart-section-products'>
           {cartProducts?.products?.length <= 0 && <EmptyCart />}
          {cartProducts && cartProducts?.products?.map((items, index) => {
            return <CartSideSection
              key={items.product_uid}
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

        <div className='cart-side-section-buttons'> 

        
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
              <p className='order-summary-proffesional-check-item-detail'>Delivery right inside the front door of your home. You do the unpacking and assembly.</p>
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
      </div>
      {isCartLoading && <div className="loader_overlay">
        <div className="loader">

        </div>
      </div>}
    </div>
  )
}

export default CartSidePannel