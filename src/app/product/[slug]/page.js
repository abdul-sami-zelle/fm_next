'use client'

import React, { use, useEffect, useRef, useState } from 'react'
import './ProductDisplay.css';
import ProductDetailSticky from '@/UI/Components/Product-Display-Components/ProductDetailSticky/ProductDetailSticky';
import ProductStickyTabBar from '@/UI/Components/Product-Display-Components/ProductStickyTabBar/ProductStickyTabBar';
import ProductDescriptionTab from '@/UI/Components/Product-Display-Components/ProductTabs/ProductDescriptionTab/ProductDescriptionTab';
import ProductDetailTab from '@/UI/Components/Product-Display-Components/ProductTabs/ProductDetailTab/ProductDetailTab';
import ProductRecommendationTab from '@/UI/Components/Product-Display-Components/ProductTabs/ProductRecommendationTab/ProductRecommendationTab';
import ProductReviewTab from '@/UI/Components/Product-Display-Components/ProductTabs/ProductReviewTab/ProductReviewTab';

import { url } from '../../../utils/api';
import { useCart } from '@/context/cartContext/cartContext';
import GalleryModal from '@/UI/Components/Product-Display-Components/GalleryModal/GalleryModal';
import { useProductPage } from '@/context/ProductPageContext/productPageContext';
import DesignYourRoom from '@/UI/Components/DesignYourRoom/DesignYourRoom';
import useSWR from 'swr';
import { fetcher } from '@/utils/Fetcher';
import DesignYourRoomIndv from '@/UI/Components/DesignRoomInd/DesignYourRoomIndv';
import DesignRoomMain from '@/UI/Modals/DesignYourRoomModal/DesignYourRoom';

const ProductDisplay = ({ params }) => {

  const { slug } = use(params);
  const { singleProductData, selectedVariationData } = useProductPage();
  const [product, setProduct] = useState(singleProductData || null);
  const [showDesignRoomModal, setShowDwsignRoomModal] = useState(false);
  const [productDetails, setProductDetails] = useState({})
  const [isSticky, setIsSticky] = useState(false)
  const [singleProductCount, setSingleProductCount] = useState(0);
  const [variationData, setVariationData] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isProtectionCheck, setIsProtectionCheck] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [zoomIn, setZoomIn] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0); // For main slider image
  const [thumbActiveIndex, setThumbActiveIndex] = useState(0); // For active thumbnail
  const thumbnailContainerRef = useRef(null); // To control the vertical scroll
  const [dimensionModal, setDimensionModal] = useState(false)
  const [clickedType, setClickedType] = useState('')
  const [galleryModalWidth, setGalleryModalWidth] = useState(false);
  const [steperIndex, setSteperIndex] = useState(0);
  const [recomandedProducts, setRecomandedProducts] = useState([])
  const [recomandationCount, setRecomandationCount] = useState(0)

  const showDRM = () => {
    setShowDwsignRoomModal(true)
  }

  const closeDRM = () => {
    setShowDwsignRoomModal(false)
  }

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

  const singleProductApi = slug ? `${url}/api/v1/products/get-by-slug/${slug}` : null;
  const { data: singleProductContent, error: singleProductError, isLoading: singleProductLoading } = useSWR(singleProductApi, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 1000 * 60 * 60 * 24 * 365
  })

  if (singleProductError && singleProductCount < 3) {
    setTimeout(() => {
      setSingleProductCount(singleProductCount + 1);
    }, 1000)
  }

  useEffect(() => {
    if (singleProductContent) {
      setProduct(singleProductContent.products[0])
    }
  }, [singleProductContent])

  const sectionRefs = {
    DesignYourRoom: useRef(null),
    Description: useRef(null),
    Details: useRef(null),
    Recommendations: useRef(null),
    Reviews: useRef(null),
  };

  // Add To Cart Functionality
  const {
    decreamentQuantity,
    increamentQuantity,
    removeFromCart,
    addToCart0,
    cartProducts,
    cartSection,
    setCartSection,
    isCartLoading,
  } = useCart();

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

    setCartSection(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleAddToCartProduct = (product) => {
    setCartSection(true);
  }

  const handleCartClose = () => {
    setCartSection(false)
    setQuantity(1)

  }


  const handleOpenModal = (place, type) => {
    setZoomIn(false);
    setClickedType(type === 'dimenssion-show' ? type : 'dimenssion-hide')
    if (place === 'image-clicked') {
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
        thumbnailContainerRef.current.scrollTo({
          left: thumbnailElement.offsetLeft - (thumbnailContainerRef.current.clientWidth / 2) + (thumbnailElement.clientWidth / 2),
          behavior: 'smooth',
        });
      } else {
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
  };

  useEffect(() => {
    if (dimensionModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [dimensionModal])

  const recomandationApi = product._id ? `https://recommendations.myfurnituremecca.com/recommended-products?page=1&_id=${product?._id}` : null;
  const { data: recomandationData, error: recomandationError, isLoading: recomandationLoading } = useSWR(recomandationApi, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 1000 * 60 * 60 * 24 * 365
  })

  if (recomandationError && recomandationCount < 3) {
    setTimeout(() => {
      setRecomandationCount(recomandationCount + 1);
    }, 1000)
  }

  useEffect(() => {
    if (recomandationData) {
      setRecomandedProducts(recomandationData.recommendations)
    }
  }, [recomandationData])

  useEffect(() => {
    if (showDesignRoomModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [showDesignRoomModal])

  useEffect(() => {
    if (dimensionModal) {
      handleThumbnailClick(activeIndex); // sync thumbnail to current slide index
    }
  }, [dimensionModal]);

  const stockCheck = product?.type === 'variable' ?
    selectedVariationData?.manage_stock?.stock_status === 'inStock'
    && selectedVariationData?.manage_stock?.quantity === 0
    || selectedVariationData?.manage_stock?.stock_status === 'outStock'
    || selectedVariationData?.manage_stock?.stock_status === 'outOfStock'
    : product?.manage_stock?.stock_status === 'inStock'
    && product?.manage_stock?.quantity === 0
    || product?.manage_stock?.stock_status === 'outStock'
    || product?.manage_stock?.stock_status === 'outOfStock';

  const isDesignRoomActive = product?.dyrc?.active === 1;

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
          stockCheck={stockCheck}
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
          showDesignRoomModal={showDesignRoomModal}
          showDRM={showDRM}
          dimensionModal={dimensionModal}
          setClickedType={setClickedType}
          setProductDetails={setProductDetails}
          zoomIn={zoomIn}
          setZoomIn={setZoomIn}
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
          steperIndex={steperIndex}
          setSteperIndex={setSteperIndex}
          stockCheck={stockCheck}
        />

        <div className='sticky-section-steper-main-container'>


          {isDesignRoomActive && steperIndex === 0 ? (
            // Design Your Room at index 0
            <div className="design-room-transition show-design-room-view">
              <DesignYourRoomIndv
                designRef={sectionRefs.DesignYourRoom}
                openFN={showDRM}
                image={
                  product?.images?.length > 1
                    ? product?.images[1]?.image_url
                    : product?.image?.image_url
                }
              />
            </div>
          ) : (!isDesignRoomActive && steperIndex === 0) || (isDesignRoomActive && steperIndex === 1) ? (
            // Description becomes index 0 if DesignRoom is inactive, otherwise index 1
            <div className="steper-description-tranition show-description-transition">
              <ProductDescriptionTab
                descriptionRef={sectionRefs.Description}
                productData={product}
                addMarginTop={isSticky}
              />
            </div>
          ) : (
            // Details becomes index 1 if DesignRoom is inactive, otherwise index 2
            <div className="steper-details-tranition show-details-transition">
              <ProductDetailTab
                detailsRef={sectionRefs.Details}
                productData={product}
                productDetails={productDetails}
              />
            </div>
          )}



          {/* {steperIndex === 0 ? (
            <div className={`design-room-transition ${steperIndex === 0 ? 'show-design-room-view' : ''}`}>
              {product && <DesignYourRoomIndv designRef={sectionRefs.DesignYourRoom} openFN={showDRM} image={product?.images?.length > 1 ? product?.images[1]?.image_url : product?.image?.image_url} />}
            </div>
          ) : steperIndex === 1 ? (
            <div className={`steper-description-tranition ${steperIndex === 1 ? 'show-description-transition' : ''}`}>
              <ProductDescriptionTab
                descriptionRef={sectionRefs.Description}
                productData={product}
                addMarginTop={isSticky}
              />
            </div>
          ) : (
            <div className={`steper-details-tranition ${steperIndex === 2 ? 'show-details-transition' : ''}`}>
              <ProductDetailTab
                detailsRef={sectionRefs.Details}
                productData={product}
                productDetails={productDetails}
              />
            </div>
          )} */}
        </div>

        {/* {product && <DesignYourRoomIndv designRef={sectionRefs.DesignYourRoom} openFN={showDRM} image={product?.images?.length > 1 ? product?.images[1]?.image_url : product?.image?.image_url} />} */}

        {/* <ProductDescriptionTab
          descriptionRef={sectionRefs.Description}
          productData={product}
          addMarginTop={isSticky}
        /> */}

        {/* <ProductDetailTab
          detailsRef={sectionRefs.Details}
          productData={product}
          productDetails={productDetails}
        /> */}
        <ProductRecommendationTab
          recommendationRef={sectionRefs.Recommendations}
          product={product}
        />

        <DesignYourRoom data={recomandedProducts} firstChild={product} />
      </div>

      <ProductReviewTab
        reviewRef={sectionRefs.Reviews}
        productData={product}
        params={params}
      />

      {showDesignRoomModal && <div className='design_room_main_modal'>
        {/* <DesignRoomMain closeFn={closeDRM} product={product} /> */}
        <DesignRoomMain closeFn={closeDRM} product={product} data={
          {
            _id: product?._id,
            product_uid: product?.parent === 0 ? product?.uid : product?.parent,
            variation_uid: product?.parent === 0 ? 0 : product?.uid,
            name: product?.name,
            sku: product?.sku,
            quantity: 1,
            is_protected: 0,
            slug: product?.slug,
            type: product?.type,
            // cat:'Sectional',
            // cat:'Recliner-Sectional',
            // cat:'Recliner',
            cat: 'LoveSeat',
            parent: product?.parent,
            isVariable: product?.parent === 0 ? 0 : 1,
            attributes: product?.attribute,
            regular_price: product?.regular_price,
            sale_price: product?.sale_price,
            image: product?.image?.image_url,
            // png_image: "/furniture/Bartram-6-PC-Reclining-Sectional.png",
            // png_image:"/sectionals/Mason-2PC-Sectional.png" //sectional
            // png_image:'/Sofas&LoveSeat/Untitled-3.png' //Recliner
            // png_image:'/Sofas&LoveSeat/Untitled-4.png'
            png_image: product?.dyrc?.image,
          }
        } />
      </div>}

      <GalleryModal
        dimensionModal={dimensionModal}
        setDimensionModal={setDimensionModal}
        handleCloseDimensionModal={handleCloseDimensionModal}
        productData={product}
        clickedType={clickedType}
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