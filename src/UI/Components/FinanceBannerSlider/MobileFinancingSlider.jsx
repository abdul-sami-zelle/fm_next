import React from 'react'
import './MobileFinancingSlider.css'
import { url } from '../../../utils/api';
import Image from 'next/image';
import SwiperSlider from '@/UI/Sliders/SwiperSlider/SwiperSlider';

const MobileFinancingSlider = ({ images }) => {

    return (
        <div className="mobile-carousel-container">
            <SwiperSlider
                slidesData={images?.mobile}
                renderSlide={(image, index) => (
                    <div className="mobile-carousel-slide" key={index}>
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
                autoplay={false}
                loop={true}
                delayTime={3000}
                slidesPerView={1}
            />
        </div>
    )
}

export default MobileFinancingSlider
