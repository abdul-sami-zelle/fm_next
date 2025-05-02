'use client'

import React, { useState, useEffect } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css';

// components
import Category from '@/UI/Components/Category/Category';
// import ShipBanner from '../../Components/ShipBanner/ShipBanner';
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

const Home = () => {
  const { postData,
    data,
    landingPageCategories,
    landingPageFOEB,
    content2,
    featuredProducts,
    slides,
    getHomeSliderImages,
    getLandingPageContent2,
    getFeaturedProducts,
    trendingNow,
    getTrendingProductsData,
    financingBanners,
    getFinanceBannerImagesFromApi,
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

  useEffect(() => {
    if (!slides.length) {
      getHomeSliderImages();
    }
    if (!data) {
      postData();
    }
    if (Object.keys(content2).length === 0) {
      getLandingPageContent2();
    }
    if (!featuredProducts.length) {
      getFeaturedProducts();
    }
    if (!trendingNow) {
      getTrendingProductsData();
    }
    if (!financingBanners?.length) {
      getFinanceBannerImagesFromApi();
    }
  }, []);

  const router = useRouter();
  const handleNavigate = (slug, item) => {
    const queryString = new URLSearchParams(item).toString();
    router.push(`/${slug}${queryString}`);
  };

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
        api={`/api/v1/products/get-deal-of-month-products?limit=10`}
      />
      {landingPageFOEB && (
        <FurnitureForBudget budgetCardData={landingPageFOEB} />
      )}

      <GetTheScop />
      {blogs?.length > 0 && <BlogSlider />}

      <InstaGallery />
      <InstaTwoImageGallery />
    </div>
  )
}

export default Home