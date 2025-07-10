import React from 'react'
import './MobileFinancingSlider.css'
// import Slider from 'react-slick';
import { url } from '../../../utils/api';
import Image from 'next/image';
import SwiperSlider from '@/UI/Sliders/SwiperSlider/SwiperSlider';

const MobileFinancingSlider = ({ images }) => {
    

    // const settings = {
    //     dots: false, 
    //     infinite: true,
    //     speed: 500, 
    //     slidesToShow: 1, 
    //     slidesToScroll: 1, 
    //     autoplay: true, 
    //     autoplaySpeed: 3000, 
    //     draggable: true, 
    //     pauseOnHover: false, 
    //     arrows: false, 
    // };

    return (
        <div className="mobile-carousel-container">
            <SwiperSlider
                slidesData={images?.mobile}
                renderSlide={(image, index) => (
                    <div className="carousel-slide" key={index}>
                        <Image
                            src={`${url}${image.image_url}`}
                            alt={`slide ${index + 1}`}
                            width={480}
                            height={220}
                        />
                    </div>
                )}
                showDots={false}
                showArrows={false}
                spaceBetween={20}
                autoplay={true}
                loop={true}
                delayTime={3000}
                slidesPerView={1}
            />
            {/* <Slider {...settings}>
                {images?.mobile?.map((image, index) => (
                    <div className="carousel-slide" key={index}>
                        <img
                            src={`${url}${image.image_url}`}
                            alt={`slide ${index + 1}`}
                        />
                    </div>
                ))}
            </Slider> */}
        </div>
    )
}

export default MobileFinancingSlider
