import React, { useEffect } from 'react';
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

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className={`blog-slider-arrow blog-slider-arrow-left ${className}`} style={{top: '45% !important'}} >
      {/* <img src={leftArrow} alt='arrow' /> */}
      <IoChevronBack />
    </div>
  )
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className={`blog-slider-arrow blog-slider-arrow-right ${className}`} >
      
      <IoChevronForward />
    </div>
  )
}


const BlogSlider = () => {

  const router = useRouter()
  const { 
    blogs,
    fetchBlogs,
   } = useBlog()

   useEffect(() => {
    fetchBlogs(null)
   }, [])



  const maxLength = 50;

  const handleNavigateToSingleBlog = (item) => {
    router.push(`/single-blog/${item.id}`, { state: item })
  }



  

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePrevArrow to="prev" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


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
          <Slider {...settings}>
            {blogs && blogs.map((item, index) => (
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
            ))}
          </Slider>
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
