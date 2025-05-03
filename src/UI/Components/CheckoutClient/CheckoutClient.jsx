'use client'

import React, { useState, useRef } from 'react'
import './CheckoutClient.css';
// import OrderSummary from '../../Components/Summary-Components/OrderSummary/OrderSummary';
// import Coupon from '../../Components/Summary-Components/Coupon/Coupon';
import PaymentMethod from '@/UI/Components/Summary-Components/PaymentMethod/PaymentMethod';
// import TrustFor from '../../Components/Summary-Components/Trust-for-varaities/TrustFor';
// import HappyCustomers from '../../Components/Summary-Components/Happy-Customer/HappyCustomers';
// import ShipingAndDelivery from '../../Components/Summary-Components/ShippingAndDelivery/ShipingAndDelivery';
// import PaymentInfo from '../../Components/Summary-Components/PaymentInfo/PaymentInfo';
import { useMyOrders } from '@/context/orderContext/ordersContext';
import Loader from '@/UI/Components/Loader/Loader';
// import ShippingForm from '../../Components/Summary-Components/ShippingForm/ShippingForm';
import { useCart } from '@/context/cartContext/cartContext';
import { formatedPrice, truncateTitle, url } from '../../../utils/api';
import { useGlobalContext } from '@/context/GlobalContext/globalContext';
import { IoIosArrowDown } from "react-icons/io";
import Link from 'next/link';
import DeliveryInfo from '@/UI/Components/DeliveryInfo/DeliveryInfo';
import axios from 'axios';
import TermsConditionsModal from '@/Global-Components/TermsConditionsModal/termsConditionModal';


const CheckoutClient = ({params}) => {

  const deliveryInfoRef = useRef(null);

  const handleDeliveryFormSubmit = () => {
  };



  const [isTermsConditionsOpen, setIsTermsConditionsOpen] = useState(false);
  const handleOpenTermsConditionsModal = () => {
    setIsTermsConditionsOpen(true);
  }

  const handleCloseTermsConditionsModal = () => {
    setIsTermsConditionsOpen(false);
  }


//   const checkoutSections = [
//     { id: 1, name: 'Delivery', navOp: 'delivery' },
//     // { id: 2, name: 'Review', navOp: 'review' },
//     { id: 2, name: 'Payment', navOp: 'payment-method' },
//   ]

  const checkoutSectionsData = [
    { id: 1, name: 'Delivery', navOp: 'delivery' },
    { id: 2, name: 'Payments', navOp: 'payment-method' },
  ]

//   const [currentOption, setCurrentOption] = useState(0);

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

      // If validation passes, proceed to the next tab
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
        // setIsCartLoading(false);
        setIsLoading(false)
        throw error; // Avoid calling setCartSection on error if not needed
      }


      // Proceed only if validation passes

    }
  };

  // const protectionPrice = isCheck[0] ? 210 : 0;
  // const assemblyPrice = isCheck[1] ? 250 : 0;

  // const orderPriceDetails = [
  //   { title: 'Subtotal', price: formatedPrice(subTotal) },
  //   { title: 'Protection plan', price: formatedPrice(protectionPrice) },
  //   { title: 'Professional Assembly', price: formatedPrice(assemblyPrice) },
  //   { title: `Tax (${totalTax?.tax_name})`, price: totalTax ? formatedPrice(calculateTotalTax(subTotal, parseFloat(totalTax?.tax_value))) : 0 }
  // ]

  // Define conditional visibility logic
//   const filteredOrderPriceDetails = orderPriceDetails.filter((_, index) => {
//     if (index === 1) return isCheck[0]; // Show 'Professional Assembly' if isCheck[0] is true
//     if (index === 2) return isCheck[1]; // Show 'Elite Title' if isCheck[1] is true
//     return true; // Always include other items
//   });

  const handleClickSave = () => {
    // addProducts(cartProducts?.products);
    handlePaymentInfo();
    sendProducts();
  };

  const [isZipUpdateOpen, setIsZipUpdateOpen] = useState(false)
  const handleZipInput = () => {
    setIsZipUpdateOpen(!isZipUpdateOpen)
  }



  const isPaymentMethodFilled = () => orderPayload.payment_method.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPaymentMethodFilled()) {

      // Proceed with form submission
      handleClickSave();
      // navigate('/')
    } else {
      alert("Please select a payment method!");
    }
  };

  const [showAll, setShowAll] = useState(false);
  const handleShowMore = () => {
    setShowAll(!showAll)
  }

  return (
    <div className='summary-main-container'>
      {/* {showThankyou && <ThankYou/>} */}
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
                            <p>{formatedPrice(items.regular_price)}</p>
                          ) : (
                            <div className='order-summary-prices-container' style={{ display: 'flex', flexDirection: 'column' }}>
                              <del>{formatedPrice(items.regular_price)}</del>
                              <p>{formatedPrice(items.sale_price)}</p>
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
                <p className='cart-order-summary-price-detail-single-item-price' style={{ color: "var(--primary-color)" }} >-{formatedPrice(savings)}</p>
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
                  <h3 onClick={handleZipInput}>{info?.locationData.state} {info?.locationData.stateCode} <IoIosArrowDown className={`cart-order-summary-zip-arrow ${isZipUpdateOpen ? 'cart-order-summary-zip-arrow-rotate' : ''}`} size={20} /> </h3>
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
                <span className='right-section-place-order-terms-and-rights'>
                  By placing this order I agree to the Furniture Mecca
                  <Link
                    href={'#'}
                    onClick={() => {
                      handleOpenTermsConditionsModal()
                    }}
                  >Terms & Conditions</Link>
                </span>
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
    </div>
  )
}

export default CheckoutClient