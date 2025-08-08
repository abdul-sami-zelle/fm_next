import React, { useEffect, useRef, useState } from 'react';
import './BlogHead.css';
import { useBlog } from '../../../../context/BlogsContext/blogsContext';

const BlogHead = ({ blogCategories }) => {
  const {
    activeCategory,
    setActiveCategory,
    isBlogCatLoading,
    fetchBlogs,
    currentPage,
    
  } = useBlog();

  const [sliderStyle, setSliderStyle] = useState({ width: '0px', left: '0px' });
  const categoryRefs = useRef([]);

  useEffect(() => {
    if (categoryRefs.current[activeCategory]) {
      const selectedCategory = categoryRefs.current[activeCategory];
      setSliderStyle({
        width: `${selectedCategory.offsetWidth}px`,
        left: `${selectedCategory.offsetLeft}px`,
      });
    }
  }, [activeCategory, blogCategories]);


  const handleSelectedCategory = (index) => {
    setActiveCategory(index);
  };


  useEffect(() => {
      fetchBlogs(blogCategories?.[activeCategory]?._id, currentPage);
  }, [activeCategory,]);

  return (
    <>
      <div className='blog-head-main-container'>
        {isBlogCatLoading
          ? [...Array(5)].map((_, index) => (
              <div key={index} className='blog-head-category-shimmer shimmer'></div>
            ))
          : blogCategories.map((item, index) => (
              <p
                key={index}
                ref={(el) => (categoryRefs.current[index] = el)}
                className={`blog-head-category-type ${
                  activeCategory === index ? 'active-category' : ''
                }`}
                onClick={() => handleSelectedCategory(index)}
              >
                {item.name}
              </p>
            ))}
        {!isBlogCatLoading && <div className='bg-slider' style={sliderStyle} />}
      </div>

      <div className='mobile-view-blog-head-main-container'>
        {isBlogCatLoading
          ? [...Array(5)].map((_, index) => (
              <div key={index} className='mobile-blog-category-shimmer shimmer'></div>
            ))
          : blogCategories.slice(0, 6).map((item, index) => (
              <p 
                ref={(el) => (categoryRefs.current[index] = el)}
                key={index} className={`mobile-view-blog-head-category-type ${activeCategory === index ? 'active-blog-category' : ''}`}
                onClick={() => handleSelectedCategory(index)}
              >
                {item.name}
              </p>
            ))}
      </div>
    </>
  );
};

export default BlogHead;
