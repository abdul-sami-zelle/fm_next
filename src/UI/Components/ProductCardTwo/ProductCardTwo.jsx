'use client'

import React, { useState, useEffect } from 'react'
import './ProductCardTwo.css';
import { formatedPrice, getAdjustedPrice, url } from '../../../utils/api';
import RatingReview from '../starRating/starRating';
import { useList } from '../../../context/wishListContext/wishListContext';
import { VscHeartFilled } from "react-icons/vsc";
import { VscHeart } from "react-icons/vsc";
import ProductCardImageShimmer from '../Loaders/CardImageShimmer/cardImageShimmer';
import { GoInfo } from "react-icons/go";
import { FaEye } from "react-icons/fa";
import { useProductPage } from '@/context/ProductPageContext/productPageContext';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'; // important!
import Link from 'next/link';

const ProductCardTwo = ({
    productCardContainerClass,
    ProductTitle,
    reviewCount,
    priceTag,
    sale_price,
    tags,
    singleProductData,
    handleQuickView,
    maxWidthAccordingToComp,
    borderLeft,
    justWidth,
    handleCardClick,
    handleWishListclick,
    attributes,
    colTwo,
    showOnPage,
    handleInfoModal,
    showExtraLines,
    titleHeight,
    btnText = 'Quick View'
}) => {
    const [isImageLoaded, setImageLoaded] = useState(false);

    const getPriorityAttribute = (attributes) => {
        return attributes && attributes?.find(attr => attr.type === "image") ||
            attributes && attributes?.find(attr => attr.type === "color") ||
            attributes && attributes?.find(attr => attr.type === "select");
    };



    const priorityAttribute = getPriorityAttribute(attributes);

    const [hoveredImage, setHoveredImage] = useState()
    const [selectedColor, setSelectedColor] = useState();
    const [selectedColorImage, setSelectedColorImage] = useState({});

    const [isHovered, setIsHovered] = useState(false);
    // const [selectedVariation, setSelectedVariation] = useState({})


    const handleColorSelect = (color) => {
        setSelectedColor(color)
        if (singleProductData?.type === "variable") {
            const matchingAttribute = singleProductData?.variations?.find(variation =>
                variation?.attributes?.some(attribute =>
                    attribute?.type === "color" &&
                    attribute?.options?.some(option => option?.value === color)
                )
            );
            setSelectedColorImage(matchingAttribute?.image?.image_url)
            setHoveredImage(matchingAttribute?.images[1]?.image_url)
            return matchingAttribute;

        } else if (singleProductData?.type === "simple") {
            // Handle simple product logic
            const simpleAttribute = singleProductData?.attributes?.find(attribute =>
                attribute?.type === "color"
            );


            if (simpleAttribute) {
                setSelectedColorImage(singleProductData?.image?.image_url);
                setHoveredImage(singleProductData?.images[1]?.image_url);
            }
            return simpleAttribute;
        }

    }






    const handleImageSelect = (image) => {
        if (singleProductData?.type === "variable") {
            const matchingAttribute = singleProductData?.variations?.find(variation =>
                variation?.attributes?.some(attribute =>
                    attribute?.type === "image" &&
                    attribute?.options?.some(option => option?.value === image)
                )
            );
            setSelectedColorImage(matchingAttribute?.image?.image_url)
            setHoveredImage(matchingAttribute?.images[1]?.image_url)
            return matchingAttribute;
        } else if (singleProductData?.type === "simple") {
            const simpleAttribute = singleProductData?.attributes?.find(attribute =>
                attribute?.type === "image"
            );
            setSelectedColorImage(singleProductData?.image?.image_url);
            setHoveredImage(singleProductData?.images[1]?.image_url);
            return simpleAttribute;
        }
    }

    const moveToFirst = (array, defValue) => {
        const index = array?.findIndex(item => item === defValue);
        if (index > 0) {
            const [priorityItem] = array?.splice(index, 1);
            array.unshift(priorityItem)
        }
        return array;
    }


    useEffect(() => {
        if (singleProductData?.type === "variable") {
            // Find the default variation
            const defAttImage = singleProductData?.variations?.find(attr =>
                attr?.uid === singleProductData?.default_variation
            );

            // Get the default color
            const defAttrColor = defAttImage?.attributes?.find(attribute =>
                attribute?.type === "color" &&
                attribute?.options?.some(option => option?.value)
            );

            const defaultColor = defAttrColor?.options?.[0]?.value;

            // Automatically select the default color
            if (defaultColor) {
                handleColorSelect(defaultColor);
            }

            // Handle prioritized attributes for variable products
            const attributes = defAttImage?.attributes;
            if (attributes) {
                const defaultAttribute = getPriorityAttribute(attributes);
                if (defaultAttribute) {
                    const updatedAttributes = moveToFirst(attributes, defaultAttribute);
                }
            }

        } else if (singleProductData?.type === "simple") {
            // For simple products, select the only color available
            const simpleColorAttribute = singleProductData?.attributes?.find(attribute =>
                attribute?.type === "color"
            );

            const defaultColor = simpleColorAttribute?.options?.[0]?.value;

            if (defaultColor) {
                handleColorSelect(defaultColor);
            }
        }

    }, [singleProductData]);



    const { isInWishList } = useList();


    const getDeliveryDate = () => {
        const options = { weekday: "long", month: "short", day: "numeric" };
        const today = new Date();

        const optionWithTimeZone = { ...options, timeZone: "America/New_York" };

        today.setDate(today.getDate() + 3);
        return today.toLocaleDateString("en-us", optionWithTimeZone);
    }

    // console.log("priority attributes", priorityAttribute)


    const { selectedVariationData } = useProductPage()



    const stockCheck = singleProductData?.type === 'variable' ?
        selectedVariationData?.manage_stock?.stock_status === 'inStock'
        && selectedVariationData?.manage_stock?.quantity === 0
        || selectedVariationData?.manage_stock?.stock_status === 'outStock'
        || selectedVariationData?.manage_stock?.stock_status === 'outOfStock'
        : singleProductData?.manage_stock?.stock_status === 'inStock'
        && singleProductData?.manage_stock?.quantity === 0
        || singleProductData?.manage_stock?.stock_status === 'outStock'
        || singleProductData?.manage_stock?.stock_status === 'outOfStock';




    return (
        <>
            <Link href={`/product/${singleProductData?.slug}`}
                className={`${productCardContainerClass} ${borderLeft ? 'hide-after' : ''} `}
                style={{ maxWidth: maxWidthAccordingToComp, width: justWidth }}

            >
                <div className='product-card-data'>
                    <div className={`product-cart-top-tags-container ${showOnPage ? 'show-product-cart-top-tags' : ''}`} >

                        {
                            stockCheck ? (
                                <span
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="Available in 7 to 8 weeks"
                                    className={`product-archive-out-of-stock-tag ${colTwo ? 'apply-col-two-styling' : ''}`}>Out Of Stock</span>

                            ) : (
                                <div className={`product-tagging`}>

                                    <div className='text-tag' style={{ backgroundColor: tags?.bg_color, color: tags?.text_color }} >
                                        {tags?.text}
                                    </div>

                                </div>

                            )
                        }



                        <div className={`product-wishlist-icon-container`}>

                            {
                                isInWishList(singleProductData?._id) ?
                                    <VscHeartFilled
                                        // size={25}
                                        className={`wishlist-heart ${colTwo ? 'small-heart' : ''}`}
                                        style={{ color: 'var(--orange-fill)' }}
                                        stroke='var(--orange-outline)'
                                        onClick={(e) => {
                                            e.stopPropagation();      // stop event bubbling to <Link>
                                            e.preventDefault();
                                            handleWishListclick(singleProductData)
                                        }}
                                    />
                                    :
                                    <VscHeart
                                        // size={25}
                                        className={`wishlist-heart ${colTwo ? 'small-heart' : ''}`}
                                        style={{ float: 'right', color: 'var(--orange-fill)' }}
                                        onClick={(e) => {
                                            e.stopPropagation();      // stop event bubbling to <Link>
                                            e.preventDefault();
                                            handleWishListclick(singleProductData)
                                        }}
                                    />
                            }
                        </div>
                    </div>

                    <div className='product-main-image-container'>

                        <div
                            className='product-card-product-image-inner-container'
                            onMouseEnter={() => { setIsHovered(true) }}
                            onMouseLeave={() => { setIsHovered(false) }}
                        >



                            

                            {selectedColorImage && (
                                <img
                                    src={`${url}${selectedColorImage}`}
                                    alt='product img'
                                    className={`product-main-img ${colTwo ? 'set-static-height' : ''}`}
                                    effect='blur'
                                    onLoad={() => setImageLoaded(true)}
                                />
                            )}

                            {hoveredImage && (
                                <img
                                    src={`${url}${hoveredImage
                                        }`}
                                    alt='product img'
                                    className={`hovered-product-main-img ${isHovered ? 'visible-hovered' : ''}`}
                                    effect='blur'
                                    onLoad={() => { setImageLoaded(true) }}
                                />
                            )}

                            {
                                !isImageLoaded && <div className={`image_shimmer_loader ${colTwo ? 'image-shimmer-loader-dual-col' : ''}`}>
                                    <ProductCardImageShimmer />
                                </div>
                            }


                        </div>

                        <div className='product-card-inner-content-container'>

                            <div className='product-card-main-heading-container'>
                                <h3 className={`product-title ${colTwo ? 'apply-col-two-styling' : ''} ${titleHeight ? "heighted" : ""}`}> {ProductTitle} </h3>
                            </div>

                            {priorityAttribute && (
                                <div className={`product-card-attr ${colTwo ? 'hide-squire-attribute' : ''}`} >
                                    {priorityAttribute?.type === "image" && (
                                        <div className="image-variation">
                                            {priorityAttribute?.options?.map((item, index) => (
                                                <img
                                                    key={index}
                                                    onClick={(e) => {
                                                        e.stopPropagation();      // stop event bubbling to <Link>
                                                        e.preventDefault();
                                                        handleImageSelect(item.value)
                                                    }}
                                                    src={url + item.value}
                                                    alt=""
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {priorityAttribute?.type === "color" && (
                                        <div className="color-variation-div">
                                            {priorityAttribute?.options?.map((item, index) => (
                                                <span
                                                    key={index}
                                                    className={`color-variation ${selectedColor === item.value ? 'show-tick-mark' : ''}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();      // stop event bubbling to <Link>
                                                        e.preventDefault();
                                                        handleColorSelect(item.value)
                                                    }}
                                                    style={{
                                                        backgroundColor: item.value,
                                                        border: selectedColor === item.value ? `1px solid ${item.value}` : 'none',
                                                        boxShadow: selectedColor === item.value ? `inset 0 0 0 2px #FFFF` : '',
                                                        "--tick-color": item.value

                                                    }}
                                                ></span>
                                            ))}
                                        </div>
                                    )}

                                    {priorityAttribute?.type === "select" && (
                                        <div className="text-variation">
                                            {priorityAttribute?.options?.map((item, index) => (
                                                <p key={index} className="attr-var">{item.value}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {priorityAttribute && (
                                <div className={`mobile-product-card-attr ${colTwo ? 'show-rounded-attributes' : ''}`} >
                                    {priorityAttribute?.type === "image" && (
                                        <div className="mobile-image-variation">
                                            {priorityAttribute?.options?.map((item, index) => (
                                                <img
                                                    key={index}
                                                    onClick={(e) => {
                                                        e.stopPropagation();      // stop event bubbling to <Link>
                                                        e.preventDefault();
                                                        handleImageSelect(item.value)
                                                    }}
                                                    src={url + item.value}
                                                    alt=""
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {priorityAttribute?.type === "color" && (
                                        <div className="mobile-color-variation-div">
                                            {priorityAttribute?.options?.map((item, index) => (
                                                <span
                                                    key={index}
                                                    className={`mobile-color-variation ${selectedColor === item.value ? 'show-tick-mark' : ''}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();      // stop event bubbling to <Link>
                                                        e.preventDefault();
                                                        handleColorSelect(item.value)
                                                    }}
                                                    style={{
                                                        backgroundColor: item.value,
                                                        border: selectedColor === item.value ? `1px solid ${item.value}` : 'none',
                                                        boxShadow: selectedColor === item.value ? `inset 0 0 0 2px #FFFF` : ''
                                                    }}
                                                ></span>
                                            ))}
                                        </div>
                                    )}

                                    {priorityAttribute.type === "select" && (
                                        <div className="mobile-text-variation">
                                            {priorityAttribute?.options?.map((item, index) => (
                                                <p key={index} className="mobile-attr-var">{item.value}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>

                    </div>

                    <div className='product-card-content-bottom-section'>


                        <div className={`product-card-get-it-by-container ${colTwo ? 'apply-col-two-styling' : ''}`}>

                            <div className={`product-get-it-by-left-side ${colTwo ? 'apply-col-two-styling' : ''}`}>

                                <div className='product-card-rating-and-price'>


                                    {
                                        sale_price === "" ?
                                            <h3 className={`product-regular-price  ${colTwo ? 'apply-col-two-styling' : ''}`}>
                                                <p className='regular-price-starting-at'>Starting at</p>
                                                {formatedPrice(priceTag)}
                                            </h3> :
                                            <div className={colTwo ? 'price-and-rating-column-direction' : 'price-and-rating-container'}>
                                                <h3 className={`product-price-tag ${colTwo ? 'apply-col-two-styling' : ''}`}>
                                                    <p className={`product-price-starting-at ${colTwo ? 'apply-two-col-styling' : ''}`}>Starting at</p>
                                                    ${sale_price}
                                                    <del className={`product-del-price-with-sale-price  ${colTwo ? 'apply-col-two-styling' : ''}`}>${priceTag}</del>

                                                </h3>
                                                <div className={`mobile-view-rating-stars ${colTwo ? 'apply-two-col-styling' : ''}`}>
                                                    <RatingReview rating={reviewCount} size={"12px"} disabled={true} />
                                                </div>
                                            </div>
                                    }

                                    <span className={`product-card-installment-plan ${showExtraLines ? 'show-installment-plan' : ''}`}>
                                        <p className={`installment-plan-detail ${colTwo ? 'apply-col-two-styling' : ''}`}>or ${sale_price === "" ? getAdjustedPrice(priceTag) : getAdjustedPrice(sale_price)}/week for 12 months</p>
                                        <GoInfo 
                                            color='#595959'
                                            onClick={(e) => {
                                            e.stopPropagation();      // stop event bubbling to <Link>
                                            e.preventDefault();
                                            handleInfoModal()
                                        }}
                                        />
                                    </span>
                                    <span className={`product-card-get-it-by ${showExtraLines ? 'show-set-it-by' : 'hide-get-it-by'}`}>
                                        <p>Get it by</p>
                                        <h3>{getDeliveryDate()}</h3>
                                    </span>

                                </div>
                            </div>

                            <div className={`product-card-quick-view-container ${colTwo ? 'apply-col-two-styling' : ''}`}>

                                <div className={`product-rating-stars-div ${colTwo ? 'apply-col-two-styling' : ''}`}>
                                    <RatingReview rating={reviewCount} size={"12px"} disabled={true} />
                                </div>

                                <span className={`product-card-get-it-by-title ${showExtraLines ? 'show-product-card-get-it-by-title' : ''}`}>
                                    <p className={`get-it-by ${colTwo ? 'apply-col-two-styling' : ''}`}>Get it By</p>
                                    <h3 className={`get-by-delivery ${colTwo ? 'apply-col-two-styling' : ''}`}>{getDeliveryDate()}</h3>
                                </span>

                                <button className={`card-two-quick-view-button ${colTwo ? 'apply-col-two-styling' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();      // stop event bubbling to <Link>
                                        e.preventDefault();
                                        handleQuickView()
                                    }}
                                >
                                    {btnText}
                                </button>

                                <FaEye
                                    size={20}
                                    className='quick-view-eye-icon'
                                    onClick={(e) => {
                                        e.stopPropagation();      // stop event bubbling to <Link>
                                        e.preventDefault();
                                        handleQuickView()
                                    }}
                                />

                            </div>

                        </div>
                    </div>
                </div>
            </Link>

            <Tooltip id="my-tooltip" className="custom-tooltip" />
        </>
    )
}

export default ProductCardTwo