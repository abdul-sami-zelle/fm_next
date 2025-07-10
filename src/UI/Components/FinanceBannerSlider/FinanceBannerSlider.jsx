import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import './FinanceBannerSlider.css';
import { url } from "../../../utils/api";
import Image from "next/image";
import SwiperSlider from "@/UI/Sliders/SwiperSlider/SwiperSlider";


function FinanceBannerSlider({ images }) {

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
        <div className="carousel-container">

            <SwiperSlider
                slidesData={images?.desktop}
                renderSlide={(image, index) => (
                    <div className="carousel-slide" key={index}>
                        <Image
                            src={`${url}${image.image_url}`}
                            width={1599}
                            height={218}
                            alt={`slide ${index + 1}`}
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
                {images?.desktop?.map((image, index) => (
                    <div className="carousel-slide" key={index}>
                        <Image
                            src={`${url}${image.image_url}`}
                            width={1599}
                            height={218}
                            alt={`slide ${index + 1}`}
                        />
                    </div>
                ))}
            </Slider> */}
        </div>
    );
}

export default FinanceBannerSlider;