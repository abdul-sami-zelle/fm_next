'use client'

import React, { useEffect, useState } from 'react'
import './WishList.css';
// import {  useNavigate } from 'react-router-dom';
import { useList } from '../../../context/wishListContext/wishListContext';
import ProductCardShimmer from '../../Components/Loaders/productCardShimmer/productCardShimmer';
import star from '../../../Assets/icons/Star 19.png'
import heart from '../../../Assets/icons/heart-vector.png'
import { toast } from 'react-toastify';
import ProductCardTwo from '../../Components/ProductCardTwo/ProductCardTwo';
import QuickView from '../../Components/QuickView/QuickView';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { url } from '@/utils/api';
import SnakBar from '@/Global-Components/SnakeBar/SnakBar';
import Image from 'next/image';


const WishListClient = () => {
  //   const navigate = useNavigate()
  const router = useRouter()
  const {
    wishList,
    addToList,
    removeFromList,
    isInWishList
  } = useList();
  const [loading, setLoading] = useState(true)
  const [quickViewClicked, setQuickView] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState({})
  const [activeGrid, setActiveGrid] = useState('single-col')
  const [selectedGrid, setSelectedGrid] = useState('');
  const maxLength = 50;

  const [wishlistProducts, setWishlistProducts] = useState([])

  const [wishlistMessage, setWishlistMessage] = useState('')
  const [openSnakeBar, setOpenSnakeBar] = useState(false);

  const handleWishListProducts = async () => {
    const wishlistItem = JSON.parse(localStorage.getItem('wishList'));
    const userId = localStorage.getItem('uuid');
    const userToken = localStorage.getItem('userToken');
    const userApi = `${url}/api/v1/web-users/wishlist/${userId}`
    const guestApi = `https://fmapi.myfurnituremecca.com/api/v1/products/get-by-ids`
    let response;
    try {
      setLoading(true);
      if (userToken && userId) {
        response = await axios.get(userApi,
          {
            headers: {
              Authorization: userToken, // Replace with your actual token variable
              'Content-Type': 'application/json', // Optional but good practice
            }
          })
        if (response.status === 200) {
          setWishlistProducts(response.data.wishlist)
          setLoading(false)
        }
      } else {
        response = await axios.post(guestApi, { ids: wishlistItem });
        
        // if(response.status === 200) {
          setWishlistProducts(response.data.products)
        // }
      }
    } catch (error) {
      setLoading(false);
      console.error("UnExpected Server Error", error);
    } finally { setLoading(false) }
  }

  useEffect(() => {
    handleWishListProducts()
  }, [])

  // Simulate data loading
  React.useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  const truncateTitle = (title, maxLength) => {
    if (!title) return '';
    return title?.length > maxLength ? title.slice(0, maxLength) + '...' : title
  };

  const handleQuickViewOpen = (item) => {
    setQuickView(true);
    setQuickViewProduct(item)

  }

  const handleQuickViewClose = () => { setQuickView(false) }
  const handleProductClick = (item) => {
    router.push(`/product/${item.slug}`)
  };

  const handleWishList = async (item) => {

    const userId = localStorage.getItem('uuid');
    const userToken = localStorage.getItem('userToken');
    setOpenSnakeBar(true)
    if (isInWishList(item._id)) {
      removeFromList(item._id);
      setWishlistMessage('Removed from wish list')

    } else {
      addToList(item._id)
      setWishlistMessage('added to wish list')
    }

    if (userId && userToken) {
      const api = `${url}/api/v1/web-users/wishlist/${userId}`;

      try {
        const response = await axios.put(api, { productId: item._id }, {
          headers: {
            Authorization: userToken,
            'Content-Type': 'application/json',
          }
        });
      } catch (error) {
        console.error("UnExpected Server Error", error);
      }
    }
  }

  const handleCloseSnakeBar = () => {
    setOpenSnakeBar(false)
  }

  const handleActiveGrid = (grid) => {
    setActiveGrid(grid)
    setSelectedGrid(grid)
  }

  return (
    <div className='wish-list-main-container'>

      <div className='wish-list-heading-container'>
        <h3 className='wish-list-main-heading'>Favorite Products</h3>

        <div className='mobile-view-wishlist-card-grid-select'>
          <div className={`mobile-view-wishlist-card-grid-single-col ${activeGrid === 'single-col' ? 'grid-active' : ''}`} onClick={() => handleActiveGrid('single-col')}></div>
          <div className='mobile-view-wishlist-card-grid-dual-col' onClick={() => handleActiveGrid('dual-col')}>
            <div className={`mobile-view-wishlist-card-grid-dual-col-inner ${activeGrid !== 'single-col' ? 'active-dual-col' : ''}`}></div>
            <div className={`mobile-view-wishlist-card-grid-dual-col-inner ${activeGrid !== 'single-col' ? 'active-dual-col' : ''}`}></div>
          </div>
        </div>

      </div>

      <div className={`${wishlistProducts?.length === 0 ? 'wish-listed-empty-products' : 'wish-listed-products'} `}>

        {loading ? (
          Array.from({ length: 4 }).map((_, index) => <ProductCardShimmer key={index} />)
        ) : wishlistProducts?.length === 0 ? (
          <div className='empty-wishlist'>
            <Image src={'/icons/wishlist.svg'} width={60} height={60} alt='no items' />
            <h3>No items in your wishlist</h3>
          </div>
        ) : (
          wishlistProducts.map((item, index) => {
            return (
              <ProductCardTwo
                key={index}
                slug={item.slug}
                singleProductData={item}
                maxWidthAccordingToComp={"100%"}
                tagIcon={item.productTag ? item.productTag : heart}
                tagClass={item.productTag ? 'tag-img' : 'heart-icon'}
                mainImage={`${item?.image?.image_url}`}
                productCardContainerClass="product-card"
                ProductSku={item.sku}
                tags={item.tags}
                ProductTitle={truncateTitle(item.name, maxLength)}

                reviewCount={item.reviewCount}
                lowPriceAddvertisement={item.lowPriceAddvertisement}
                priceTag={item.regular_price}
                sale_price={item.sale_price}
                financingAdd={item.financingAdd}
                learnMore={item.learnMore}
                mainIndex={index}
                deliveryTime={item.deliveryTime}
                stock={item.manage_stock}
                attributes={item.attributes}
                handleCardClick={() => handleProductClick(item)}
                handleQuickView={() => handleQuickViewOpen(item)}
                handleWishListclick={() => handleWishList(item)}
              />
            );
          })
        )}
      </div>

      <div className={`wishlist-mobile-cards ${selectedGrid === 'single-col' ? 'single-col' : 'two-col'}`}>
        {wishlistProducts && wishlistProducts?.length > 0 ? (
          wishlistProducts.map((item, index) => {
            return <ProductCardTwo
              key={index}
              slug={item.slug}
              singleProductData={item}
              maxWidthAccordingToComp={"100%"}
              // justWidth={'100%'}
              tagIcon={item.productTag ? item.productTag : heart}
              tagClass={item.productTag ? 'tag-img' : 'heart-icon'}
              mainImage={`${item.image.image_url}`}
              productCardContainerClass="product-card"
              ProductSku={item.sku}
              tags={item.tags}
              ProductTitle={truncateTitle(item.name, maxLength)}

              reviewCount={item.reviewCount}
              lowPriceAddvertisement={item.lowPriceAddvertisement}
              priceTag={item.regular_price}
              sale_price={item.sale_price}
              financingAdd={item.financingAdd}
              learnMore={item.learnMore}
              mainIndex={index}
              deliveryTime={item.deliveryTime}
              stock={item.manage_stock}
              attributes={item.attributes}
              handleCardClick={() => handleProductClick(item)}
              handleQuickView={() => handleQuickViewOpen(item)}
              handleWishListclick={() => handleWishList(item)}
            />
          })
        ) : (
          Array.from({ length: 4 }).map((_, index) => (
            <ProductCardShimmer key={index} />
          ))
        )}
      </div>
      <QuickView
        setQuickViewProduct={quickViewProduct}
        quickViewShow={quickViewClicked}
        quickViewClose={handleQuickViewClose}
      />

      <SnakBar
        message={wishlistMessage}
        openSnakeBarProp={openSnakeBar}
        setOpenSnakeBar={setOpenSnakeBar}
        onClick={handleCloseSnakeBar}
      />
    </div>
  )
}

export default WishListClient
