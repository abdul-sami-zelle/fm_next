'use client'

import React, { useState, useRef } from 'react'
import './CheckoutClient.css';
import PaymentMethod from '@/UI/Components/Summary-Components/PaymentMethod/PaymentMethod';
import { useMyOrders } from '@/context/orderContext/ordersContext';
import Loader from '@/UI/Components/Loader/Loader';
import { useCart } from '@/context/cartContext/cartContext';
import { formatedPrice, truncateTitle, url } from '../../../utils/api';
import { useGlobalContext } from '@/context/GlobalContext/globalContext';
import { IoIosArrowDown } from "react-icons/io";
import Link from 'next/link';
import DeliveryInfo from '@/UI/Components/DeliveryInfo/DeliveryInfo';
import axios from 'axios';
import TermsConditionsModal from '@/Global-Components/TermsConditionsModal/termsConditionModal';
import SnakBar from '@/Global-Components/SnakeBar/SnakBar';


const CheckoutClient = () => {

  const deliveryInfoRef = useRef(null);

  const handleDeliveryFormSubmit = () => {
  };



  const [isTermsConditionsOpen, setIsTermsConditionsOpen] = useState(false);


  const handleCloseTermsConditionsModal = () => {
    setIsTermsConditionsOpen(false);
  }

  const checkoutSectionsData = [
    { id: 1, name: 'Delivery', navOp: 'delivery' },
    { id: 2, name: 'Payments', navOp: 'payment-method' },
  ]

  const [currentId, setCurrentId] = useState(0)
  const {
    setOrderPayload,
    orderPayload,
    handlePaymentInfo,
    addProducts,
    sendProducts,
    selectedTab,
    handleClickTop,
    handleTabOpen,
    isLoader,
    showThankyou,
    setThankyouState
  } = useMyOrders();

  const [isCheck, setIsCheck] = useState({});

  const {
    info,
    zipCode,
    handleInputChange,
    handleButtonClick,
    totalTax,
    calculateTotalTax,
    selectedOption,
    CalculateGrandTotal
  } = useGlobalContext();

  const {
    subTotal,
    savings,
    cartProducts,
    cartUid,
    subTotal0,
    isCartProtected,
    isProfessionalAssembly

  } = useCart();


  const [isLoading, setIsLoading] = useState(false);


  const moveToNextTab = async () => {
    if (deliveryInfoRef.current) {
      const isValid = await deliveryInfoRef.current.validateAndSubmit(); // Ensure it's awaited

      if (!isValid) {
        return; // Stop here if validation fails
      }
      handleTabOpen(1);
    }
  };


  const handleContinueToPayment = async () => {

    if (deliveryInfoRef.current) {
      setIsLoading(true)
      const isValid = deliveryInfoRef.current.validateAndSubmit();

      if (!isValid) {
        setIsLoading(false)
        return; // Stop here if validation fails
      }
      try {
        const response = await axios.put(`${url}/api/v1/unused-cart/edit/${cartUid}`, { cart: cartProducts, checkout: orderPayload.billing });
        await new Promise((resolve) => setTimeout(resolve, 0)); // Ensures React processes state updates correctly
        handleTabOpen(1);
        setIsLoading(false)
        return response.data;
      } catch (error) {
        console.error("Error updating cart:", error);
        setIsLoading(false)
        throw error; // Avoid calling setCartSection on error if not needed
      }
    }
  };

  const handleClickSave = () => {
    handlePaymentInfo();
    sendProducts();
  };

  const [isZipUpdateOpen, setIsZipUpdateOpen] = useState(false)
  const handleZipInput = () => {
    setIsZipUpdateOpen(!isZipUpdateOpen)
  }



  const isPaymentMethodFilled = () => orderPayload?.payment_method?.trim() !== "";
  const [showSnakeBar, setShowSnakeBar] = useState(false);
  const [snakeBarMessage, setSnakeBarMessage] = useState()
  const handleShowSnakeToust = (name) => {
    setShowSnakeBar(true)
    setSnakeBarMessage(name)
  }

  const handleCloseSnakeBar = () => {
    setShowSnakeBar(false)
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPaymentMethodFilled()) {
      // Proceed with form submission
      handleClickSave();
    } else {
      handleShowSnakeToust("Please select a payment method!")
    }
  };

  const [showAll, setShowAll] = useState(false);
  const handleShowMore = () => {
    setShowAll(!showAll)
  }



  return (
    <div className='summary-main-container'>
      {isLoader && <Loader />}
      {!showThankyou &&
        <div className='summary-left-main-outer-container'>
          <div className='checkout-pages-toggle-nav'>
            {checkoutSectionsData.map((item, index) => (
              <div
                onClick={() => {
                  index === 0 ?
                    handleTabOpen(index) :
                    moveToNextTab();
                }}
                className={`checkout-page-select-option-container ${selectedTab === index ? 'selected-option' : ''}`}
                key={item.id}
              >
                <h3>{item.name}</h3>

                <label className='checkbox1'>
                  <input
                    type='checkbox'
                    checked={selectedTab === index}
                    readOnly
                  />
                  <span></span>
                </label>


              </div>
            ))}
          </div>
          <div className='summary-left-section'>
            {
              selectedTab === 0 ?
                <div className='shipping-details-and-coupen-show'>

                  <DeliveryInfo ref={deliveryInfoRef} onSubmit={handleDeliveryFormSubmit} />
                </div> :

                selectedTab === 1 ? <PaymentMethod handleSubmitOrder={handleSubmit} />
                  : <></>
            }
          </div>
        </div>

      }
      {!showThankyou && <div className={` ${currentId === 1 ? 'summary-right-section' : currentId === 2 ? 'summery-right-section-according-payment' : 'summery-right-section-low-height'}`}>

        <div className='right-section-order-summary-main-container'>
          <h3 className='right-section-order-summary-main-heading'>Order Summary</h3>
          <div className='right-section-order-summary-products-container'>

            <div className='right-section-ordered-product-card'>
              {cartProducts?.products?.slice(0, showAll ? cartProducts?.products?.length : 2).map((items, index) => (
                <div key={items.uid} className='selected-products'>
                  <div className='selected-single-product'>
                    <img src={`${url}${items.image.image_url}`} alt='img' />
                    <div className='selected-product-containt'>
                      <span className='selected-product-name-and-price'>
                        <h3>{truncateTitle(items.name, 35)}</h3>
                      </span>

                      <div className='right-section-content-and-price'>
                        <div className='right-section-content'>
                          {items?.attributes && items?.attributes.map((item, index) => {
                            return (
                              <span className='selected-product-color'><p>{item?.options[0].name}</p></span>
                            )
                          })}
                        </div>

                        <div className='right-section-price'>
                          {items.sale_price === '' ? (
                            <p className='checkout-product-single-price'>{formatedPrice(items.regular_price)}</p>
                          ) : (
                            <div className='order-summary-prices-container' style={{ display: 'flex', flexDirection: 'column' }}>
                              <p>{formatedPrice(items.sale_price)}</p>
                              <del>{formatedPrice(items.regular_price)}</del>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='right-section-show-more-button-container'>
              {cartProducts?.products?.length > 2 && <p className='show-more-products-button' onClick={handleShowMore}> {showAll ? 'See Less' : ` See All ${cartProducts?.products?.length} Items`}</p>}
            </div>

            <div className='right-section-order-pricing-details'>

              <div className='cart-order-summary-price-detail-single-item'>
                <p className='cart-order-summary-price-detail-single-item-title'>Subtotal</p>
                <p className='cart-order-summary-price-detail-single-item-price'>{formatedPrice(subTotal0)}</p>
              </div>

              <div className='cart-order-summary-price-detail-single-item'>
                <p className='cart-order-summary-price-detail-single-item-title'>Savings</p>
                <p className='cart-order-summary-price-detail-single-item-price' style={{ color: "var(--tertiary-color)" }} >-{formatedPrice(savings)}</p>
              </div>

              {isCartProtected ? (
                <div className='cart-order-summary-price-detail-single-item'>
                  <p className='cart-order-summary-price-detail-single-item-title'>Protect Entire Order</p>
                  <p className='cart-order-summary-price-detail-single-item-price'>{formatedPrice(200)}</p>
                </div>
              ) : (
                <></>
              )}
              {isProfessionalAssembly ? (
                <div className='cart-order-summary-price-detail-single-item'>
                  <p className='cart-order-summary-price-detail-single-item-title'>Professional Assembly</p>
                  <p className='cart-order-summary-price-detail-single-item-price'>{formatedPrice(210)}</p>
                </div>
              ) : (
                <></>
              )}

              <div className='cart-order-summary-price-detail-single-item'>
                <p className='cart-order-summary-price-detail-single-item-title'>{selectedOption?.name}</p>
                <p className='cart-order-summary-price-detail-single-item-price'>{selectedOption?.cost === 0 ? '' : selectedOption?.cost}</p>
              </div>

              <div className='cart-order-summary-price-detail-single-item'>
                <p className='cart-order-summary-price-detail-single-item-title'>{`Tax (${totalTax?.tax_name})`}</p>
                <p className='cart-order-summary-price-detail-single-item-price'>{totalTax ? formatedPrice(calculateTotalTax(subTotal, parseFloat(totalTax?.tax_value))) : 0}</p>
              </div>

              <div className='cart-order-summary-zip-code'>
                <span className='cart-order-summary-zip-code-heading'>
                  <p>Calculated for:</p>
                  <h3 onClick={handleZipInput}>{info?.locationData?.state} {info?.locationData?.stateCode} <IoIosArrowDown className={`cart-order-summary-zip-arrow ${isZipUpdateOpen ? 'cart-order-summary-zip-arrow-rotate' : ''}`} size={20} /> </h3>
                </span>
                <div className={`cart-order-summary-zip-code-input-div ${isZipUpdateOpen ? 'show-zip-code-update-input' : ''}`}>
                  <div className='cart-order-summary-zip-code-input-and-button'>
                    <input
                      type='text'
                      placeholder='Zip Code'
                      className='cart-summary-update-zip-input'
                      value={zipCode}
                      onChange={handleInputChange}
                    />
                    <button className='cart-summary-update-zip-btn' onClick={async () => { await handleButtonClick(); }}>Update</button>
                  </div>
                </div>
              </div>

              <div className='right-section-total-value'>
                <p className='right-section-total-price-text-and-value'>Total</p>
                <p className='right-section-total-price-text-and-value'>{formatedPrice(CalculateGrandTotal())}</p>
              </div>

              <div className='right-section-order-place-container'> 
                <p>By placing this order I agree to the Furniture Mecca <span onClick={() => setIsTermsConditionsOpen(true)}>Terms & Conditions</span></p>
                {
                  selectedTab === 0 ? <button onClick={handleContinueToPayment} className='right-section-place-order-button'>Continue</button>
                    : <button onClick={handleSubmit} className='right-section-place-order-button'>Place Your Order</button>
                }
              </div>
            </div>

          </div>
        </div>
      </div>}
      {isLoading && <div className="cart_products_overlay">
        <div className="loader"></div>
      </div>}

      <TermsConditionsModal
        openModal={isTermsConditionsOpen}
        closeModal={handleCloseTermsConditionsModal}
      />
      <SnakBar
        message={snakeBarMessage}
        openSnakeBarProp={showSnakeBar}
        setOpenSnakeBar={setShowSnakeBar}
        onClick={handleCloseSnakeBar}
      />
    </div>
  )
}

export default CheckoutClient