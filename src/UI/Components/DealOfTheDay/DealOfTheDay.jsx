import React, { useState, useEffect, useRef } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './DealOfTheDay.css';

import DealOfTheDayCard from './DealOfTheDayCard/DealOfTheDayCard';

import axios from 'axios';
import { url, calculateDiscountPercentage } from '../../../utils/api';
import { useSingleProductContext } from '../../../context/singleProductContext/singleProductContext';
import { useList } from '../../../context/wishListContext/wishListContext';
import { toast } from 'react-toastify';
import ShareProduct from '../ShareProduct/ShareProduct';
import DealOfTheMonthShimmer from './DealOfTheMonthShimmer/DealOfTheMonthShimmer';
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useParams, useRouter } from 'next/navigation';



const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className={`arrow ${className}`} >
      <IoIosArrowDropleftCircle style={{ backgroundColor: '#FFFFFF', borderRadius: '50%' }} />
    </div>
  )
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className={`arrow ${className}`} >
      <IoIosArrowDroprightCircle size={22} style={{ backgroundColor: '#FFFFFF', borderRadius: '50%', }} />
    </div>
  )
}

const DealOfTheDay = ({ dealEndTime, setDealEndTime, allProducts, setAllProducts, api }) => {

  const router = useRouter();
  // const { categorySlug } = useParams();
  // const categorySlug = 'living-room'
  const params = useParams();
  const categorySlug = params.categorySlug;



  // const [dealEndTime, setDealEndTime] = useState(null); 
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const calculateTimeLeft = () => {
    if (!dealEndTime) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const targetDate = new Date(dealEndTime).getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;
    const padZero = (num) => String(num).padStart(2, '0');



    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: padZero(Math.floor(difference / (1000 * 60 * 60 * 24))),
        hours: padZero(Math.floor((difference / (1000 * 60 * 60)) % 24)),
        minutes: padZero(Math.floor((difference / 1000 / 60) % 60)),
        seconds: padZero(Math.floor((difference / 1000) % 60)),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  };


  useEffect(() => {
    if (dealEndTime) {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [dealEndTime]);

  // Destructure timeLeft
  const { days, hours, minutes, seconds } = timeLeft;

  // const [allProducts, setAllProducts] = useState([])
  const getDealOfTheMonthProducts = async () => {
    // const api = `/api/v1/products/get-deal-of-month-products?limit=10`
    try {
      const response = await axios.get(`${url}${api}`);
      setAllProducts(response.data.products)
      setDealEndTime(response.data.dealOfMonthTiming.datetime);
    } catch (error) {
      console.error("error geting deal of the month products", error);
    }
  }

  useEffect(() => {
    getDealOfTheMonthProducts()
  }, []);

  useEffect(() => { getDealOfTheMonthProducts(); }, [categorySlug])



  const getPublishedProducts = () => {
    // Filter products where parent === 0
    const productWithDiscount = allProducts
      .filter((product) => product.parent === 0) // Add filter condition here
      .map((product) => {
        let newPrice = parseFloat(product.regular_price);

        if (product.discount && product.discount.is_discountable === 1) {
          const oldPrice = parseFloat(product.regular_price);
          const discountedValue = parseFloat(product.discount.discount_value);
          if (product.discount.discount_type === 'percentage') {
            newPrice = oldPrice - (oldPrice * (discountedValue / 100));
            newPrice = parseFloat(newPrice.toFixed(2));
          } else if (product.discount.discount_type === 'currency') {
            newPrice = oldPrice - discountedValue;
          } else {
            newPrice = oldPrice;
          }
        }

        return {
          ...product,
          newPrice
        };
      });

    return productWithDiscount;
  };


  const { addSingleProduct } = useSingleProductContext();
  const handleDealCardClick = (items) => {
    addSingleProduct(items)
    router.push(`/product/${items.slug}`)
  }

  let productCount = 0
  const publishedProductsLength = allProducts?.filter(product => product.status === 'published')
  productCount = publishedProductsLength?.length;

  // wish list 
  const { addToList, removeFromList, isInWishList } = useList()
  const notify = (str) => toast.success(str);
  const notifyRemove = (str) => toast.error(str)
  const handleWishList = (item) => {
    if (isInWishList(item.uid)) {
      removeFromList(item.uid)
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

  const handleCartPanel = (items) => {

  }

  const [isSharePopup, setIsSharePopup] = useState(null);
  const [selectedUid, setSelectedUid] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState()
  const handleShareProduct = (items) => {
    setIsSharePopup(items.uid)
    setSelectedProduct(items)
    setSelectedUid(items.uid);
  }



  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentDotPosition, setCurrentDotPosition] = useState(1);

  const [dotStartIndex, setDotStartIndex] = useState(0);

  const beforeChange = (oldIndex, newIndex) => {
    setCurrentSlide(newIndex);

    const groupSize = 5;

    // When the active dot moves beyond the current group
    if (newIndex >= dotStartIndex + groupSize) {
      const newStart = Math.floor(newIndex / groupSize) * groupSize;
      setDotStartIndex(newStart);
      setCurrentDotPosition((newIndex % groupSize) + 1);
    } else if (newIndex < dotStartIndex) {
      // User went back to a previous group
      const newStart = Math.floor(newIndex / groupSize) * groupSize;
      setDotStartIndex(newStart);
      setCurrentDotPosition((newIndex % groupSize) + 1);
    } else {
      // Within current group
      setCurrentDotPosition((newIndex % groupSize) + 1);
    }
  };

  const mobileSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange,

    customPaging: () => <button className="custom-dot" />,

    appendDots: (dots) => {
      const totalDots = dots.length;
      const visibleDots = dots.slice(dotStartIndex, dotStartIndex + 5);

      return (
        <div className="dots-slider-wrapper">
          <div className="dots-slider">
            {visibleDots.map((dot, i) => {
              const actualIndex = dotStartIndex + i;
              const isActive = actualIndex === currentSlide;

              return (
                <div
                  key={actualIndex}
                  className={`dot-wrapper ${isActive ? 'active-dot' : ''}`}
                  onClick={() => {
                    sliderRef.current?.slickGoTo(actualIndex);
                    setCurrentSlide(actualIndex);

                    const groupSize = 5;
                    const newStart = Math.floor(actualIndex / groupSize) * groupSize;

                    setDotStartIndex(newStart);
                    setCurrentDotPosition((actualIndex % groupSize) + 1);
                  }}
                >
                  <span className={`custom-dot ${isActive ? 'highlighted-dot' : ''}`} />
                </div>
              );
            })}
          </div>
        </div>
      );
    },
  };

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: true,
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePrevArrow to="prev" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          ...mobileSettings
        }
      }
    ]
  };

  if (!allProducts.length > 0) {
    return
  }

  return (
    <div className='deal-of-the-day-main-container'>
      <div className='deal-of-the-day-border-heading'>
        <p>Deal Of The Month</p>
        <div className='deal-of-the-day-end-time'>
          <p>Ends in:</p>
          <p>{days} Days &nbsp; {hours} Hours &nbsp; {minutes} Min &nbsp; {seconds} Sec</p>
        </div>
      </div>
      <div className='deal-of-the-day-outer-container'>
        <div className='mobile-view-deal-of-the-day-timer-and-product-count'>
          <div className='mobile-view-timer'>
            <p>{days}d: {hours}h: {minutes}m</p>
          </div>
          <h3 className='mobile-view-deal-of-the-day-product-count'>{productCount} Products</h3>
        </div>
        <div className='slider-main-container'>

          {/* <Slider {...settings}> */}
          {allProducts?.length === 0 ? (
            <div className='deal-of-the-day-cards-shimmer-container'>
              <div className='desktop-view-shimmer'>
                {Array.from({ length: 4 }).map((_, index) => <DealOfTheMonthShimmer key={index} />)}
              </div>
              <div className='mobile-view-shimmer'>
                <DealOfTheMonthShimmer />
              </div>
            </div>
          ) : (
            <Slider ref={sliderRef} {...settings}>
              {allProducts?.length > 0 && getPublishedProducts().map((items, index) => (
                <DealOfTheDayCard
                  key={index}
                  isDiscountable={items.discount.is_discountable === 1 ? true : false}
                  productImage={items?.images?.[0]?.image_url}
                  dealDayData={items}
                  name={items.name}
                  rating={items.rating}
                  review={'200'}
                  price={items.regular_price}
                  newPrice={items.newPrice}
                  descount={items.disc}
                  dicountPercent={calculateDiscountPercentage(items.sale_price, items.regular_price)}
                  handleDealCardClick={() => handleDealCardClick(items)}
                  handleWishListClick={() => handleWishList(items)}
                  handleCartSection={() => handleCartPanel(items)}
                  handleShareProduct={() => handleShareProduct(items)}
                />
              ))}
            </Slider>
          )}
        </div>
      </div>
      <ShareProduct
        isSharePopup={isSharePopup}
        setIsSharePopup={setIsSharePopup}
        selectedUid={selectedUid}
        setSelectedUid={setSelectedUid}
        selectedProduct={selectedProduct}
      />
    </div>
  )
}

export default DealOfTheDay
