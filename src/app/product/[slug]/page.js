'use client'

import React, { use, useEffect, useRef, useState } from 'react'
import './ProductDisplay.css';
import ProductDetailSticky from '@/UI/Components/Product-Display-Components/ProductDetailSticky/ProductDetailSticky';
import ProductStickyTabBar from '@/UI/Components/Product-Display-Components/ProductStickyTabBar/ProductStickyTabBar';
import ProductDescriptionTab from '@/UI/Components/Product-Display-Components/ProductTabs/ProductDescriptionTab/ProductDescriptionTab';
import ProductDetailTab from '@/UI/Components/Product-Display-Components/ProductTabs/ProductDetailTab/ProductDetailTab';
import ProductRecommendationTab from '@/UI/Components/Product-Display-Components/ProductTabs/ProductRecommendationTab/ProductRecommendationTab';
import ProductReviewTab from '@/UI/Components/Product-Display-Components/ProductTabs/ProductReviewTab/ProductReviewTab';
// import { useLocation, useParams } from 'react-router-dom';

import axios from 'axios';
import { url } from '../../../utils/api';
import { useCart } from '@/context/cartContext/cartContext';
import Breadcrumb from '@/Global-Components/BreadCrumb/BreadCrumb';
import GalleryModal from '@/UI/Components/Product-Display-Components/GalleryModal/GalleryModal';
import { useProductPage } from '@/context/ProductPageContext/productPageContext';
import { useParams, useSearchParams } from 'next/navigation';

const ProductDisplay = ({params}) => {

  const { slug } = use(params);
  const {singleProductData} = useProductPage();

  const [product, setProduct] = useState(singleProductData || null);

  const [isSticky, setIsSticky] = useState(false)


  const fetchProductBySlug = async (slug) => {
    try {
      const response = await axios.get(`${url}/api/v1/products/get-by-slug/${slug}`);
      const fetchedProduct = response.data.products[0] || {};
      setProduct(fetchedProduct);
    } catch (error) {
      console.error('Error fetching product by slug:', error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setProduct(null); // Reset product state to trigger loading state
      await fetchProductBySlug(slug);
    };
  
    if (slug) {
      fetchProduct();
    }
  }, [slug]);
  


  const sectionRefs = {
    Description: useRef(null),
    Details: useRef(null),
    Recommendations: useRef(null),
    Reviews: useRef(null),
  };

  // Add To Cart Functionality
  const {
    addToCart,
    decreamentQuantity,
    increamentQuantity,
    removeFromCart,
    addToCart0,
    cartProducts,
    cartSection,
    setCartSection,
    isCartLoading
  } = useCart();

  const [variationData, setVariationData] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isProtectionCheck, setIsProtectionCheck] = useState(true)
  const [quantity, setQuantity] = useState(1)

  const decreaseLocalQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  }

  const increaseLocalQuantity = () => {
    setQuantity(quantity + 1);
  }

  const handleQuantityChange = (e) => {
    const { value } = e.target;
    setQuantity(value)
  }

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleAddToCartProduct = (product) => {
    setCartSection(true);
    addToCart(product, quantity, !isProtectionCheck);
  }

  const handleCartClose = () => {
    setCartSection(false)
    setQuantity(1)

  }


  // Gallery Modal

  const {
    selectedVariationData
  } = useProductPage();

   const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0); // For main slider image
  const [thumbActiveIndex, setThumbActiveIndex] = useState(0); // For active thumbnail
  const thumbnailContainerRef = useRef(null); // To control the vertical scroll

  const [dimensionModal, setDimensionModal] = useState(false)


  const handleOpenModal = () => {
    setDimensionModal(true)
  }

  const handleCloseDimensionModal = () => {
    setDimensionModal(false)
    setActiveIndex(0)
    setThumbActiveIndex(0)
    setCurrentIndex(0)
  }

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    setThumbActiveIndex(index);
    setCurrentIndex(index)

    // Prevent page scroll
    if (thumbnailContainerRef.current) {
      const thumbnailElement = thumbnailContainerRef.current.children[index];

      if (window.innerWidth < 480) {
        // Scroll horizontally for mobile view
        thumbnailContainerRef.current.scrollTo({
          left: thumbnailElement.offsetLeft - (thumbnailContainerRef.current.clientWidth / 2) + (thumbnailElement.clientWidth / 2),
          behavior: 'smooth',
        });
      } else {
        // Scroll vertically for larger screens
        thumbnailContainerRef.current.scrollTo({
          top: thumbnailElement.offsetTop - (thumbnailContainerRef.current.clientHeight / 2) + (thumbnailElement.clientHeight / 2),
          behavior: 'smooth',
        });
      }
    }
  };

  const handlePrevImage = () => {
    setActiveIndex((prevIndex) => {
      if (prevIndex === 0) return prevIndex; // Prevent moving before first item

      const newIndex = prevIndex - 1;
      setThumbActiveIndex(newIndex); // Update active thumbnail index
      // setZoomIn(false);
      setCurrentIndex(newIndex)

      // Scroll thumbnail container
      if (thumbnailContainerRef.current) {
        if (window.innerWidth < 480) {
          // Scroll left for mobile screens
          thumbnailContainerRef.current.scrollBy({
            left: -80, // Adjust scroll step based on your layout
            behavior: 'smooth',
          });
        } else {
          // Scroll up for larger screens
          thumbnailContainerRef.current.scrollBy({
            top: -80,
            behavior: 'smooth',
          });
        }
      }

      return newIndex;
    });
  };

  const handleNextImage = () => {
    setActiveIndex((prevIndex) => {
      const length =
        product.type === 'variable'
          ? selectedVariationData?.images?.length + 1
          : product?.images?.length;

      if (prevIndex === length) return prevIndex; // Prevent moving after last item

      const newIndex = prevIndex + 1;
      setThumbActiveIndex(newIndex); // Update active thumbnail index
      setCurrentIndex(newIndex)
      // setZoomIn(false);

      // Scroll thumbnail container
      if (thumbnailContainerRef.current) {
        if (window.innerWidth < 480) {
          // Scroll right for mobile screens
          thumbnailContainerRef.current.scrollBy({
            left: 80, // Adjust scroll step based on your layout
            behavior: 'smooth',
          });
        } else {
          // Scroll down for larger screens
          thumbnailContainerRef.current.scrollBy({
            top: 80,
            behavior: 'smooth',
          });
        }
      }

      return newIndex;
    });
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setActiveIndex(index); // Ensure the main slider image updates
    setThumbActiveIndex(index); // Ensure the thumbnail updates
    // setZoomIn(false);
};

  useEffect(() => {
    if (dimensionModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [dimensionModal])


  return (
    <div>
      <div className='product-display-page-main-container'>
        <Breadcrumb category={product?.categories} />
        <ProductDetailSticky
          productData={product}
          decreaseLocalQuantity={decreaseLocalQuantity}
          quantity={quantity}
          handleQuantityChange={handleQuantityChange}
          increaseLocalQuantity={increaseLocalQuantity}
          isLoading={isLoading}
          handleClick={handleClick}
          addToCart0={addToCart0}
          isProtectionCheck={isProtectionCheck}
          handleAddToCartProduct={handleAddToCartProduct}
          cartProducts={cartProducts}
          cartSection={cartSection}
          variationData={variationData}
          setVariationData={setVariationData}
          handleCartClose={handleCartClose}
          setCartSection={setCartSection}
          removeFromCart={removeFromCart}
          decreamentQuantity={decreamentQuantity}
          increamentQuantity={increamentQuantity}
          isSticky={isSticky}
          handleGalleryModal={handleOpenModal}
          isCartLoading={isCartLoading}
          params={params}
        // parentCategories={parentCategories}
        />

        <ProductStickyTabBar
          sectionRefs={sectionRefs}
          productData={product}
          isSticky={isSticky}
          setIsSticky={setIsSticky}
          variationData={variationData}
          addToCart0={addToCart0}
          handleAddToCartProduct={handleAddToCartProduct}
          isProtectionCheck={isProtectionCheck}
          quantity={quantity}
        />

        <ProductDescriptionTab
          descriptionRef={sectionRefs.Description}
          productData={product}
          addMarginTop={isSticky}
        />

        <ProductDetailTab
          detailsRef={sectionRefs.Details}
          productData={product}
        />
        <ProductRecommendationTab
          recommendationRef={sectionRefs.Recommendations}
          product={product}
        />


        <GalleryModal
          dimensionModal={dimensionModal}
          handleCloseDimensionModal={handleCloseDimensionModal}
          productData={product}
          variationData={selectedVariationData}
          handleNextImage={handleNextImage}
          handlePrevImage={handlePrevImage}
          activeIndex={activeIndex}
          handleThumbnailClick={handleThumbnailClick}
          thumbActiveIndex={thumbActiveIndex}
          currentIndex={currentIndex}
          handleDotClick={handleDotClick}
        />

      </div>
      <ProductReviewTab
        reviewRef={sectionRefs.Reviews}
        product={product}
        params={params}
      />
    </div>
  )
}

export default ProductDisplay