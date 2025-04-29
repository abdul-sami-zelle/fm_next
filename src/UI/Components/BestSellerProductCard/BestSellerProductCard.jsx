import React from 'react'
import './BestSellerProductCard.css';
import { VscHeartFilled } from "react-icons/vsc";
import { useList } from '../../../context/wishListContext/wishListContext';
import RatingReview from '../starRating/starRating';
import { formatedPrice,  url } from '../../../utils/api';
import Link from 'next/link';

const BestSellerProductCard = (
    { 
        productMainImage, 
        handleWishListClicked, 
        productData, 
        productName, 
        oldPrice, 
        newPrice, 
    }) => {
    
    // States and Variables
    const {isInWishList} = useList()

    // Functions
    const maxLength = 40;
    

    

    

  return (
    <Link 
        className='category-product-card' 
        href={{pathname: `/product/${productData.slug}`, state: productData}}
    >
        <div className='category-product-image'>
            <img src={`${url}${productMainImage}`} alt='product' effect='blur' />
        </div>
        <div className='category-containt-section'>
            <div className='category-product-rating-and-name'>
                <div className='category-product-name'>
                    <h3>{productName}</h3>
                </div>
            </div>
            <div className='best-seller-rating-and-review'>
                <RatingReview rating={productData.rating} disabled={true} size={"12px"} />
                <p>(200)</p>
            </div>
           
            <div className='category-product-price-and-heart'>
                <div className='category-product-price'>
                    {productData.sale_price === '' ? <p>{formatedPrice(newPrice)}</p> : <del>{formatedPrice(oldPrice)}</del>}
                    <p>{formatedPrice(newPrice)}</p>  
                </div>
                {isInWishList(productData.uid) ? <VscHeartFilled size={25} style={{color: 'var(--primary-color)'}} onClick={(e) => {e.stopPropagation(); handleWishListClicked(productData)}} /> : <img src={'/Assets/icons/like.png'} alt='heart' className='hide-on-mobile' onClick={(e) => {e.stopPropagation(); handleWishListClicked(productData)}} />}
                
            </div>
        </div>
    </Link>
  )
}

export default BestSellerProductCard
