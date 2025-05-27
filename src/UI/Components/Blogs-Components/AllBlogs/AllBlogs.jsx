import React, {useState} from 'react';
import './AllBlogs.css';
import BlogCard from '../BlogCard/BlogCard';
import BlogCardShimmer from '../../Loaders/blogCardShimmer/BlogCardShimmer';
import { url } from '../../../../utils/api';
import { useRouter } from 'next/navigation';

const AllBlogs = ({blogData}) => {

  // States and Variables
  const router = useRouter();

  // Functions
  const handleNavigate = (item) => {
    router.push(`/single-blog/${item.slug}`, {state:  item});
  }


  return (
    <div className='blog-page-blog-cards-main-container'>
      {blogData && blogData.length >= 0 ? (
        blogData.slice(0, 9).map((item, index) => (
        <div key={index} className='blog-cards-col'>
          <BlogCard
            singleBlog={item} 
            blogMainImage={`${url}${item.image.image_url}`}
            ind={index}
            blogCategory={item.category.name}
            blogTitle={item.title}
            blogPostDate={item.publishedDate}
            navigateToSinglePage={() => handleNavigate(item)}
          />
        </div>  
      ))
      ) : (
        Array.from({ length: 9 }).map((_, index) => (
            <BlogCardShimmer />
          ))
      )
    }
    </div>
  )
}

export default AllBlogs
