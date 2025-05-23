'use client'

// export default Categories
import React, { use, useEffect, useState } from 'react'
import './Categories.css';
import Category from '@/UI/Components/Category/Category';
import LatestModulerBanner from '@/UI/Components/LatestModuler/LatestModulerBanner';
import CategoriesGetScop from '@/UI/Components/CategoriesGetScop/CategoriesGetScop';
import BestSeller from '@/UI/Components/BestSeller/BestSeller';
import { url } from '@/utils/api';
import { useSEOContext } from '@/context/SEOcontext/SEOcontext';
import { useLPContentContext } from '@/context/LPContentContext/LPContentContext';
import DealOfTheDay from '@/UI/Components/DealOfTheDay/DealOfTheDay';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import DynamicSeo from '@/SEO/DynamicSEO/DynamicSeo';

const Categories = ({ params }) => {


  const {category} = use(params);

  const navigate = useRouter();
  const location = usePathname();
  const [loading, setLoading] = useState(false);
  const { setTitle, setDescription, setImage } = useSEOContext();
  const [contentImages, setContentImages] = useState([]);
  const [error, setError] = useState(null);


  const {
    financingBanners,
    getFinanceBannerImagesFromApi,
    categoryPageData,
    setCategoryPageData,
    categoryData,
    setCategoryData,
    bestSelling,
    setBestSelling,
    paragraph,
    allProducts,
    setAllProducts,
    dealEndTime,
    setDealEndTime,
    setParagraph
  } = useLPContentContext();


  const getPageData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/api/v1/sub-category/get/${category}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }// Data to send
      });
      const result = await response.json();

      setCategoryPageData(result.sub_categories);
      setBestSelling(result.bestSelling);
      setParagraph(result.content);
      setContentImages(result.content_images);
    } catch (error) {
      setError(error.message);
      setLoading(false)
    } finally {
      setLoading(false);
    }
  };

  const getCategoryData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/api/v1/productCategory/get?slug=${category}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }// Data to send
      });
      const result = await response.json();
      console.log("CAtegory PAge Data", result)
      setCategoryData(result.categories[0])

      setTitle(result.categories[0].meta.title);
      setDescription(result.categories[0].meta.description);
      setImage(url + result.categories[0].meta.og_image);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPageData();
    getCategoryData();
  }, [category]);

  useEffect(() => {
    getPageData();
    getCategoryData();
  }, [])

  const handleNavigate = (slug, item) => {
    navigate.push(`/${category}/${item.slug}`, { state: item });
  };

  console.log("banner main image", `https://fmapi.myfurnituremecca.com${categoryData?.bannerImage}`)


  return (
    <>

      <DynamicSeo
        title={categoryData?.meta?.title}
        description={categoryData?.meta?.description}
        // image={`https://fmapi.myfurnituremecca.com${categoryData?.bannerImage}`}
        image={'https://fmapi.myfurnituremecca.com/uploads/media/category/1738138618905_261_Living-Room-Desktop-Banner.webp'}
      />

      <LatestModulerBanner
        customWidth={false}
        showBanners={false}
        mainImgShow={true}
        mobileMainImage={location.state ? location.state?.bannerImage2 : categoryData?.bannerImage2}
        mainImage={url + (location.state ? location.state?.bannerImage : categoryData?.bannerImage)}
      />

      <Category title={location.state ? location.state?.name : categoryData?.name} categorySlug={category} categoryData={categoryPageData} handleNavigate={handleNavigate} />
      {bestSelling && (<BestSeller categoryData={bestSelling} />)}
      {allProducts && (
        <DealOfTheDay
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          dealEndTime={dealEndTime}
          categorySlug={category}
          setDealEndTime={setDealEndTime}
          api={`/api/v1/products/get-deal-of-month-products?limit=10&slug=${category}`}
        />
      )}



      <CategoriesGetScop text={paragraph} contentImages={contentImages} isTrue={true} />

    </>
  )
}

export default Categories