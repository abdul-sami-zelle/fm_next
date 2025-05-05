'use client'

import React, { Suspense, useEffect, useState } from "react";
import "./FurnitureAtEveryBudget.css";
// import star from '../../../Assets/icons/blue-star.png'
import { url } from "../../../utils/api";
// import { useLocation, useNavigate } from 'react-router-dom';
import heart from '../../../Assets/icons/heart-vector.png'
import QuickView from "../../Components/QuickView/QuickView";
import ProductCardShimmer from "../../Components/Loaders/productCardShimmer/productCardShimmer";
import { useList } from "../../../context/wishListContext/wishListContext";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductCardTwo from "../../Components/ProductCardTwo/ProductCardTwo";
import ProductInfoModal from "../../../Global-Components/ProductInfoModal/ProductInfoModal";
import { useRouter, useSearchParams } from "next/navigation";


export default function FurnitureAtEveryBudgetClient() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const navigate = useNavigate();
    const router = useRouter()


    const searchParams = useSearchParams();

    useEffect(() => {
        const category = searchParams.get('categoryUid');
        const max_price = searchParams.get('max_price');
      
          useEffect(() => {
              const fetchData = async () => {
                  try {
                      const response = await fetch(`${url}/api/v1/products/by-category?categoryUid=${category}&max_price=${max_price}`);
                      if (!response.ok) {
                          throw new Error("Failed to fetch data");
                      }
                      const result = await response.json();
                      setData(result);
                  } catch (error) {
                      setError(error.message);
                  } finally {
                      setLoading(false);
                  }
              };
      
              fetchData();
          }, []);
    }, [searchParams])


    const maxLength = 50;
    // const truncateTitle = (title, maxLength) => {
    //     return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
    // };

    const [quickViewProduct, setQuickViewProduct] = useState({})
    const [quickViewClicked, setQuickView] = useState(false);
    const handleQuickViewOpen = (item) => {
        setQuickView(true);
        setQuickViewProduct(item)

    }
    const handleQuickViewClose = () => { setQuickView(false) }

    const handleProductClick = (item) => {
        // navigate(`/product/${item.slug}`, { state: item })
        router.push(`/product/${item.slug}`,)
    };


    // wish list
    const { addToList, removeFromList, isInWishList } = useList()
    const notify = (str) => toast.success(str);
    const notifyRemove = (str) => toast.error(str)
    const handleWishList = (item) => {
        if (isInWishList(item.uid)) {
            removeFromList(item.uid);
            notifyRemove('Removed from wish list', {
                autoClose: 10000,
                className: "toast-message",
            })

        } else {
            addToList(item)
            notify("added to wish list", {
                autoClose: 10000,
            })
        }
    }


      const [isInfoOpen, setIsInfoOpen] = useState(false);
        const handleOpennfoModal = () => {
            setIsInfoOpen(true);
        }
    
        const handleCloseInfoModal = () => {
            setIsInfoOpen(false);
        }
    




    // variation price

    const [variationPayload, setVariationPayload] = useState();
    const getVariationMatch = () => {
        if (!data?.variations) return;
        const selectedAttr = data?.variations?.find(variation =>
            variation.attributes.some(attribute =>
                attribute.type === 'select' &&
                attribute.options.some(option => option.value === selectVariation)
            ) &&
            variation.attributes.some(attribute =>
                attribute.type === 'color' &&
                attribute.options.some(option => option.value === selectedColor)
            )
        );

        setVariationPayload(selectedAttr)

    }

    const [selectVariation, setSelectVariation] = useState(0);
    // const handleSelectVariation = (value) => {
    //     setSelectVariation(value);
    //     getVariationMatch()
    // }

    const [selectedColor, setSelectedColor] = useState();
    // const handleSelectColor = (value) => {
    //     setSelectedColor(value)
    //     getVariationMatch()
    // }

    const getInitialDefaultValues = () => {
        const defAttImage = data?.variations?.find(attr =>
            attr.uid === data.default_variation
        )
        if (!defAttImage) return;
        const defAttrColor = defAttImage?.attributes?.find(attribute =>
            attribute?.type === 'color' &&
            attribute?.options?.some(option => option?.value)
        )

        const defAttrSelect = defAttImage?.attributes?.find(attribute =>
            attribute?.type === 'select' &&
            attribute?.options?.some(option => option?.value)
        )

        const defoultColor = defAttrColor?.options?.[0]?.value;
        const defoultValue = defAttrSelect?.options?.[0]?.value;
        setSelectVariation(defoultValue);
        setSelectedColor(defoultColor)
        getVariationMatch()
    };

    // useEffect(() => {
    //     getInitialDefaultValues()
    // }, []);
    useEffect(() => {
        if (data && data.variations && data.default_variation) {
            getInitialDefaultValues();
        }
    }, [data]);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error}</p>;
    const [activeGrid, setActiveGrid] = useState('single-col')
    const [selectedGrid, setSelectedGrid] = useState('single-col');
    // const handleActiveGrid = (grid) => {
    //     setActiveGrid(grid)
    //     setSelectedGrid('single-col');
    // }



    return (
        <>

            <div className="cover_photo">
                <img src={`${url}/uploads/media/Pages/home/slider/1731385502484_209_Main-Desktop-Banner-2-2048x545.webp`} alt="Furniture Cover" />
            </div>
            <div className="furniture_at_every_budget">


                <h3 className="furniture-for-every-budget-main-heading">Furniture At Every Budget</h3>

                <div className="product-grid">
                    {data ? (
                        data.products.map((item, index) => (
                            <ProductCardTwo
                            key={index}
                            slug={item.slug}
                            singleProductData={item}
                            maxWidthAccordingToComp={"100%"}
                            justWidth={'100%'}
                            showOnPage={true}
                            showExtraLines={true}
                            percent={'12%'}
                            colTwo={selectedGrid === 'single-col' ? false : true}
                            tagIcon={item.productTag ? item.productTag : heart}
                            tagClass={item.productTag ? 'tag-img' : 'heart-icon'}
                            mainImage={`${item.image.image_url}`}
                            productCardContainerClass="product-card"
                            ProductSku={item.sku}
                            tags={item.tags}
                            allow_back_order={item?.allow_back_order}
                            ProductTitle={item.name}
                            
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
                            handleInfoModal={handleOpennfoModal}
                            />
                        ))
                    ) : (
                        Array.from({ length: 4 }).map((_, index) => (
                            <ProductCardShimmer />
                        ))
                    )}
                </div>
                
                <div className={`mobile-view-furniture-for-every-budget ${selectedGrid === 'single-col' ? 'single-col' : 'two-col'} `}>
                    {data ? (
                        data.products.map((item, index) => (
                            <ProductCardTwo
                            key={index}
                            slug={item.slug}
                            singleProductData={item}
                            maxWidthAccordingToComp={"100%"}
                            justWidth={'100%'}
                            showOnPage={true}
                            showExtraLines={true}
                            percent={'12%'}
                            colTwo={selectedGrid === 'single-col' ? false : true}
                            tagIcon={item.productTag ? item.productTag : heart}
                            tagClass={item.productTag ? 'tag-img' : 'heart-icon'}
                            mainImage={`${item.image.image_url}`}
                            productCardContainerClass="product-card"
                            ProductSku={item.sku}
                            tags={item.tags}
                            allow_back_order={item?.allow_back_order}
                            ProductTitle={item.name}
                            
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
                            handleInfoModal={handleOpennfoModal}
                            />
                        ))
                    ) : (
                        Array.from({ length: 4 }).map((_, index) => (
                            <ProductCardShimmer />
                        ))
                    )}
                </div>

                <QuickView
                            setQuickViewProduct={quickViewProduct}
                            quickViewShow={quickViewClicked}
                            quickViewClose={handleQuickViewClose}
                        />
                <ProductInfoModal
                openModal={isInfoOpen}
                closeModal={handleCloseInfoModal}
            />
               
            </div>

        </>
    );
}
