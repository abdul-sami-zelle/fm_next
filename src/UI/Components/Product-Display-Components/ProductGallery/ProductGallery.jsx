import React, { useState, useRef } from 'react';
import './ProductGallery.css';
import { IoIosArrowUp, IoIosArrowDown, IoMdArrowDropleft } from "react-icons/io";
import { url } from '../../../../utils/api';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Controller } from 'swiper/modules';

const ProductGallery = ({
    productData,
    selectedVariationData,
    handleMouseDown,
    position,
    handleMouseMove,
    handleMouseUp,
    zoomIn,
    setZoomIn,
    dragging,
    handleGalleryModal,
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [thumbActiveIndex, setThumbActiveIndex] = useState(0);
    const thumbnailContainerRef = useRef(null);
    const swiperRef = useRef(null);

    const images = productData.type === 'variable'
        ? selectedVariationData?.images || []
        : productData?.images || [];

    const handleThumbnailClick = (index) => {
        swiperRef.current?.slideTo(index);
    };

    const scrollThumbnailIntoView = (index) => {
        if (!thumbnailContainerRef.current) return;
        const thumbnail = thumbnailContainerRef.current.children[index];
        if (!thumbnail) return;

        const scrollOptions = {
            behavior: 'smooth',
        };

        if (window.innerWidth < 480) {
            scrollOptions.left =
                thumbnail.offsetLeft -
                thumbnailContainerRef.current.clientWidth / 2 +
                thumbnail.clientWidth / 2;
        } else {
            scrollOptions.top =
                thumbnail.offsetTop -
                thumbnailContainerRef.current.clientHeight / 2 +
                thumbnail.clientHeight / 2;
        }

        thumbnailContainerRef.current.scrollTo(scrollOptions);
    };

    const handleScroll = (direction) => {
        const length = images.length;
        const newIndex =
            direction === 'up'
                ? (thumbActiveIndex === 0 ? length - 1 : thumbActiveIndex - 1)
                : (thumbActiveIndex === length - 1 ? 0 : thumbActiveIndex + 1);

        swiperRef.current?.slideTo(newIndex);
    };

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragDistance, setDragDistance] = useState(0);

    const handleDragStart = (e) => {
        setIsDragging(true);
        setStartX(e.type.includes("mouse") ? e.pageX : e.touches[0].pageX);
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;

        const index = activeIndex;
        const currentX = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;
        const distance = currentX - startX;

        if ((index === 0 && distance > 0) || (index === images.length - 1 && distance < 0)) {
            setDragDistance(0);
            return;
        }

        setDragDistance(distance);
    };

    const handleDragEnd = () => {
        setIsDragging(false);

        if (Math.abs(dragDistance) > 50) {
            if (dragDistance > 0 && activeIndex > 0) {
                swiperRef.current?.slideTo(activeIndex - 1);
            } else if (dragDistance < 0 && activeIndex < images.length - 1) {
                swiperRef.current?.slideTo(activeIndex + 1);
            }
        }

        setDragDistance(0);
    };



    // function ImageZoomOnHover({ src, zoom = 3 }) {
    //     const [position, setPosition] = useState({ x: 50, y: 50 });
    //     const [isHovering, setIsHovering] = useState(false);

    //     const handleMouseMove = (e) => {
    //       const rect = e.currentTarget.getBoundingClientRect();
    //       const x = ((e.clientX - rect.left) / rect.width) * 100;
    //       const y = ((e.clientY - rect.top) / rect.height) * 100;
    //       setPosition({ x, y });
    //     };

    //     return (
    //       <div
    //         className="dimension-modal-slider-single-image-container"
    //         onMouseMove={handleMouseMove}
    //         onMouseEnter={() => setIsHovering(true)}
    //         onMouseLeave={() => setIsHovering(false)}
    //         style={{ overflow: "hidden", position: "relative" }}
    //       >
    //         <img
    //           src={src}
    //           alt="zoom"
    //           className="dimension-modal-slider-image"
    //           style={{
    //             transformOrigin: `${position.x}% ${position.y}%`,
    //             transform: isHovering ? `scale(${zoom})` : "scale(1)",
    //             transition: isHovering ? "transform 0.1s ease" : "transform 0.3s ease",
    //             pointerEvents: "none",
    //             width: "100%",
    //             height: "100%",
    //             objectFit: "contain",
    //           }}
    //         />
    //       </div>
    //     );
    //   }



    // function ImageZoomOnHover({ src, zoom = 3, zoomActive = false }) {
    //     const [position, setPosition] = useState({ x: 50, y: 50 });
    //     const [isHovering, setIsHovering] = useState(false);
    //     const [hasMoved, setHasMoved] = useState(false);

    //     const handleMouseMove = (e) => {
    //         const rect = e.currentTarget.getBoundingClientRect();
    //         const x = ((e.clientX - rect.left) / rect.width) * 100;
    //         const y = ((e.clientY - rect.top) / rect.height) * 100;
    //         setPosition({ x, y });
    //         setHasMoved(true);
    //     };

    //     const handleMouseEnter = () => {
    //         setIsHovering(true);
    //         if (!hasMoved) {
    //             setPosition({ x: 50, y: 50 }); // reset to center if not moved
    //         }
    //     };

    //     const handleMouseLeave = () => {
    //         setIsHovering(false);
    //         setHasMoved(false);
    //     };

    //     const isZoomed = zoomActive;

    //     return (
    //         <div
    //             className="dimension-modal-slider-single-image-container"
    //             onMouseEnter={handleMouseEnter}
    //             onMouseMove={isZoomed ? handleMouseMove : undefined}
    //             onMouseLeave={handleMouseLeave}
    //             style={{ overflow: "hidden", position: "relative" }}
    //         >
    //             <img
    //                 src={src}
    //                 alt="zoom"
    //                 className="dimension-modal-slider-image"
    //                 style={{
    //                     transformOrigin: `${position.x}% ${position.y}%`,
    //                     transform: isZoomed ? `scale(${zoom})` : "scale(1)",
    //                     transition: "transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
    //                     pointerEvents: "none",
    //                     width: "100%",
    //                     height: "100%",
    //                     objectFit: "contain",
    //                 }}
    //             />
    //         </div>
    //     );
    // }



    function ImageZoomOnHover({ src, zoom = 2.5, zoomActive = false }) {
        const [offset, setOffset] = useState({ x: 0, y: 0 });
        const [isHovering, setIsHovering] = useState(false);

        const handleMouseMove = (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 100; // -50 to +50
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 100;

            setOffset({ x, y });
        };

        const handleMouseEnter = () => {
            setIsHovering(true);
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
            setOffset({ x: 0, y: 0 }); // Reset to center when leaving
        };

        const isZoomed = zoomActive;

        return (
            <div
                className="dimension-modal-slider-single-image-container"
                onMouseEnter={handleMouseEnter}
                onMouseMove={isZoomed ? handleMouseMove : undefined}
                onMouseLeave={handleMouseLeave}
                style={{ overflow: "hidden", position: "relative" }}
            >
                <img
                    src={src}
                    alt="zoom"
                    className="dimension-modal-slider-image"
                    style={{
                        transform: isZoomed
                            ? `scale(${zoom}) translate(${offset.x / zoom}%, ${offset.y / zoom}%)`
                            : "scale(1)",
                        transition: "transform 0.4s ease",
                        transformOrigin: "center center", // fixed center origin
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
        <div className='product-gallery-main-container'>
            {/* Thumbnail Section */}
            <div className='product-gallery-thumbnail-section'>
                <IoIosArrowUp
                    size={25}
                    color='#000'
                    className={`product-thumbnail-arrow product-thumbnail-arrow-up ${thumbActiveIndex === 0 ? 'disabled' : ''}`}
                    onClick={thumbActiveIndex === 0 ? null : () => handleScroll('up')}
                />

                <div className='product-thumbnail-images' ref={thumbnailContainerRef}>
                    {images.map((thumbItem, index) => (
                        <div
                            key={index}
                            className={`product-thumbnail-single-image-div ${index === thumbActiveIndex ? 'active-thumb' : ''}`}
                            onClick={() => handleThumbnailClick(index)}
                        >
                            <IoMdArrowDropleft
                                size={30}
                                color='var(--tertiary-color)'
                                className={`arrow-pointer ${index === thumbActiveIndex ? 'show-pointer-arrow' : ''}`}
                            />
                            <img src={`${url}${thumbItem.image_url}`} alt="thumb" className="product-thumbnail-single-image" />
                        </div>
                    ))}
                </div>

                <IoIosArrowDown
                    size={25}
                    color='#000'
                    className={`product-thumbnail-arrow product-thumbnail-arrow-down ${thumbActiveIndex === images.length - 1 ? 'disabled' : ''}`}
                    onClick={thumbActiveIndex === images.length - 1 ? null : () => handleScroll('down')}
                />

                <button onClick={handleGalleryModal} className='product-gallery-view-all-button'>
                    View All
                </button>
            </div>

            {/* Main Slider Section */}
            <div
                className='product-gallery-main-slider-section'
            // onMouseDown={handleDragStart}
            // onMouseMove={handleDragMove}
            // onMouseUp={handleDragEnd}
            // onMouseLeave={handleDragEnd}
            // onTouchStart={handleDragStart}
            // onTouchMove={handleDragMove}
            // onTouchEnd={handleDragEnd}
            >
                <div className='product-gallery-main-slider-images'>
                    <Swiper
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        onSlideChange={(swiper) => {
                            const index = swiper.activeIndex;
                            setActiveIndex(index);
                            setThumbActiveIndex(index);
                            scrollThumbnailIntoView(index);
                            setZoomIn(false);
                        }}
                        pagination={{
                            dynamicBullets: true,
                            clickable: true,
                        }}
                        modules={[Pagination, Controller]}
                        className="mySwiper"
                    >
                        {images.map((imgItem, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className='product-gallery-main-slider-single-image-container'
                                    onMouseMove={handleMouseMove}
                                    onMouseUp={handleMouseUp}
                                    onMouseLeave={handleMouseUp}
                                    onClick={() => handleGalleryModal('image-clicked')}
                                >

                                    {zoomIn ? (
                                        <ImageZoomOnHover src={`${url}${imgItem.image_url}`} zoom={2.5} zoomActive={true} />
                                    ) : (
                                        <img
                                            src={`${url}${imgItem.image_url}`}
                                            alt="Main"
                                            className="product-gallery-main-slider-image"
                                            style={{ width: '100%' }}
                                        />
                                    )}

                                    {/* <img
                                        src={`${url}${imgItem.image_url}`}
                                        alt='Main slide'
                                        className={`product-gallery-main-slider-image ${zoomIn ? 'scale-slider-image' : ''}`}
                                        style={{
                                            cursor: zoomIn ? (dragging ? "grabbing" : "grab") : "pointer",
                                            width: '100%',
                                        }}
                                        // onDragStart={(e) => e.preventDefault()}
                                        onMouseDown={zoomIn ? handleDragStart : null}
                                        onMouseMove={zoomIn ? handleMouseMove : null}
                                        onMouseUp={zoomIn ? handleMouseUp : null}
                                        onMouseLeave={zoomIn ? handleMouseUp : null}
                                        onTouchStart={zoomIn ? handleDragStart : null}
                                        onTouchMove={zoomIn ? handleMouseMove : null}
                                        onTouchEnd={zoomIn ? handleMouseUp : null}
                                        onDragStart={(e) => e.preventDefault()}
                                    /> */}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default ProductGallery;
