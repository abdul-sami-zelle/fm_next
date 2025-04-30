import React from 'react'
import './MobileFinancingSlider.css'
import Slider from 'react-slick';
import { url } from '../../../utils/api';

const MobileFinancingSlider = ({ images }) => {
    

    const settings = {
        dots: false, 
        infinite: true,
        speed: 500, 
        slidesToShow: 1, 
        slidesToScroll: 1, 
        autoplay: true, 
        autoplaySpeed: 3000, 
        draggable: true, 
        pauseOnHover: false, 
        arrows: false, 
    };

    return (
        <div className="mobile-carousel-container">
            <Slider {...settings}>
                {images?.mobile?.map((image, index) => (
                    <div className="carousel-slide" key={index}>
                        <img
                            src={`${url}${image.image_url}`}
                            alt={`slide ${index + 1}`}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default MobileFinancingSlider
