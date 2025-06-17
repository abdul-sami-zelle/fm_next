'use client'

import React, { useState, useRef, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import './BestSeller.css';
import { formatedPrice, url } from '../../../utils/api';

// Assets
import arrowLeft from '../../../Assets/icons/arrow-left.png'
import arrowRight from '../../../Assets/icons/arrow-right.png'
import { VscHeartFilled, VscHeart } from "react-icons/vsc";
import { HiOutlineShoppingBag } from "react-icons/hi2";

// Components 
import BestSellerProductCard from '../BestSellerProductCard/BestSellerProductCard';
import BestSellerProductCardShimmer from '../BestSellerProductCard/BestSellerProductCardShimmer';
import { useList } from '../../../context/wishListContext/wishListContext';
import { toast } from 'react-toastify';
import { usePathname, useRouter } from 'next/navigation';
import { useLPContentContext } from '@/context/LPContentContext/LPContentContext';
import useSWR, { mutate } from 'swr';
import { fetcher} from '@/utils/Fetcher';
import Link from 'next/link';
import RatingReview from '../starRating/starRating';

const BestSellerPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className={`best-seller-arrow ${className}`} >
            <img src={arrowLeft} alt='arrow' />
        </div>
    )
}

function BestSellerNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className={`best-seller-arrow ${className}`} >
            <img src={arrowRight} alt='arrow' />
        </div>
    )
}

const BestSeller = () => {

    // States and variables
    const [loading, setLoading] = useState(false);
    const [mainBanner, setMainBanner] = useState();
    const [allProducts, setAllProducts,] = useState([]);
    const [currentSlug, setCurrentSlug] = useState();
    const sliderRef = useRef(null);
    const [activeItem, setActiveItem] = useState(0);
    const router = useRouter()
    // const params = usePathname();
    const pathname = usePathname();

    const { bestSelling, bestSellerNav1,  } = useLPContentContext()

    useEffect(() => {
        setMainBanner(bestSelling.categories[0].image)
        setCurrentSlug(bestSelling.categories[0].slug)
    }, []);

//     useEffect(() => {
//   // Whenever the route changes, revalidate the SWR call
//   if (currentSlug) {
//     const cacheKey = `${url}/api/v1/products/by-category?categorySlug=${currentSlug}&best_selling_product=1&per_page=6`;
//     mutate(cacheKey); // Re-fetch the SWR data
//     console.log(pathname,"here ios path name")
//   }
// }, [pathname]);

 useEffect(() => {
    setMainBanner(bestSelling.categories[0].image)
    setCurrentSlug(bestSelling.categories[0].slug)
    console.log(bestSelling.categories[0].slug)
  }, [bestSelling]);


    // Functions
    // useEffect(() => {
    //     const splitedParam = params.split('/')
    //     const newSlug = splitedParam[1]

    //     if (newSlug) setCurrentSlug(newSlug)
    // }, [])

    const categorySeller = `${url}/api/v1/products/by-category?categorySlug=${currentSlug}&best_selling_product=1&per_page=6`
    const [categorySellerCount, setCategorySellerCount] = useState(0)

    const { data: categorySellerData, error: categorySellerError, isLoading: categorySellerLoading } = useSWR(categorySeller, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        dedupingInterval: 1000 * 60 * 60 * 24 * 365
    })

    if (categorySellerError && categorySellerCount < 3) {
        setTimeout(() => {
            setCategorySellerCount(categorySellerCount + 1)
            mutate();
        }, 1000)
    }

    useEffect(() => {
        if (categorySellerData) {
            setAllProducts(categorySellerData.products);
        }
    }, [categorySellerData])



    // const getBestSellerProducts = async (slug) => {
    //     const splitedParam = params.split('/')
    //     const newSlug = splitedParam[1]
    //     const api = `/api/v1/products/by-category?categorySlug=${newSlug}&best_selling_product=1&per_page=6`
    //     try {
    //         setLoading(true);
    //         const response = await axios.get(`${url}${api}`)
    //         setAllProducts(response.data.products);
    //         setLoading(false)

    //     } catch (error) {
    //         console.error("error geting best seller products", error);
    //         setLoading(false);
    //     }
    // }



    useEffect(() => {
        mutate();
    }, [currentSlug]);

    useEffect(() => {
        if (allProducts?.length === 0) {
            setLoading(false);
        }
    }, [allProducts])

    const handleActiveItem = (index, item) => {
        setActiveItem(index);
        setMainBanner(item?.image)
        setCurrentSlug(item?.slug)
    };

    const handleProductClick = (item) => {
        router.push(`/product/${item.slug}`);
    }

    const itemPerPage = 6
    const maxIndex = Math.ceil(allProducts && allProducts.length / itemPerPage) - 1;
    const [currentIndex, setCurrentIndex] = useState(0)
    const handlePageChange = (index) => {
        setCurrentIndex(index)
    }

    // Mobile view script
    const [mobiIndex, setMobIndex] = useState(0)
    const handleMobileNavClick = (index) => {
        setMobIndex(index);
    }

    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentDotPosition, setCurrentDotPosition] = useState(1);
    // const [bannerLoading, , setBannerLoading] = useState(false);

    const [dotStartIndex, setDotStartIndex] = useState(0);

    const beforeChange = (oldIndex, newIndex) => {
        setCurrentSlide(newIndex);

        const groupSize = 5;

        if (newIndex >= dotStartIndex + groupSize) {
            const newStart = Math.floor(newIndex / groupSize) * groupSize;
            setDotStartIndex(newStart);
            setCurrentDotPosition((newIndex % groupSize) + 1);
        } else if (newIndex < dotStartIndex) {
            const newStart = Math.floor(newIndex / groupSize) * groupSize;
            setDotStartIndex(newStart);
            setCurrentDotPosition((newIndex % groupSize) + 1);
        } else {
            setCurrentDotPosition((newIndex % groupSize) + 1);
        }
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

    const { addToList, isInWishList, removeFromList } = useList()
    const notify = (str) => toast.success(str);
    const notifyRemove = (str) => toast.error(str)
    // const [listed, setListed] = useState(false);
    // const { addSingleProduct } = useSingleProductContext();
    // const { addToCart } = useCart()

    // const handleCardClicked = (item) => {

    //     addSingleProduct(item)
    //     addToCart(item)
    //     router.push(`/product/${item.slug}`)

    // }

    const handleWishlisted = (item) => {
        if (isInWishList(item.uid)) {
            removeFromList(item.uid);
            notifyRemove('Removed from wish list', {
                autoClose: 10000,
                // position: toast.POSITION.BOTTOM_CENTER,
                className: "toast-message",
            })
        } else {
            addToList(item); // Add if not in wishlist
            notify("added to wish list", {
                autoClose: 10000,
            })
        }
    }

    return (
        <>

            <div className={`category-besst-seller-main-container `}>
                
                <div className='category-best-seller-and-banner-container'>

                    <div className='category-best-seller-cards-section'>

                        <div className='category-best-seller-menu'>
                            <h3>Best Seller</h3>
                            {bestSelling ? (
                                <div className='category-best-seller-menu-items'>
                                    {bestSelling.categories.map((item, index) => (
                                        <p key={item._id} className={activeItem === index ? 'active' : ''} onClick={() => handleActiveItem(index, item)}>{item.Heading}</p>
                                    ))}
                                </div>
                            ) : <></>}
                        </div>

                        <div className='products-slider-container'>
                            {!categorySellerLoading ? <div className='best-seller-slider' style={{ transform: `translateX(-${(currentIndex / maxIndex) * 0}%)` }}>
                                {allProducts && allProducts.slice(currentIndex * itemPerPage, (currentIndex + 1) * itemPerPage).map((item, index) => (
                                    <BestSellerProductCard
                                        key={index}
                                        productData={item}
                                        productMainImage={item.image.image_url}
                                        starIcon={item.ratingStars}
                                        reviews={item.reviewCount}
                                        productName={item.name}
                                        oldPrice={item.regular_price}
                                        newPrice={item.sale_price}
                                        handleCardClicked={() => handleProductClick(item)}
                                    />
                                ))}
                            </div> :

                                <div className='best-seller-slider'>


                                    <BestSellerProductCardShimmer width={'330px !important'} />
                                    <BestSellerProductCardShimmer width={'330px !important'} />
                                    <BestSellerProductCardShimmer width={'330px !important'} />
                                    <BestSellerProductCardShimmer width={'330px !important'} />
                                    <BestSellerProductCardShimmer width={'330px !important'} />
                                    <BestSellerProductCardShimmer width={'330px !important'} />


                                </div>
                            }
                        </div>

                    </div>

                    <div className='category-best-seller-banners-section'>
                        <img src={url + bestSelling.cover_img.image_url} key={bestSelling?.cover_img?.image_url} className='banner_one' alt='banner one' />
                        <img src={mainBanner && (url + mainBanner.image_url)} key={mainBanner?.image_url} alt='banner two' className='banner_two' />
                    </div>

                </div>

                <div className='best-saller-mobile-container'>
                    <h3>Best Seller</h3>
                    <div className='mobile-card-nav-container'>
                        {bestSellerNav1.map((item, index) => (
                            <p
                                key={index}
                                className={`mobile-best-seller-nav-item ${mobiIndex === index ? 'mobile-seller-nav-active' : ''}`}
                                onClick={() => {
                                    setCurrentSlug(item.slug)
                                    handleMobileNavClick(index)
                                    handleActiveItem(index, item)

                                    // getBestSellerProducts(item.slug)
                                }}
                            >
                                {item.heading}
                            </p>
                        ))}
                    </div>

                    <div className='mobile-view-cards-main-container'>
                        {loading ? (
                            <BestSellerProductCardShimmer width={'85%'} />
                        ) : (
                            <Slider ref={sliderRef} {...mobileSettings}>
                                {allProducts.map((item, index) => (


                                    <Link key={index} href={{ pathname: `/product/${item?.slug}`, state: item }} className='best-seller-card-main-container'>
                                        
                                        <div className='mobile-best-seller-cart-wishlist-container'>
                                            {
                                                isInWishList(item?.uid) ? (
                                                    <VscHeartFilled
                                                        size={25}
                                                        style={{ color: 'var(--primary-color)' }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleWishlisted(item);
                                                        }}
                                                    />
                                                ) : (
                                                    <VscHeart
                                                        size={25}
                                                        style={{ color: 'var(--primary-color)' }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleWishlisted(item);
                                                        }}
                                                    />
                                                )
                                            }
                                        </div>
                                        <img src={url + item?.images?.[1]?.image_url} />
                                        <div className='mobile-card-details-container'>
                                            <div className='mobile-best-seller-rating-and-review'>
                                                <RatingReview rating={item?.rating} bgColor={'#FFFFFF'} bgColor2={'#FFFFFF'} disabled={true} size={"12px"} />
                                            </div>
                                            <h3>{item?.name}</h3>
                                            <div className='mobile-best-seller-category-product-price'>
                                                <p className='mobile-best-seller-sale-price'>{formatedPrice(item?.sale_price)}</p>
                                                {item?.sale_price === '' ? <p className='mobile-best-seller-sale-price'>{formatedPrice(item?.sale_price)}</p> : <del className='mobile-best-seller-regular-price'>{formatedPrice(allProducts?.[0]?.regular_price)}</del>}
                                            </div>
                                        </div>
                                        <div className='mobile-best-seller-cart-container'>
                                            <div className='mobile-best-sseller-card-bag-container'>
                                                <HiOutlineShoppingBag size={25} className='best-seller-cart-icon' />
                                            </div>
                                        </div>

                                    </Link>
                                ))}
                            </Slider>
                        )}
                    </div>
                </div>

            </div>

        </>
    )
}

export default BestSeller
