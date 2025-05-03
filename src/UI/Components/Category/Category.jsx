import React, {useState} from 'react'
import './Category.css';
import Breadcrumb from '../../../Global-Components/BreadCrumb/BreadCrumb';
import CategoryShimmer from '../Loaders/Category/categoryShimmer';
import { url } from '../../../utils/api';
import Link from 'next/link';
import Image from 'next/image';

const Category = ({ title, categoryData, handleNavigate, categorySlug }) => {
 const [isloaded,setIsLoaded] = useState(false);

  return (

    <div className='category-main-container'>
      <div className="category-bread-crumb-and-title">
        <Breadcrumb />
        <h3 className='category-heading'>{title}</h3>
      </div>
      <div className='category-cards-container'>
        {categoryData && categoryData.length > 0 ? (
          categoryData.map((item, index) => (
           <React.Fragment key={index}>
              <Link href={categorySlug !== undefined ? `/${categorySlug}/${item.slug}` : `/${item.slug}` } state={item}>
            <Image
              key={item.image}
              src={url + item.image}
              width={280}
              height={90}
              alt='img'
              effect='blur'
              onLoad={()=>{setIsLoaded(true)}}
            />
            </Link>
           </React.Fragment>
          ))
        ) : (
          Array.from({ length: 12 }).map((_, index) => (
            <CategoryShimmer key={index}/>
          ))
        )}
      </div>

      <div className='mobile-category-cards-container'>
        {categoryData && categoryData.length > 0 ? (
          categoryData.map((item, index) => (
           <React.Fragment key={index}>
            <img
              key={item.image}
              onClick={() => handleNavigate(item.slug, item)}
              src={url + item.image2}
              alt='img'
              effect='blur'
              onLoad={()=>{setIsLoaded(true)}}
            />
           </React.Fragment>
          ))
        ) : (
          Array.from({ length: 12 }).map((_, index) => (
            <CategoryShimmer key={index} />
          ))
        )}
      </div>
    </div>
  )
}

export default Category