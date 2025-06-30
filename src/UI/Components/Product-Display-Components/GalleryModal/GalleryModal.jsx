// import React, { useRef, useState } from 'react'
// import './GalleryModal.css'

// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { RxCross2 } from "react-icons/rx";

// import { url } from '../../../../utils/api'
// import MagnifyImage from '../MagnifyImage/MagnifyImage';

// const GalleryModal = (
//   {
//     dimensionModal,
//     handleCloseDimensionModal,
//     productData,
//     variationData,
//     handleNextImage,
//     handlePrevImage,
//     activeIndex,
//     handleThumbnailClick,
//     thumbActiveIndex,
//     name,
//     currentIndex,
//     handleDotClick,
//     setCurrentIndex,
//     galleryModalWidth
//   }) => {

//   const hasDimensionImage = productData?.dimension_image?.image_url?.trim();

//   // Prepare images array with dimension_image at the start if available
//   const updatedVariationImages = hasDimensionImage
//     ? [
//       ...(variationData?.images ? variationData.images : []),
//       {
//         alt_text: "",
//         description: "",
//         image_url: productData?.dimension_image?.image_url,
//         link_url: "",
//         title: "",
//       },
//     ]
//     : variationData?.images || [];

//   const updatedSimpleImages = hasDimensionImage
//     ? [{ image_url: productData?.dimension_image?.image_url }, ...productData?.images]
//     : productData?.images;



//   const [dragStartX, setDragStartX] = useState(0);
//   const [dragging, setDragging] = useState(false);
//   const sliderRef = useRef(null);





//   // Handle Drag Start
//   const handleDragStart = (e) => {
//     const clientX = e.touches ? e.touches[0].clientX : e.clientX; // Support touch events
//     setDragStartX(clientX);
//     setDragging(true);
//   };

//   // Handle Drag Move
//   const handleDragMove = (e) => {
//     if (!dragging) return;

//     const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     const dragDistance = clientX - dragStartX;

//     if (dragDistance > 50 && activeIndex > 0) {
//       // Move to previous image if not at the first image
//       handlePrevImage();
//       setDragging(false);
//     } else if (dragDistance < -50 && activeIndex < (productData?.type === 'variable' ? updatedVariationImages.length - 1 : updatedSimpleImages.length - 1)) {
//       // Move to next image if not at the last image
//       handleNextImage();
//       setDragging(false);
//     }
//   };

//   // Handle Drag End
//   const handleDragEnd = () => {
//     setDragging(false);
//   };

//   const getStartIndex = (current, total) => {
//     if (total <= 3) return 0;
//     if (current === 0) return 0;
//     if (current === total - 1) return total - 3;
//     return current - 1;
//   };

//   const getEndIndex = (current, total) => {
//     if (total <= 3) return total;
//     if (current === 0) return 3;
//     if (current === total - 1) return total;
//     return current + 2;
//   };


//   return (
//     <div 
//       className={`dimension-modal-main-container ${dimensionModal ?  'show-dimension-modal' : ''}`}
//     >
//       <div className={`dimension-modal-inner-container ${galleryModalWidth ? 'show-modal-full-width' : ''}`}>
//         <button className='dimension-modal-close-button' onClick={handleCloseDimensionModal}>
//           <RxCross2 size={25} color='var(--secondary-color)' />
//         </button>
//         <div className='dimension-left-thumbnail-section'>
//           <div className='dimension-modal-products-thumb-heading'>
//             <p>Product Photos {(updatedSimpleImages?.length)}</p>
//             {/* <MdKeyboardArrowDown size={20} color='var(--secondary-color)' className='dimension-modal-arrow-down ' /> */}
//           </div>
//           <div className='thumb-images-main-container'>
//             {productData?.type === 'variable' ?
//               (updatedVariationImages || []).map((item, index) => (
//                 <div key={index} className={`dimension-modal-thumb-single-image ${index === thumbActiveIndex ? 'dimension-modal-active-thumb' : ''} `} onClick={() => handleThumbnailClick(index)}>
//                   <img src={`${url}${item.image_url}`} alt='slid' className='dimension-modal-thumbnail-single-image' />
//                 </div>
//               ))
//               :
//               (updatedSimpleImages || []).map((item, index) => (
//                 <div key={index} className={`dimension-modal-thumb-single-image ${index === thumbActiveIndex ? 'dimension-modal-active-thumb' : ''} `} onClick={() => handleThumbnailClick(index)}>
//                   <img src={`${url}${item.image_url}`} alt='slid' className='dimension-modal-thumbnail-single-image' />
//                 </div>
//               ))}
//           </div>
//         </div>
//         <div className='dimension-modal-slider'>
//           <div
//             className='dimension-modal-main-slider-section'
//             ref={sliderRef}
//             onMouseDown={handleDragStart}
//             onMouseMove={handleDragMove}
//             onMouseUp={handleDragEnd}
//             onMouseLeave={handleDragEnd}
//             onTouchStart={handleDragStart}  // Added for touch support
//             onTouchMove={handleDragMove}    // Added for touch support
//             onTouchEnd={handleDragEnd}      // Added for touch support
//             style={{
//               cursor: 'pointer',
//               userSelect: 'none'
//             }}
//           >
//             <div
//               className='dimension-modal-main-slider-images'
//               style={{
//                 transform: `translateX(-${activeIndex * 100}%)`,
//               }}
//             >
//               {productData?.type === 'variable' ?
//                 (updatedVariationImages || []).map((slideItem, slideIndex) => (
//                   <div key={slideIndex} className='dimension-modal-slider-single-image-container'>
//                   {galleryModalWidth ? (
//                       <MagnifyImage 
//                         src={`${url}${slideItem.image_url}`}
//                         width={'100%'}
//                         height={'100%'}
//                         zoom={4}
//                       />
//                     ) : (
//                       <img
//                       src={`${url}${slideItem.image_url}`}
//                       alt='slide'
//                       className='dimension-modal-slider-image'
//                     />

//                   )}
//                   </div>
//                 )) :
//                 (updatedSimpleImages || []).map((simpleSlideItem, simpleSlideIndex) => (
//                   <div key={simpleSlideIndex} className='dimension-modal-slider-single-image-container'>
//                     {galleryModalWidth ? (
//                       <MagnifyImage 
//                         src={`${url}${simpleSlideItem.image_url}`}
//                         width={'100%'}
//                         height={'100%'}
//                         zoom={4}
//                       />
//                     ) : (
//                       <img
//                       src={`${url}${simpleSlideItem.image_url}`}
//                       alt='slide'
//                       className='dimension-modal-slider-image'
//                     />
//                     )}

//                   </div>
//                 ))}
//             </div>
//             <div className='slider-dots-and-view-all-button'>
//               {productData?.type === 'variable' ? <div style={{
//                 paddingLeft: "0"
//               }} className="pagination-dots">
//                 {updatedVariationImages
//                   ?.map((_, i) => i)
//                   // .slice(getStartIndex(currentIndex, updatedVariationImages.length), getEndIndex(currentIndex, updatedVariationImages.length))
//                   .map((index) => (
//                     <span
//                       key={index}
//                       className={`dot ${currentIndex === index ? "active" : ""}`}
//                       onClick={() => handleDotClick(index)}
//                     />
//                   ))}
//               </div> :
//                 <div style={{
//                   paddingLeft: "0"
//                 }} className="pagination-dots">
//                   {updatedSimpleImages
//                     ?.map((_, i) => i)
//                     // .slice(getStartIndex(currentIndex, updatedSimpleImages.length), getEndIndex(currentIndex, updatedSimpleImages.length))
//                     .map((index) => (
//                       <span
//                         key={index}
//                         className={`dot ${currentIndex === index ? "active" : ""}`}
//                         onClick={() => handleDotClick(index)}
//                       />
//                     ))}
//                 </div>
//               }
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default GalleryModal


import React, { useRef, useState } from 'react';
import './GalleryModal.css';

import { RxCross2 } from "react-icons/rx";
import { url } from '../../../../utils/api';
import MagnifyImage from '../MagnifyImage/MagnifyImage';

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
  setActiveIndex,
  galleryModalWidth
}) => {
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

  const updatedSimpleImages = hasDimensionImage
    ? [{ image_url: productData?.dimension_image?.image_url }, ...productData?.images]
    : productData?.images;

  const images = productData?.type === 'variable' ? updatedVariationImages : updatedSimpleImages;

  const onThumbnailClick = (index) => {
    swiperRef.current?.slideTo(index);
  };

  // function ImageZoomOnHover({ src, zoom = 3 }) {
  //   const [position, setPosition] = useState({ x: 50, y: 50 });
  //   const [isHovering, setIsHovering] = useState(false);

  //   const handleMouseMove = (e) => {
  //     const rect = e.currentTarget.getBoundingClientRect();
  //     const x = ((e.clientX - rect.left) / rect.width) * 100;
  //     const y = ((e.clientY - rect.top) / rect.height) * 100;
  //     setPosition({ x, y });
  //   };

  //   return (
  //     <div
  //       className="dimension-modal-slider-single-image-container"
  //       onMouseMove={handleMouseMove}
  //       onMouseEnter={() => setIsHovering(true)}
  //       onMouseLeave={() => setIsHovering(false)}
  //       style={{ overflow: "hidden", position: "relative" }}
  //     >
  //       <img
  //         src={src}
  //         alt="zoom"
  //         className="dimension-modal-slider-image"
  //         style={{
  //           transformOrigin: `${position.x}% ${position.y}%`,
  //           transform: `isHovering ? scale(${zoom}) : "scale(1)"`,
  //           transition: isHovering ? "transform 0.1s ease" : "transform 0.3s ease",
  //           pointerEvents: "none",
  //           width: "100%",
  //           height: "100%",
  //           objectFit: "contain",
  //         }}
  //       />
  //     </div>
  //   );
  // }

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
            pagination={{ dynamicBullets: true, clickable: true }}
            modules={[Pagination]}
            className='dimension-modal-main-slider-section'
          >
            {images?.map((img, index) => (
              <SwiperSlide key={index}>
                <div className='dimension-modal-slider-single-image-container'>
                  {galleryModalWidth ? (
                    <ImageZoomOnHover src={`${url}${img.image_url}`} zoom={3} />
                    // <MagnifyImage
                    //   src={`${url}${img.image_url}`}
                    //   width="100%"
                    //   height="100%"
                    //   zoom={4}
                    // />
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

