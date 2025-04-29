import React from 'react'
import './TrandingBlogs.css'
import { url } from '../../../../utils/api'
import {useNavigate } from 'react-router-dom'

const TrandingBlogs = ({blogs}) => {
    const navigate = useNavigate();
    const navigateToSingleBlog = (item) => {
        navigate(`/single-blog/${item.slug}`, {state:  item});
    }

    return (
        <div className='tranding-blogs-main-section'>
            <h3>Trending</h3>
            <div className='tranding-blogs-cards'>
                {blogs?.map((item, index) => (
                    <div className='tranding-single-blog-card' onClick={() => navigateToSingleBlog(item)}>
                        <img src={`${url}${item.image.image_url}`} alt='imm' className='tranding-blog-man-image' />
                        <div className='tranding-blog-content'>
                            <h3 className='tranding-blog-name'>{item.title}</h3>
                            <p className='tranding-blog-post-date'>{item.publishedDate}</p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default TrandingBlogs
