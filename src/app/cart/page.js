'use client'

import React, { useEffect, useState } from 'react'
import './Cart.css'
import CartMainImage from '@/UI/Components/Cart-Components/CartMainImage/CartMainImage';
import CartProducts from '@/UI/Components/Cart-Components/Cart-Products/CartProducts';
import { IoIosArrowDown } from "react-icons/io";
import axios from 'axios'
import { useCart } from '@/context/cartContext/cartContext';
import ProductCardShimmer from '@/UI/Components/Loaders/productCardShimmer/productCardShimmer';
import { useList } from '@/context/wishListContext/wishListContext';
import { useGlobalContext } from '@/context/GlobalContext/globalContext';
import { formatedPrice, getAdjustedPrice, url } from '../../utils/api';
import QuickView from '@/UI/Components/QuickView/QuickView';
import FinancingModal from '@/UI/Modals/FinancingModal/FinancingModal';
import AppointmentModal from '@/Global-Components/AppointmentModal/AppointmentModal';
import ProductCardTwo from '@/UI/Components/ProductCardTwo/ProductCardTwo';
import { useAppointment } from '@/context/AppointmentContext/AppointmentContext';
import { useRouter } from 'next/navigation';
import SwiperSlider from '@/UI/Sliders/SwiperSlider/SwiperSlider';
import LocationPopUp from '@/UI/Components/LocationPopUp/LocationPopUp';
import SideCart from '@/UI/Components/Cart-side-section/SideCart';
import MessageModal from '@/UI/Modals/MessageModal/MessageModal';
import ZipModal from '@/UI/Modals/ZipModal/ZipModal';



const Cart = () => {
  const [isZipUpdateOpen, setIsZipUpdateOpen] = useState(false)
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const {
    shippingMethods,
    info,
    zipCode,
    handleInputChange,
    handleButtonClick,
    totalTax,
    calculateTotalTax,
    selectedOption,
    getShippingMethods,
    setSelectedShippingMethods,
    CalculateGrandTotal,
    handleChange,
    selectedShippingMethods,
    wrongZip, setWrongZip,
    wrongZipMessage,
    handleZipWarningClose,
  } = useGlobalContext();


  const {
    subTotal,
    subTotal0,
    savings,
    isCartProtected,
    cartProducts,
    isProfessionalAssembly,
    cartSection, 
    setCartSection,
  } = useCart();

  const handleZipInput = () => {
    setIsZipUpdateOpen(!isZipUpdateOpen)
  }

  const handleCouponInput = () => {
    setIsCouponOpen(!isCouponOpen)
  }

  const [latestProducts, setLatestProducts] = useState([]);
  const [noProduct, setNoProduct] = useState(false);



  useEffect(() => {
    if (shippingMethods) {
      getShippingMethods(subTotal, shippingMethods['shippingMethods']);
    }
  }, []); 

  useEffect(() => {
    if (shippingMethods) {
      getShippingMethods(subTotal, shippingMethods['shippingMethods']);
      setIsStarted(!isStarted);
    }
  }, [subTotal, shippingMethods]); // Dependency array for changes in subTotal or shippingMethods

  useEffect(() => {
    if (shippingMethods) {
      getShippingMethods(subTotal, shippingMethods['shippingMethods']);
    }
  }, [isStarted])

  useEffect(() => { setSelectedShippingMethods(null) }, [info])

  const payCards = ['/Assets/icons/mastercard-1.png', '/Assets/icons/visa-1.png', '/Assets/icons/discover-1.png', '/Assets/icons/ae-1.png', '/Assets/icons/paypal-1.png'];

  const router = useRouter();
  const [quickViewProduct, setQuickViewProduct] = useState({})
  const [quickViewClicked, setQuickView] = useState(false);
  const handleQuickViewOpen = (item) => {
    setQuickView(true);
    setQuickViewProduct(item)
  }

  const handleQuickViewClose = () => {
    setQuickView(false);
  }

  const navigateToCheckout = () => {
    router.push("/check-out");
  }

  const {
    addToList,
    removeFromList,
    isInWishList
  } = useList()

  const handleWishList = (item) => {
    if (isInWishList(item.uid)) {
      removeFromList(item.uid);

    } else {
      addToList(item)
    }
  }

  // Apply Financing Modal
  const [applyFinancing, setApplyFinancing] = useState(false);
  const handleOpenFinancingModal = () => {
    setApplyFinancing(true);
  }
  const handleCloseFinancingModal = () => {
    setApplyFinancing(false)
  }

  useEffect(() => {
    if (applyFinancing) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [applyFinancing])

  // Appointment Modal
  const { setAppointmentPayload } = useAppointment()
  const [selectedTab, setSelectedTab] = useState(1);
  const [appointmentModal, setAppointmentModal] = useState(false)
  const handleAppointments = () => {
    setAppointmentModal(true);
  }

  const handleCloseAppointmentModal = () => {
    setAppointmentModal(false)
    setSelectedTab(1)
    setAppointmentPayload({
      serviceType: '',
      selectedCategories: [],
      selectedStore: {},
      otherDetails: 'Customer has sensitive skin',
      selectedDate: '',
      selectedSlot: '',
      details: {
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        associate: ''
      }
    })
  }

  const [errorMessage, setErrorMessage] = useState('Something went wrong! Please try again later.');
  const [snakebarOpen, setSnakebarOpen] = useState(false);

  const handleOpenSnakeBar = () => {
    setSnakebarOpen(true);
  }
  const handleProductClick = (item) => {
    router.push(`/product/${item.slug}`);
  };

  const [searchLocation, setSearchLocation] = useState(false);
  const handleLocationModal = () => {
    setSearchLocation(true)
  }

  const handleCloseSearch = () => {
    setSearchLocation(false)
  }

  const [locationDetails, setLocationDetails] = useState({
    zipCode: '',
    city: '',
    state: '',
    country: ''
  });

  const handleCloseSideCart = () => {
    setCartSection(false)
  }



  return (
    <div className='cart-main-container'>
      {/* <CartMainImage /> */}
      <div className='cart-body'>
        <div className={`cart-products-section ${cartProducts?.products?.length === 0 ? 'cart-products-section-full-width' : ''}`}>
          <CartProducts handleLocationModal={handleLocationModal} />
        </div>
        <div className={`cart-order-summery-section ${cartProducts?.products?.length === 0 ? 'hide-order-summary' : ''}`}>
          <div className='cart-order-summery-inner-section'>
            <h3 className='cart-order-summary-heading'>Order Summary</h3>
            <div className='cart-order-summary-price-details'>
              <div className='cart-order-summary-price-detail-single-item'>
                <p className='cart-order-summary-price-detail-single-item-title'>Subtotal</p>
                <p className='cart-order-summary-price-detail-single-item-price'>{formatedPrice(subTotal0)}</p>
              </div>
              {savings > 0 && (
                <div className='cart-order-summary-price-detail-save-discount'>
                  <p>Savings</p>
                  <p style={{ color: "var(--tertiary-color)" }} >-{formatedPrice(savings)}</p>
                </div>
              )}
              {isCartProtected ? (
                <div className='cart-order-summary-price-detail-single-item'>
                  <p className='cart-order-summary-price-detail-single-item-title'>Protect Entire Order</p>
                  <p className='cart-order-summary-price-detail-single-item-price'>{formatedPrice(199)}</p>
                </div>
              ) : (
                <></>
              )}
              {isProfessionalAssembly ? (
                <div className='cart-order-summary-price-detail-single-item'>
                  <p className='cart-order-summary-price-detail-single-item-title'>Professional Assembly</p>
                  <p className='cart-order-summary-price-detail-single-item-price'>{formatedPrice(199)}</p>
                </div>
              ) : (
                <></>
              )}
              <div className='cart-order-summary-price-detail-single-item'>
                <p className='cart-order-summary-price-detail-single-item-title'>{selectedOption?.name}</p>
                <p className='cart-order-summary-price-detail-single-item-price'>{selectedOption?.cost === 0 ? '' : formatedPrice(selectedOption?.cost)}</p>
              </div>
              <div className='cart-order-summary-price-detail-single-item'>
                <p className='cart-order-summary-price-detail-single-item-title'>{`Tax (${totalTax?.tax_name})`}</p>
                <p className='cart-order-summary-price-detail-single-item-price'>{totalTax ? formatedPrice(calculateTotalTax(subTotal, parseFloat(totalTax?.tax_value))) : 0}</p>
              </div>
              <div className='cart-order-summary-zip-code'>
                <span className='cart-order-summary-zip-code-heading'>
                  {/* <p>Calculated for:</p> */}
                  {/* <h3 onClick={handleZipInput}>{info?.locationData?.state} {info?.locationData?.stateCode} <IoIosArrowDown className={`cart-order-summary-zip-arrow ${isZipUpdateOpen ? 'cart-order-summary-zip-arrow-rotate' : ''}`} size={20} /> </h3> */}
                  <h3 onClick={handleZipInput}>Zip Code <IoIosArrowDown className={`cart-order-summary-zip-arrow ${isZipUpdateOpen ? 'cart-order-summary-zip-arrow-rotate' : ''}`} size={15} /> </h3>
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
            </div>
            <div className='cart-order-summary-total'>
              <div className='cart-order-summary-price-detail-single-item-total-container'>
                <p className='cart-order-summary-price-detail-single-item-title-total'>Total</p>
                <p className='cart-order-summary-price-detail-single-item-price-count'>{formatedPrice(CalculateGrandTotal())}</p>
              </div>
            </div>
            <div className='order-summary-coupon-div'>
              <p onClick={handleCouponInput}>Add Coupon Code <IoIosArrowDown className={`cart-order-summary-coupon-arrow ${isCouponOpen ? 'cart-order-summary-coupon-arrow-rotate' : ''}`} size={15} /></p>
              <div className={`cart-order-summary-coupon-input-div ${isCouponOpen ? 'show-coupon-update-input' : ''}`}>
                <div className='cart-order-summary-coupon-input-and-button'>
                  <input type='text' placeholder='Coupon Code' className='cart-summary-update-coupon-input' />
                  <button className='cart-summary-update-coupon-btn'>Apply</button>
                </div>
              </div>
            </div>
            <button
              onClick={navigateToCheckout}
              className='cart-summary-proceed-btn'>
              Proceed to Checkout
            </button>
            <div className='payment-card-container'>
              <h3 className='payment-cards-heading'>Securely accepted at checkout</h3>
              <div className='payment-cards-inner-container'>
                {payCards && payCards.map((item, index) => (
                  <img src={item} key={index} alt='payment card' className='payment-card' />
                ))}
              </div>
            </div>
            <div className='financing-months-range-container'>
              <h3 className='financing-month-range-heading'>${getAdjustedPrice(subTotal0)}/week for 12 months</h3>
              <button className='financing-month-range-apply-button' onClick={handleOpenFinancingModal}>
                Apply for Financing
              </button>
              <h3 className='financing-month-range-heading'>Cart will be shared with our home furnishing consultant.</h3>
              <button className='financing-month-range-apply-button' onClick={handleAppointments}>
                Complete in Store
              </button>
            </div>
          </div>
        </div>
      </div>

      {latestProducts && latestProducts?.length > 0 && (
        <div className='cart-related-products-display-section'>
          <h3>You May Also Like</h3>
          <div className='cart-related-products-slider-main-div'>

            {!noProduct && (
              latestProducts && latestProducts?.length > 0 ? (
                <SwiperSlider
                  slidesData={latestProducts}
                  renderSlide={(item, index) => (
                    <div key={index} className='cart-latest-product-cards-container'>
                      <ProductCardTwo
                        key={index}
                        slug={item.slug}
                        singleProductData={item}
                        maxWidthAccordingToComp={"100%"}
                        justWidth={'100%'}
                        percent={'12%'}
                        showOnPage={true}
                        tagIcon={item.productTag ? item.productTag : '/Assets/icons/heart-vector.png'}
                        tagClass={item.productTag ? 'tag-img' : 'heart-icon'}
                        mainImage={`${item.image.image_url}`}
                        productCardContainerClass="product-card"
                        ProductSku={item.sku}
                        tags={item.product_tag}
                        allow_back_order={item?.allow_back_order}
                        ProductTitle={item.name}
                        reviewCount={item.reviewCount}
                        lowPriceAddvertisement={item.lowPriceAddvertisement}
                        priceTag={item.regular_price}
                        sale_price={item.sale_price}
                        financingAdd={item.financingAdd}
                        learnMore={item.learnMore}
                        mainIndex={index}
                        deliveryTime={item.deliveryTime}
                        stock={item.manage_stock}
                        attributes={item.attributes}
                        handleCardClick={() => handleProductClick(item)}
                        handleQuickView={() => handleQuickViewOpen(item)}
                        handleWishListclick={() => handleWishList(item)}
                      />
                    </div>
                  )}
                  showDots={true}
                  showArrows={false}
                  spaceBetween={15}
                  breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 4 },
                  }}
                />
              ) : (
                <div className='cart-page-also-like-cards-shimmer-contianer'>
                  <div className='cart-page-also-like-desktop-shimmer'>
                    {Array.from({ length: 4 }).map((_, index) => (
                      <ProductCardShimmer width={'100%'} />
                    ))}
                  </div>

                  <div className='cart-page-also-like-mobile-shimmer'>
                    {Array.from({ length: 1 }).map((_, index) => (
                      <ProductCardShimmer width={'100%'} />
                    ))}
                  </div>
                </div>

              )
            )}
            {/* {latestProducts && latestProducts?.length > 0 ? (
              <SwiperSlider
                slidesData={latestProducts}
                renderSlide={(item, index) => (
                  <div key={index} className='cart-latest-product-cards-container'>
                    <ProductCardTwo
                      key={index}
                      slug={item.slug}
                      singleProductData={item}
                      maxWidthAccordingToComp={"100%"}
                      justWidth={'100%'}
                      percent={'12%'}
                      showOnPage={true}
                      tagIcon={item.productTag ? item.productTag : '/Assets/icons/heart-vector.png'}
                      tagClass={item.productTag ? 'tag-img' : 'heart-icon'}
                      mainImage={`${item.image.image_url}`}
                      productCardContainerClass="product-card"
                      ProductSku={item.sku}
                      tags={item.tags}
                      allow_back_order={item?.allow_back_order}
                      ProductTitle={item.name}
                      reviewCount={item.reviewCount}
                      lowPriceAddvertisement={item.lowPriceAddvertisement}
                      priceTag={item.regular_price}
                      sale_price={item.sale_price}
                      financingAdd={item.financingAdd}
                      learnMore={item.learnMore}
                      mainIndex={index}
                      deliveryTime={item.deliveryTime}
                      stock={item.manage_stock}
                      attributes={item.attributes}
                      handleCardClick={() => handleProductClick(item)}
                      handleQuickView={() => handleQuickViewOpen(item)}
                      handleWishListclick={() => handleWishList(item)}
                    />
                  </div>
                )}
                showDots={true}
                showArrows={false}
                spaceBetween={15}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  768: { slidesPerView: 4 },
                }}
              />
            ) : (
              <div className='cart-page-also-like-cards-shimmer-contianer'>
                <div className='cart-page-also-like-desktop-shimmer'>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <ProductCardShimmer width={'100%'} />
                  ))}
                </div>

                <div className='cart-page-also-like-mobile-shimmer'>
                  {Array.from({ length: 1 }).map((_, index) => (
                    <ProductCardShimmer width={'100%'} />
                  ))}
                </div>
              </div>

            )} */}
          </div>
        </div>
      )}

      <div className='space-between-checkout-and-related-products'></div>
      <div className='mobile-total-save-and-checkout-button'>
        <div className='mobile-total-and-save'>
          <p className='mobile-total-text'>Total</p>
          <p className='mobile-total-text-ammount'>{formatedPrice(CalculateGrandTotal())}</p>
        </div>
        <div className='mobile-total-and-save'>
          <p className='mobile-you-save-text'>You Saved</p>
          <p className='mobile-you-save-text'>{formatedPrice(savings)}</p>
        </div>
        <button onClick={navigateToCheckout} disabled={cartProducts.products?.length === 0} className={`mobile-proceed-to-checkout-button ${cartProducts.products?.length === 0 ? 'disable-checkout-button' : ''}`}>
          Proceed to Checkout
        </button>
      </div>
      <QuickView setQuickViewProduct={quickViewProduct} quickViewShow={quickViewClicked} quickViewClose={handleQuickViewClose} />
      <FinancingModal
        applyFinancing={applyFinancing}
        handleCloseModal={handleCloseFinancingModal}
      />
      <AppointmentModal
        showAppointMentModal={appointmentModal}
        setAppointmentModal={setAppointmentModal}
        handleCloseModal={handleCloseAppointmentModal}
        setErrorMessage={setErrorMessage}
        snakebarOpen={snakebarOpen}
        setSnakebarOpen={setSnakebarOpen}
        handleOpenSnakeBar={handleOpenSnakeBar}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      <SideCart 
        isCartOpen={cartSection}
        handleCloseSideCart={handleCloseSideCart}
      />

      <LocationPopUp
        searchLocation={searchLocation}
        handleCloseSearch={handleCloseSearch}
        setLocationDetails={setLocationDetails}
        locationDetails={locationDetails}
      />

      <ZipModal
        showMessage={wrongZip}
        errorDetail={wrongZipMessage}
        footerMessage={'Wrong Zip Code'}
        closeModal={handleZipWarningClose}
      />
    </div>
  )
}
export default Cart