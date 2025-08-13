import React from 'react';
import './BlogSlider.css';
import BlogCard from './BlogCard';
import { useBlog } from '../../../context/BlogsContext/blogsContext';
import BlogCardShimmer from './BlogCardShimmer/BlogCardShimmer';
import { useRouter } from 'next/navigation';
import SwiperSlider from '@/UI/Sliders/SwiperSlider/SwiperSlider';

const BlogSlider = () => {

  const router = useRouter()
  const {
    blogs,
  } = useBlog()


  const handleNavigateToSingleBlog = (item) => {
    router.push(`/single-blog/${item.slug}`, { state: item })
  }

  return (
    <div className='blogs-main-container'>
      <h3>Exciting Blogs Created By <span>Furniture Mecca</span></h3>
      {/* <p className='blogs-main-para'>
        Captivating narratives by Jasons Furniture Outlet, where each blog tells a unique tale of style,
        comfort, and functionality. Discover the enchanting stories behind every furnishing at The Furniture Depots,
        turning your home into a haven filled with both charm and character.
      </p> */}
      <div className='blogs-slider-main-container'>
        {blogs && blogs?.length > 0 ? (
          <SwiperSlider
            slidesData={blogs}
            renderSlide={(item) => (
              <BlogCard
                key={item._id}
                navigateToSingleBlog={() => handleNavigateToSingleBlog(item)}
                img={item?.image?.image_url}
                category={item?.category?.name}
                title={item?.title}
                createdBy={item?.author}
                readTime={item.readTime}
                totalViews={item.totalViews}
                comments="4 comments"
                date={26}
                month="FEB"
                start="this is short description section of blogs"
              />
            )}
            showDots={true}
            showArrows={false}
            spaceBetween={0}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: {slidesPerView: 3},
              1024: { slidesPerView: 4 },
            }}
          />
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