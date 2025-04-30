'use client'

import React, { useEffect, useState } from 'react'
import './Cart.css'
import CartMainImage from '@/UI/Components/Cart-Components/CartMainImage/CartMainImage';
import CartProducts from '@/UI/Components/Cart-Components/Cart-Products/CartProducts';
import { IoIosArrowDown } from "react-icons/io";
import axios from 'axios'
// import ProductCard from '../../Components/ProductCard/ProductCard'
// import heart from '../../../Assets/icons/heart-vector.png';
// import star from '../../../Assets/icons/black-star.png'
// import { useNavigate } from 'react-router-dom'
// import leftArrow from '../../../Assets/icons/arrow-left-charcol.png'
// import rightArrow from '../../../Assets/icons/arrow-right-charcol.png'
import Slider from 'react-slick'
import { useCart } from '@/context/cartContext/cartContext';
import ProductCardShimmer from '@/UI/Components/Loaders/productCardShimmer/productCardShimmer';
import { useList } from '@/context/wishListContext/wishListContext';
import { toast } from 'react-toastify';
import { useGlobalContext } from '@/context/GlobalContext/globalContext';
import { formatedPrice, url } from '../../utils/api';
import QuickView from '@/UI/Components/QuickView/QuickView';

// import masterCard from '../../../Assets/icons/mastercard-1.png';
// import visaCard from '../../../Assets/icons/visa-1.png'
// import americanExpressCard from '../../../Assets/icons/ae-1.png';
// import discover from '../../../Assets/icons/discover-1.png'
// import paypal from '../../../Assets/icons/paypal-1.png'


import FinancingModal from '@/UI/Modals/FinancingModal/FinancingModal';
import AppointmentModal from '@/Global-Components/AppointmentModal/AppointmentModal';
import ProductCardTwo from '@/UI/Components/ProductCardTwo/ProductCardTwo';
import { useAppointment } from '@/context/AppointmentContext/AppointmentContext';
import { useRouter } from 'next/navigation';

function SamplePrevArrow(props) {
  const { className, style, onClick, isVisible } = props;
  if (!isVisible) return null;
  return (
    <div onClick={onClick} className={`cart-latest-products-slider-arrow cart-latest-products-slider-arrow-left `} >
      <img src={'/Assets/icons/arrow-left-charcol.png'} alt='arrow' />
    </div>
  )
}

function SampleNextArrow(props) {
  const { className, style, onClick, isVisible } = props;
  if (!isVisible) return null;
  return (
    <div onClick={onClick} className={`cart-latest-products-slider-arrow cart-latest-products-slider-arrow-right `} >
      <img src={'/Assets/icons/arrow-right-charcol.png'} alt='arrow' />
    </div>
  )
}

const Cart = () => {
  const [isZipUpdateOpen, setIsZipUpdateOpen] = useState(false)
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [isCheck, setIsCheck] = useState({});
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
    handleChange,
    getShippingMethods,
    selectedShippingMethods,
    setSelectedShippingMethods,
    CalculateGrandTotal
  } = useGlobalContext();

  const {
    cart,
    subTotal,
    subTotal0,
    savings,
    isCartProtected,
    cartProducts,
    isProfessionalAssembly,
    handleCartProtected,
    handleCartAssembly,
  } = useCart();


  const subTotalOfAllProducts = cart?.map(item => item.product.sub_total);
  const subtotal = subTotalOfAllProducts?.reduce((acc, value) => acc + value, 0)

  const protectionPrice = isCheck[0] ? 210 : 0;
  const assemblyPrice = isCheck[1] ? 250 : 0;

  const handleZipInput = () => {
    setIsZipUpdateOpen(!isZipUpdateOpen)
  }
  const handleCouponInput = () => {
    setIsCouponOpen(!isCouponOpen)
  }

  const [latestProducts, setLatestProducts] = useState([]);
  const getLatestProducts = async () => {
    const api = `${url}/api/v1/products/get`;
    try {
      const response = await axios.get(api);
      setLatestProducts(response.data.products)
    } catch (error) {
      console.error("error", error);
    }
  }

  useEffect(() => {
    getLatestProducts();
    if (shippingMethods) {
      getShippingMethods(subTotal, shippingMethods['shippingMethods']);
    }
  }, []); // Empty dependency array ensures this runs once when the component mounts

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

  const productsUids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const newProducts = latestProducts.filter((product) => productsUids.includes(product.uid));

  // const maxLength = 30;
  // const truncateTitle = (title, maxLength) => {
  //   return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
  // };

  const payCards = ['/Assets/icons/mastercard-1.png', '/Assets/icons/visa-1.png', '/Assets/icons/discover-1.png', '/Assets/icons/ae-1.png', '/Assets/icons/paypal-1.png'];

  const navigate = useRouter();
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
    navigate.push("/check-out");
  }

  // Slick
  let totalSlides = newProducts?.length;
  const [currentSlide, setCurrentSlide] = useState(0);
  let settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    nextArrow: (
      <SampleNextArrow
        isVisible={currentSlide + 5 < totalSlides} // adjust 5 based on slidesToShow
      />
    ),
    prevArrow: (
      <SamplePrevArrow
        isVisible={currentSlide > 0}
      />
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  const {
    addToList,
    removeFromList,
    isInWishList
  } = useList()

  const notify = (str) => toast.success(str);
  const notifyRemove = (str) => toast.error(str)
  const handleWishList = (item) => {
    if (isInWishList(item.uid)) {
      removeFromList(item.uid);
      notifyRemove('Removed from wish list', {
        autoClose: 10000,
        className: "toast-message",
      })
    } else {
      addToList(item)
      notify("added to wish list", {
        autoClose: 10000,
      })
    }
  }


  // const orderPriceDetails = [
  //   { title: 'Subtotal', price: formatedPrice(subTotal) },
  //   // { title: 'Protection plan', price: formatedPrice(protectionPrice) },
  //   // { title: 'Professional Assembly', price: formatedPrice(assemblyPrice) },
  //   { title: `Tax (${totalTax?.tax_name})`, price: totalTax ? formatedPrice(calculateTotalTax(subTotal, parseFloat(totalTax?.tax_value))) : 0 }
  // ]



  // Define conditional visibility logic
  // const filteredOrderPriceDetails = orderPriceDetails.filter((_, index) => {
  //   if (index === 1) return isCheck[0]; // Show 'Professional Assembly' if isCheck[0] is true
  //   if (index === 2) return isCheck[1]; // Show 'Elite Title' if isCheck[1] is true
  //   return true; // Always include other items
  // });

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
      console.log("snakebar open function called")
      // setAppointmentModal(false);
      setSnakebarOpen(true);
    }
    const handleCloseSnakeBar = () => {
      setSnakebarOpen(false);
    }

  const handleProductClick = (item) => {
    navigate.push(`/product/${item.slug}`, { state: item });
  };


  return (
    <div className='cart-main-container'>
      <CartMainImage />

      <div className='cart-body'>
        <div className={`cart-products-section ${cartProducts?.products?.length === 0 ? 'cart-products-section-full-width' : ''}`}>
          <CartProducts />
        </div>

        <div className={`cart-order-summery-section ${cartProducts?.products?.length === 0 ? 'hide-order-summary' : ''}`}>
          <div className='cart-order-summery-inner-section'>
            <h3 className='cart-order-summary-heading'>Order Summary</h3>

            {/* <div className='proffesional-assembly-check-sec'>
              <label className='order-summary-proffesional-check-item-label'>
                <input
                  type="checkbox"
                  className='order-summary-checkbox'
                  checked={isProfessionalAssembly}
                  onChange={() => handleCartAssembly()}
                />
                Professional Assembly (+ $210)
              </label>
              <p className='order-summary-proffesional-check-item-detail'>Use professional assembly for all products and save up to $80</p>
            </div> */}

            {/* {cartProducts.products.length > 1 ? ( */}
            {/* <div className='proffesional-assembly-check-sec'>
              <label className='order-summary-proffesional-check-item-label'>
                <input
                  type="checkbox"
                  className='order-summary-checkbox'
                  checked={isCartProtected}
                  onChange={() => handleCartProtected()}
                />
                Elite Platinum Furniture Protection(+ $199)
              </label>
              <p className='order-summary-proffesional-check-item-detail'>Use professional assembly for all products and save up to $80</p>
            </div> */}

            <div className='cart-order-summary-price-details'>

              {/* {filteredOrderPriceDetails.map((price, index) => (
                <div key={index} className='cart-order-summary-price-detail-single-item'>
                  <p className='cart-order-summary-price-detail-single-item-title'>{price.title}</p>
                  <p className='cart-order-summary-price-detail-single-item-price'>{price.price}</p>
                </div>
            ))} */}

              <div className='cart-order-summary-price-detail-single-item'>
                <p className='cart-order-summary-price-detail-single-item-title'>Subtotal</p>
                <p className='cart-order-summary-price-detail-single-item-price'>{formatedPrice(subTotal0)}</p>
              </div>




              <div className='cart-order-summary-price-detail-save-discount'>
                <p>Savings</p>
                <p style={{ color: "var(--primary-color)" }} >-{formatedPrice(savings)}</p>
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

              {/* <div className="delivery-option-container">
                <span className='order-summary-deliver-to'>
                  <p className='delivery-opt-heading' >Delivery Options :</p>
                  {selectedOption?.id === 'METHOD-2' ? <p className='delivery-opt-heading'>{formatedPrice(selectedOption?.cost)}</p> : <></>}
                </span>
                {selectedShippingMethods &&
                  selectedShippingMethods.map((option, index) => (
                    <label
                      key={option.id}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        margin: "5px 0",
                        gap: "10px",
                      }}
                      onClick={() => handleDeliveryOptionndex(index)}
                    >
                      <input
                        type="radio"
                        name="options"
                        value={option.id}
                        checked={selectedOption?.id === option.id}
                        onChange={(e) => handleChange(e, option, index)} // Pass the `option` object
                        style={{
                          marginTop: "5px",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "center",
                        }}
                      >
                        <p className="delivery-option-container-label">{option.name}</p>
                        <p className="delivery-option-container-description">{option.description}</p>
                      </div>
                    </label>
                  ))}
              </div> */}



            </div>

            <div className='cart-order-summary-total'>
              <div className='cart-order-summary-price-detail-single-item-total-container'>
                <p className='cart-order-summary-price-detail-single-item-title-total'>Total</p>
                <p className='cart-order-summary-price-detail-single-item-price-count'>{formatedPrice(CalculateGrandTotal())}</p>
              </div>
              {/* <div className='cart-order-summary-price-detail-save-discount'>
                <p>You Save</p>
                <p>{formatedPrice(savings)}</p>
              </div> */}
            </div>

            <div className='order-summary-coupon-div'>
              <p onClick={handleCouponInput}>Add Coupon Code <IoIosArrowDown className={`cart-order-summary-coupon-arrow ${isCouponOpen ? 'cart-order-summary-coupon-arrow-rotate' : ''}`} size={20} /></p>
              <div className={`cart-order-summary-coupon-input-div ${isCouponOpen ? 'show-coupon-update-input' : ''}`}>
                <div className='cart-order-summary-coupon-input-and-button'>
                  <input type='text' placeholder='Coupon Code' className='cart-summary-update-coupon-input' />
                  <button className='cart-summary-update-coupon-btn'>Update</button>
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
              <h3 className='financing-month-range-heading'>$125/month for 48 months</h3>
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

      {/* <div className='cart-related-products-display-section'>
        <h3>You May Also Like</h3>
        <div className='cart-related-products-slider-main-div'>
          <Slider {...settings}>
            {newProducts && newProducts.length > 0 ? (
              newProducts.map((item, index) => (
                <div key={index} className='cart-latest-product-cards-container'>
                  <ProductCardTwo
                    key={index}
                    slug={item.slug}
                    singleProductData={item}
                    maxWidthAccordingToComp={"100%"}
                    justWidth={'100%'}
                    percent={'12%'}
                    showOnPage={true}
                    // colTwo={selectedGrid === 'single-col' ? false : true}
                    tagIcon={item.productTag ? item.productTag : '/Assets/icons/heart-vector.png'}
                    tagClass={item.productTag ? 'tag-img' : 'heart-icon'}
                    mainImage={`${item.image.image_url}`}
                    productCardContainerClass="product-card"
                    ProductSku={item.sku}
                    tags={item.tags}
                    allow_back_order={item?.allow_back_order}
                    ProductTitle={item.name}
                    // stars={[
                    //   { icon: star, title: 'filled' },
                    //   { icon: star, title: 'filled' },
                    //   { icon: star, title: 'filled' },
                    //   { icon: star, title: 'filled' },
                    //   { icon: star, title: 'filled' },
                    // ]}
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
                  // key={index}
                  // slug={item.slug}
                  // singleProductData={item}
                  // maxWidthAccordingToComp="98%"
                  // // justWidth={'320px'}
                  // tagIcon={item.productTag ? item.productTag : heart}
                  // tagClass={item.productTag ? 'tag-img' : 'heart-icon'}
                  // mainImage={`${item.image.image_url}`}
                  // productCardContainerClass="product-card"
                  // ProductSku={item.sku}
                  // percent={'12%'}
                  // tags={item.tags}
                  // ProductTitle={truncateTitle(item.name, maxLength)}
                  // stars={[
                  //   { icon: star, title: 'filled' },
                  //   { icon: star, title: 'filled' },
                  //   { icon: star, title: 'filled' },
                  //   { icon: star, title: 'filled' },
                  //   { icon: star, title: 'filled' },
                  // ]}
                  // reviewCount={item.reviewCount}
                  // lowPriceAddvertisement={item.lowPriceAddvertisement}
                  // priceTag={item.regular_price}
                  // sale_price={item.sale_price}
                  // financingAdd={item.financingAdd}
                  // learnMore={item.learnMore}
                  // mainIndex={index}
                  // deliveryTime={item.deliveryTime}
                  // stock={item.manage_stock}
                  // attributes={item.attributes}
                  // handleCardClick={() => handleQuickViewOpen(item)}
                  // handleQuickView={() => handleQuickViewOpen(item)}
                  // type={item.type}
                  // variation={item.variations}
                  // handleWishListclick={() => handleWishList(item)}
                  />
                </div>
              ))
            ) : (
              Array.from({ length: 4 }).map((_, index) => (
                <ProductCardShimmer width={'100%'} />
              ))
            )}

          </Slider>
        </div>
      </div> */}

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
        <button onClick={navigateToCheckout} className='mobile-proceed-to-checkout-button'>
          Proceed to checkout
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
    </div>
  )
}

export default Cart