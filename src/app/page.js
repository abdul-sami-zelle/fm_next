'use client'

import React, { useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css';


// components
import Category from '@/UI/Components/Category/Category';
import ProductSlider from '@/UI/Components/ProductSlider/ProductSlider';
import GetTheScop from '@/UI/Components/GetTheScop/GetTheScop';
import Sliderr from '@/Global-Components/Slider/Slider';
import BlogSlider from '@/UI/Components/BlogSlider/BlogSlider';
import NearStorePopUp from '@/UI/Components/NearStorePopUp/NearStorePopUp';
import BestSellerSlider from '@/UI/Components/BestSellerSlider/BestSellerSlider';
import InstaGallery from '@/UI/Components/InstaGallery/InstaGallery';
import FinanceBannerSlider from '@/UI/Components/FinanceBannerSlider/FinanceBannerSlider';
import Comparision from '@/UI/Components/Comparision/Comparision';
import DealOfTheDay from '@/UI/Components/DealOfTheDay/DealOfTheDay';
import TrendingNow from '@/UI/Components/TrendingNow/TrendingNow';
import FurnitureForBudget from '@/UI/Components/FurnitureForBudget/FurnitureForBudget';
import MobileFinancingSlider from '@/UI/Components/FinanceBannerSlider/MobileFinancingSlider';
import FinanceBanner2 from '@/UI/Components/FinanceBannerSlider/FinanceBanner2';
import InstaTwoImageGallery from '@/UI/Components/InstaTwoImageGallery/InstaTwoImageGallery';
import { useLPContentContext } from '@/context/LPContentContext/LPContentContext';
import LandingPageFinancing from '@/UI/Components/LandingPageFinancingBanners/LandingPageFinancing';
import { useBlog } from '@/context/BlogsContext/blogsContext';
import { useRouter } from 'next/navigation';
import { url } from '@/utils/api';
import SnakBar from '@/Global-Components/SnakeBar/SnakBar';

const Home = () => {


  const { 
    landingPageCategories,
    landingPageFOEB,
    content2,
    featuredProducts,
    slides,
    trendingNow,
    financingBanners,
    allProducts,
    setAllProducts,
    dealEndTime,
    setDealEndTime,
    bestSellerProducts,
    setBestSellerProducts,
    bestSellerNav1,
    setBestSellerNav1,
  } = useLPContentContext();

  const { blogs } = useBlog()

  const router = useRouter();
  const handleNavigate = (slug, item) => {
    const queryString = new URLSearchParams(item).toString();
    router.push(`/${slug}${queryString}`);
  };

  const [showSnakeBar, setShowSnakeBar] = useState(false);
    const [snakeBarMessage, setSnakeBarMessage] = useState();

    const handleCloseSnakeBar = () => {
      setShowSnakeBar(false)
    }

  return (
    <div className='home-page-main-container'>
      <NearStorePopUp />
      <Sliderr images={slides ? slides : []} />
      <FinanceBannerSlider images={financingBanners} />
      <MobileFinancingSlider images={financingBanners} />
      <Category title={'Shop by Category'} categoryData={landingPageCategories} handleNavigate={handleNavigate} />

      <LandingPageFinancing />
      <TrendingNow data={trendingNow ? trendingNow : null} />

      <BestSellerSlider
        allProducts={bestSellerProducts}
        setAllProducts={setBestSellerProducts}
        bestSellerNav1={bestSellerNav1}
        setBestSellerNav1={setBestSellerNav1}
        setShowSnakeBar={setShowSnakeBar}
        setSnakeBarMessage={setSnakeBarMessage}
      />

      {content2?.section_2 && (
        <FinanceBanner2
          heading={content2.section_2?.heading}
          image={content2.section_2?.image}
          mobileImage={content2.section_2?.mobile_image}
        />
      )}

      {content2?.section_1 && (
        <Comparision
          heading={content2.section_1.heading}
          image={content2.section_1.image}
          mobileImage={content2.section_1.mobile_image}
        />
      )} 

      {featuredProducts &&
        (<ProductSlider cardData={featuredProducts} />)
      }
      <DealOfTheDay
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        dealEndTime={dealEndTime}
        setDealEndTime={setDealEndTime}
        api={`${url}/api/v1/products/get-deal-of-month-products?limit=10`}
      />
      {landingPageFOEB && (
        <FurnitureForBudget budgetCardData={landingPageFOEB} />
      )}

      {blogs?.length > 0 && <BlogSlider />}

      <GetTheScop 
        setShowSnakeBar={setShowSnakeBar}
        setSnakeBarMessage={setSnakeBarMessage}
      />
      

      <InstaGallery />
      <InstaTwoImageGallery />

      <SnakBar
        message={snakeBarMessage}
        openSnakeBarProp={showSnakeBar}
        setOpenSnakeBar={setShowSnakeBar}
        onClick={handleCloseSnakeBar}
      />
      
    </div>
  )
}

export default Home