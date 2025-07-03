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
// import { useParams, useSearchParams } from 'next/navigation';
import DesignYourRoom from '@/UI/Components/DesignYourRoom/DesignYourRoom';
import useSWR from 'swr';
import { fetcher } from '@/utils/Fetcher';
import DesignYourRoomIndv from '@/UI/Components/DesignRoomInd/DesignYourRoomIndv';
import DesignRoom from '@/UI/Modals/DesignYourRoomModal/Pages/DesignRoom/DesignRoom';
import DesignRoomMain from '@/UI/Modals/DesignYourRoomModal/DesignYourRoom';

const ProductDisplay = ({ params }) => {

  const { slug } = use(params);
  const { singleProductData } = useProductPage();

  const [product, setProduct] = useState(singleProductData || null);
  const [showDesignRoomModal,setShowDwsignRoomModal] = useState(false);

const showDRM = () =>{
  setShowDwsignRoomModal(true)
}

const closeDRM = () =>{
  setShowDwsignRoomModal(false)
}

  const [productDetails , setProductDetails] = useState({})
  useEffect(() => {
    setProductDetails({
      collection: product?.collectionName ? product?.collectionName : '-',
    color: product?.default_attributes?.find(item => item.type === 'color')?.options[0]?.name,
    brand: product?.brand !== '' ? product?.brand : 'Furniture Mecca',
    category: product?.categories?.find(item => item.is_main === 1)?.name,
    stock: product?.manage_stock?.stock_status?.toLowerCase() === 'instock' ? 'In Stock' : product?.manage_stock?.stock_status?.toLowerCase() === 'backorder' ? 'Back Order' : 'Out Of Stock',
    mpn: product?.mpn,
    gtin: product?.gtin,
    protection: 'Available'
    })
  }, [product])


  const [isSticky, setIsSticky] = useState(false)

  const singleProductApi = slug ? `${url}/api/v1/products/get-by-slug/${slug}` : null;
  const [singleProductCount, setSingleProductCount] = useState(0);

  const {data: singleProductContent, error: singleProductError, isLoading: singleProductLoading} = useSWR(singleProductApi, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 1000 * 60 * 60 * 24 * 365
  })

  if(singleProductError && singleProductCount < 3) {
    setTimeout(() => {
      setSingleProductCount(singleProductCount + 1);
    }, 1000)
  }

  useEffect(() => {
    if(singleProductContent ) {
      setProduct(singleProductContent.products[0])
    }
  }, [singleProductContent])


  // const fetchProductBySlug = async (slug) => {
  //   try {
  //     const response = await axios.get(`${url}/api/v1/products/get-by-slug/${slug}`);
  //     const fetchedProduct = response.data.products[0] || {};
  //     setProduct(fetchedProduct);
  //   } catch (error) {
  //     console.error('Error fetching product by slug:', error);
  //   }
  // };

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     setProduct(null); // Reset product state to trigger loading state
  //     await fetchProductBySlug(slug);
  //   };

  //   if (slug) {
  //     fetchProduct();
  //   }
  // }, [slug]);



  const sectionRefs = {
    DesignYourRoom: useRef(null),
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
    setCartSection(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleAddToCartProduct = (product) => {
    setCartSection(true);
    // addToCart(product, quantity, !isProtectionCheck);
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


  const [galleryModalWidth, setGalleryModalWidth] = useState(false);
  const handleOpenModal = (place) => {
    if(place === 'image-clicked') {
      setGalleryModalWidth(true)
    } else {
      setGalleryModalWidth(false)
    }

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

  const [recomandedProducts, setRecomandedProducts] = useState([])

  const recomandationApi = product ? `https://recommendations.myfurnituremecca.com/recommended-products?page=1&_id=${product?._id}` : null;
  const [recomandationCount, setRecomandationCount] = useState(0)

  const {data: recomandationData, error: recomandationError, isLoading: recomandationLoading} = useSWR(recomandationApi, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 1000 * 60 * 60 * 24 * 365
  })

  if(recomandationError && recomandationCount < 3 ) {
    setTimeout(() => {
      setRecomandationCount(recomandationCount + 1);
    }, 1000)
  }

  useEffect(() => {
    if(recomandationData) {
      setRecomandedProducts(recomandationData.recommendations)
    }
  }, [recomandationData])




  return (
    <div>
      <div className='product-display-page-main-container'>
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
          showDRM={showDRM}
          setProductDetails={setProductDetails}
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

        {product && <DesignYourRoomIndv designRef={sectionRefs.DesignYourRoom} openFN={showDRM} image={product?.images?.length> 1 ? product?.images[1]?.image_url :product?.image?.image_url } />}

        <ProductDescriptionTab
          descriptionRef={sectionRefs.Description}
          productData={product}
          addMarginTop={isSticky}
        />

        <ProductDetailTab
          detailsRef={sectionRefs.Details}
          productData={product}
          productDetails={productDetails}
        />
        <ProductRecommendationTab
          recommendationRef={sectionRefs.Recommendations}
          product={product}
        />




        <DesignYourRoom data={recomandedProducts} firstChild={product} />

       

      </div>




      <ProductReviewTab
        reviewRef={sectionRefs.Reviews}
        product={product}
        params={params}
      />



    { showDesignRoomModal && <div className='design_room_main_modal'>
      <DesignRoomMain closeFn={closeDRM} product={product} />
    </div>}






      <GalleryModal
        dimensionModal={dimensionModal}
        handleCloseDimensionModal={handleCloseDimensionModal}
        productData={product}
        variationData={selectedVariationData}
        handleNextImage={handleNextImage}
        handlePrevImage={handlePrevImage}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        handleThumbnailClick={handleThumbnailClick}
        thumbActiveIndex={thumbActiveIndex}
        currentIndex={currentIndex}
        handleDotClick={handleDotClick}
        galleryModalWidth={galleryModalWidth}
      />


    </div>
  )
}

export default ProductDisplay