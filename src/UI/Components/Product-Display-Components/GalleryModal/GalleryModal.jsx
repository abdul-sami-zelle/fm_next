import React, { useEffect, useRef, useState } from 'react';
import './GalleryModal.css';

import { RxCross2 } from "react-icons/rx";
import { url } from '../../../../utils/api';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const GalleryModal = ({
  dimensionModal,
  handleCloseDimensionModal,
  productData,
  variationData,
  handleThumbnailClick,
  thumbActiveIndex,
  activeIndex,
  clickedType,
  setActiveIndex,
  galleryModalWidth
}) => {

  console.log("clocked type info", clickedType)
  const swiperRef = useRef();

  const hasDimensionImage = productData?.dimension_image?.image_url?.trim();

  const updatedVariationImages = hasDimensionImage
    ? [
      ...(variationData?.images || []),
      {
        alt_text: "",
        description: "",
        image_url: productData?.dimension_image?.image_url,
        link_url: "",
        title: "",
      },
    ]
    : variationData?.images || [];

    const variationImagesWithoutDimenssion = [...(variationData?.images || [])]
    const simpleImagesWithoutDimenssion = [...(productData?.images || [])]

  console.log("updated variation array", updatedVariationImages)

  const updatedSimpleImages = hasDimensionImage
    ? [{ image_url: productData?.dimension_image?.image_url }, ...productData?.images]
    : productData?.images;

    console.log("updated simple images array", updatedSimpleImages)

  const images = clickedType === 'dimenssion-show' ? productData?.type === 'variable' ? updatedVariationImages : updatedSimpleImages : productData?.type === 'variable' ? variationImagesWithoutDimenssion : simpleImagesWithoutDimenssion;

  const onThumbnailClick = (index) => {
    swiperRef.current?.slideTo(index);
  };


  useEffect(() => {
    if (dimensionModal && swiperRef.current) {
      swiperRef.current.slideTo(0);         // Reset Swiper to first slide
      setActiveIndex(0);                    // Reset state
      handleThumbnailClick(0);              // Highlight first thumbnail
    }
  }, [dimensionModal]);

  


  function ImageZoomOnHover({ src, zoom = 3 }) {
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setPosition({ x, y });
    };

    return (
      <div
        className="dimension-modal-slider-single-image-container"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{ overflow: "hidden", position: "relative" }}
      >
        <img
          src={src}
          alt="zoom"
          className="dimension-modal-slider-image"
          style={{
            transformOrigin: `${position.x}% ${position.y}%`,
            transform: isHovering ? `scale(${zoom})` : "scale(1)",
            transition: isHovering ? "transform 0.1s ease" : "transform 0.3s ease",
            pointerEvents: "none",
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    );
  }

  return (
    <div className={`dimension-modal-main-container ${dimensionModal ? 'show-dimension-modal' : ''}`}>
      <div className={`dimension-modal-inner-container ${galleryModalWidth ? 'show-modal-full-width' : ''}`}>
        <button className='dimension-modal-close-button' onClick={handleCloseDimensionModal}>
          <RxCross2 size={25} color='var(--secondary-color)' />
        </button>

        {/* Thumbnail Section */}
        <div className='dimension-left-thumbnail-section'>
          <div className='dimension-modal-products-thumb-heading'>
            <p>Product Photos ({images?.length})</p>
          </div>
          <div className='thumb-images-main-container'>
            {images?.map((item, index) => (
              <div
                key={index}
                className={`dimension-modal-thumb-single-image ${index === thumbActiveIndex ? 'dimension-modal-active-thumb' : ''}`}
                onClick={() => {
                  onThumbnailClick(index); // this slides Swiper
                  handleThumbnailClick(index); // this updates thumbActiveIndex
                }}
              >
                <img src={`${url}${item.image_url}`} alt='thumb' className='dimension-modal-thumbnail-single-image' />
              </div>
            ))}
          </div>
        </div>

        {/* Swiper Slider Section */}
        <div className='dimension-modal-slider'>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
              handleThumbnailClick(swiper.activeIndex); // keeps thumb in sync
            }}
            pagination={{ dynamicBullets: true, clickable: true, dynamicMainBullets: 5, }}
            modules={[Pagination]}
            className='dimension-modal-main-slider-section'
          >
            {images?.map((img, index) => (
              <SwiperSlide key={index}>
                <div className='dimension-modal-slider-single-image-container'>
                  {galleryModalWidth ? (
                    <ImageZoomOnHover src={`${url}${img.image_url}`} zoom={3} />
                  ) : (
                    <img
                      src={`${url}${img.image_url}`}
                      alt='slide'
                      className='dimension-modal-slider-image'
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;

