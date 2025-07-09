import React, { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './BlogSlider.css';
import BlogCard from './BlogCard';
import { useBlog } from '../../../context/BlogsContext/blogsContext';
import BlogCardShimmer from './BlogCardShimmer/BlogCardShimmer';
import { IoChevronForward } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className={`blog-slider-arrow blog-slider-arrow-left ${className}`} style={{ top: '45% !important' }} >
      {/* <img src={leftArrow} alt='arrow' /> */}
      <MdKeyboardArrowLeft color='var(--text-gray)' />
    </div>
  )
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className={`blog-slider-arrow blog-slider-arrow-right ${className}`} >

      <MdKeyboardArrowRight color='var(--text-gray)' />
    </div>
  )
}


const BlogSlider = () => {

  const router = useRouter()
  const {
    blogs,
  } = useBlog()


  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dotStartIndex, setDotStartIndex] = useState(0);
  const [currentDotPosition, setCurrentDotPosition] = useState(1);

  const beforeChange = (oldIndex, newIndex) => {
    const groupSize = 5;
    const newStart = Math.floor(newIndex / groupSize) * groupSize;

    setCurrentSlide(newIndex);
    setDotStartIndex(newStart);
    setCurrentDotPosition((newIndex % groupSize) + 1);
  };



  const mobileSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange,

    customPaging: () => <button className="custom-dot" />,

    appendDots: (dots) => {
      const totalDots = dots.length;
      const visibleDots = dots.slice(dotStartIndex, dotStartIndex + 5);

      return (
        <div className="dots-slider-wrapper">
          <div className="dots-slider">
            {visibleDots.map((dot, i) => {
              const actualIndex = dotStartIndex + i;
              const isActive = actualIndex === currentSlide;

              return (
                <div
                  key={actualIndex}
                  className={`dot-wrapper ${isActive ? 'active-dot' : ''}`}
                  onClick={() => {
                    sliderRef.current?.slickGoTo(actualIndex);
                    // setCurrentSlide(actualIndex);

                    const groupSize = 5;
                    const newStart = Math.floor(actualIndex / groupSize) * groupSize;

                    setDotStartIndex(newStart);
                    setCurrentDotPosition((actualIndex % groupSize) + 1);
                  }}
                >
                  <span className={`custom-dot ${isActive ? 'highlighted-dot' : ''}`} />
                </div>
              );
            })}
          </div>
        </div>
      );
    },
  };


  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          ...mobileSettings
        }
      }
    ],
    beforeChange,

    customPaging: () => <button className="custom-dot" />,

    appendDots: (dots) => {
      const totalDots = dots.length;
      const visibleDots = dots.slice(dotStartIndex, dotStartIndex + 5);

      return (
        <div className="dots-slider-wrapper">
          <div className="dots-slider">
            {visibleDots.map((dot, i) => {
              const actualIndex = dotStartIndex + i;
              const isActive = actualIndex === currentSlide;

              return (
                <div
                  key={actualIndex}
                  className={`dot-wrapper ${isActive ? 'active-dot' : ''}`}
                  onClick={() => {
                    sliderRef.current?.slickGoTo(actualIndex);
                    setCurrentSlide(actualIndex);

                    const groupSize = 5;
                    const newStart = Math.floor(actualIndex / groupSize) * groupSize;

                    setDotStartIndex(newStart);
                    setCurrentDotPosition((actualIndex % groupSize) + 1);
                  }}
                >
                  <span className={`custom-dot ${isActive ? 'highlighted-dot' : ''}`} />
                </div>
              );
            })}
          </div>
        </div>
      );
    },
  };

  const maxLength = 50;

  const handleNavigateToSingleBlog = (item) => {
    router.push(`/single-blog/${item.slug}`, { state: item })
  }



  return (
    <div className='blogs-main-container'>
      <h3>Exciting Blogs Created By <span>Furniture Mecca</span></h3>
      <p className='blogs-main-para'>
        Captivating narratives by Jasons Furniture Outlet, where each blog tells a unique tale of style,
        comfort, and functionality. Discover the enchanting stories behind every furnishing at The Furniture Depots,
        turning your home into a haven filled with both charm and character.
      </p>
      <div className='blogs-slider-main-container'>
        {blogs && blogs?.length > 0 ? (

          <Swiper
            spaceBetween={10}
            pagination={{ clickable: true, dynamicBullets: true, dynamicMainBullets: 5, }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 4,
              },
            }}
            modules={[Pagination]}
            className="best-seller-swiper"
          >
            {blogs && blogs.map((item, index) => (
              <SwiperSlide key={index}>
                <div key={index} className='blog-cards-container'>
                  <BlogCard
                    key={index}
                    navigateToSingleBlog={() => handleNavigateToSingleBlog(item)}
                    img={item?.image?.image_url}
                    category={item?.category?.name}
                    title={item?.title}
                    createdBy={item?.author}
                    comments={'4 comments'}
                    date={26}
                    month={'FEB'}
                    start={'this is short description section of blogs'}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          // <Slider ref={sliderRef} {...settings}>
          //   {blogs && blogs.map((item, index) => (
          //     <div key={index} className='blog-cards-container'>
          //       <BlogCard
          //         key={index}
          //         navigateToSingleBlog={() => handleNavigateToSingleBlog(item)}
          //         img={item?.image?.image_url}
          //         category={item?.category?.name}
          //         title={item?.title}
          //         createdBy={item?.author}
          //         comments={'4 comments'}
          //         date={26}
          //         month={'FEB'}
          //         start={'this is short description section of blogs'}
          //       />
          //     </div>
          //   ))}
          // </Slider>
        ) : (
          <div className='blog-card-shimmer-container'>
            {Array.from({ length: 3 }).map((_, index) => (
              <BlogCardShimmer />
            ))}
          </div>
        )}

      </div>


    </div>
  );
}

export default BlogSlider;
