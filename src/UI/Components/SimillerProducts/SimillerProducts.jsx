import React, { useState, useEffect, useRef } from 'react'
import './SimillerProducts.css'
import axios from 'axios'
import heart from '../../../Assets/icons/heart-vector.png'
import ProductCardShimmer from '../Loaders/productCardShimmer/productCardShimmer'
import { useList } from '../../../context/wishListContext/wishListContext'
import Slider from 'react-slick'
import leftArrow from '../../../Assets/icons/arrow-left-charcol.png'
import rightArrow from '../../../Assets/icons/arrow-right-charcol.png'
import ProductCardTwo from '../ProductCardTwo/ProductCardTwo'
import QuickView from '../QuickView/QuickView'
import { useRouter } from 'next/navigation'
import SnakBar from '@/Global-Components/SnakeBar/SnakBar'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import SwiperSlider from '@/UI/Sliders/SwiperSlider/SwiperSlider'


const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className={`cart-latest-products-slider-arrow cart-latest-products-slider-arrow-left ${className}`} >
      {/* <img src={leftArrow} alt='arrow' /> */}
      <MdKeyboardArrowLeft size={25} color='#FFF' />
    </div>
  )
}
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className={`cart-latest-products-slider-arrow cart-latest-products-slider-arrow-right ${className}`} >
      {/* <img src={rightArrow} alt='arrow' /> */}
      <MdKeyboardArrowRight size={25} color='#FFF' />
    </div>
  )
}

const SimillerProducts = ({ isPadding, productId }) => {

  const [data, setData] = useState()


  const fetchCollections = async () => {
    const api = `https://fmapi.myfurnituremecca.com/api/v1/products/get-collection-products/${productId}`

    try {
      const response = await axios.get(api)
      if (response.status === 200) {
        setData(response.data.products)
      }
    } catch (error) {
      console.error("UnExpected Server Error", error);
    }
  }

  useEffect(() => {
    fetchCollections()
  }, [productId])

  const [quickViewProduct, setQuickViewProduct] = useState({})
  const [quickViewClicked, setQuickView] = useState(false);
  const handleQuickViewOpen = (item) => {
    setQuickView(true);
    setQuickViewProduct(item)

  }


  const handleQuickViewClose = () => { setQuickView(false) }

  const router = useRouter();

  const { addToList, removeFromList, isInWishList } = useList()

  const [showSnakeBar, setShowSnakeBar] = useState(false);
  const [snakeBarMessage, setSnakeBarMessage] = useState()
  const handleWishList = (item) => {
    if (isInWishList(item.uid)) {
      removeFromList(item.uid);
      setShowSnakeBar(true);
      setSnakeBarMessage("Product Removed From Wish List");

    } else {
      addToList(item)
      setShowSnakeBar(true);
      setSnakeBarMessage("Product Added To Wish List");

    }
  }

  const handleCloseSnakeBar = () => {
    setShowSnakeBar(false)
  }

  // const [activeIndex, setActiveIndex] = useState(0);
  // const totalSlides = data?.length;

  // const scrollDotsToCenter = (index) => {
  //   const container = dotsRef.current;
  //   if (!container) return;

  //   const dots = container.querySelectorAll('li');
  //   const activeDot = dots[index];

  //   if (activeDot && container) {
  //     const containerWidth = container.offsetWidth;
  //     const dotOffsetLeft = activeDot.offsetLeft;
  //     const dotWidth = activeDot.offsetWidth;
  //     const scrollPosition = dotOffsetLeft - (containerWidth / 2) + (dotWidth / 2);
  //     container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  //   }
  // };

  // useEffect(() => {
  //   const interval = setTimeout(() => {
  //     scrollDotsToCenter(activeSlide);
  //   }, 100); // wait for DOM update

  //   return () => clearTimeout(interval);
  // }, [activeSlide]);

  // Slick
  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    nextArrow:
      data && data.length > 4 ? <SampleNextArrow to="next" /> : null,
    prevArrow:
      data && data.length > 4 ? <SamplePrevArrow to="prev" /> : null,
    afterChange: (index) => setActiveIndex(index),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
          arrows: data && data.length > 2 ? true : false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          arrows: data && data.length > 2 ? true : false,

        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: false // still false, we're using custom
        }
      }
    ]
  };

  // const renderCustomDots = () => {
  //   if (window.innerWidth > 480) return null; // only mobile

  //   const visibleDots = [];

  //   // Determine start index to always show 3 dots
  //   let start = Math.max(0, activeIndex - 1);
  //   if (activeIndex === totalSlides - 1) start = totalSlides - 3;
  //   if (activeIndex === 0) start = 0;

  //   for (let i = start; i < start + 3 && i < totalSlides; i++) {
  //     visibleDots.push(
  //       <div
  //         key={i}
  //         className={`custom-dot ${i === activeIndex ? 'active' : ''}`}
  //       />
  //     );
  //   }

  //   return <div className="custom-dots-wrapper">{visibleDots}</div>;
  // };

  const handleProductClick = (item) => {
    router.push(`/product/${item.slug}`, { state: item });
  };

  return (
    data?.length > 0 && (
      <div className={`similler-products-main-container ${isPadding ? 'add-padding' : ''}`}>
        <h3>Shop From This Collection</h3>

        <div className='cart-related-products-slider-main-div'>

          {data ? (
            <SwiperSlider
              slidesData={data}
              renderSlide={(item, index) => (
                <div key={index} className='cart-latest-product-cards-container'>
                  <ProductCardTwo
                    key={index}
                    slug={item.slug}
                    singleProductData={item}
                    maxWidthAccordingToComp={"100%"}
                    justWidth={'100%'}
                    showOnPage={true}
                    percent={'12%'}
                    showExtraLines={false}
                    titleHeight={true}
                    tagIcon={item.productTag ? item.productTag : heart}
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
              showArrows={true}
              spaceBetween={15}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 4 },
              }}
            />
          ) : (
            Array.from({ length: 4 }).map((_, index) => (
              <ProductCardShimmer />
            ))
          )}


          {/* <Slider {...settings}>
            {data ? (
              data?.map((item, index) => (
                <div key={index} className='cart-latest-product-cards-container'>
                  <ProductCardTwo
                    key={index}
                    slug={item.slug}
                    singleProductData={item}
                    maxWidthAccordingToComp={"98%"}
                    justWidth={'100%'}
                    showOnPage={true}
                    percent={'12%'}
                    showExtraLines={false}
                    titleHeight={true}
                    tagIcon={item.productTag ? item.productTag : heart}
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
              ))
            ) : (
              Array.from({ length: 4 }).map((_, index) => (
                <ProductCardShimmer />
              ))
            )}
          </Slider> */}
        </div>

        <QuickView
          setQuickViewProduct={quickViewProduct}
          quickViewShow={quickViewClicked}
          quickViewClose={handleQuickViewClose}
        />

        <SnakBar
          message={snakeBarMessage}
          openSnakeBarProp={showSnakeBar}
          setOpenSnakeBar={setShowSnakeBar}
          onClick={handleCloseSnakeBar}
        />
      </div>

    )
  )
}
export default SimillerProducts