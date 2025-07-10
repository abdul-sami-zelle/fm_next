import React, { useState, useEffect } from 'react'
import './DealOfTheDay.css';
import DealOfTheDayCard from './DealOfTheDayCard/DealOfTheDayCard';
import { calculateDiscountPercentage } from '../../../utils/api';
import { useSingleProductContext } from '../../../context/singleProductContext/singleProductContext';
import { useList } from '../../../context/wishListContext/wishListContext';
import { toast } from 'react-toastify';
import ShareProduct from '../ShareProduct/ShareProduct';
import DealOfTheMonthShimmer from './DealOfTheMonthShimmer/DealOfTheMonthShimmer';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { fetcher } from '@/utils/Fetcher';
import SwiperSlider from '@/UI/Sliders/SwiperSlider/SwiperSlider';

const DealOfTheDay = ({ dealEndTime, setDealEndTime, allProducts, setAllProducts, api }) => {

  const router = useRouter();
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

  // Fetcher
  const [dealCounter, setDealCounter] = useState(0)
  const { data: dealData, error: dealError, isLoading: dealLoading } = useSWR(api, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
    dedupingInterval: 1000 * 60 * 60 * 24 * 365
  })

  if (dealError && dealCounter < 3) {
    setTimeout(() => {
      setDealCounter(retryCount + 1)
      mutate();
    }, 1000)
  }

  useEffect(() => {
    if (dealData) {
      setAllProducts(dealData.products)
      setDealEndTime(dealData.dealOfMonthTiming.datetime);
    }
  }, [dealData])

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

  const [isSharePopup, setIsSharePopup] = useState(null);
  const [selectedUid, setSelectedUid] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState()
  const handleShareProduct = (items) => {
    setIsSharePopup(items.uid)
    setSelectedProduct(items)
    setSelectedUid(items.uid);
  }

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
            <p>{days}d: {hours}h: {minutes}m: {seconds} S</p>
          </div>
          <h3 className='mobile-view-deal-of-the-day-product-count'>{productCount} Products</h3>
        </div>
        <div className='slider-main-container'>

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
            <SwiperSlider
              slidesData={allProducts?.length > 0 && getPublishedProducts()}
              renderSlide={(items) => (
                // <div key={items._id} className="blog-cards-container">
                  <DealOfTheDayCard
                    key={items._id}
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
                    handleShareProduct={() => handleShareProduct(items)}
                  />
                // </div>
              )}
              showDots={true}
              showArrows={false}
              spaceBetween={20}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 4 },
              }}
            />
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