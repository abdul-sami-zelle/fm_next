'use client'

import React, { useEffect, useState } from 'react'
import './Products.css';

import { MdKeyboardArrowDown } from "react-icons/md";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaPlus, FaTruck, FaLocationDot, FaMinus } from "react-icons/fa6";

// Components
import ProductCardShimmer from '../Loaders/productCardShimmer/productCardShimmer';
import QuickView from '../QuickView/QuickView';
import CartSidePannel from '../Cart-side-section/CartSidePannel';
import MobileViewProductFilters from '../MobileViewProductFilters/MobileViewProductFilters';
import Breadcrumb from '@/Global-Components/BreadCrumb/BreadCrumb';

// Functions and Context
import { formatedPrice, url, useDisableBodyScroll } from '../../../utils/api';
import axios from 'axios';
import { useCart } from '@/context/cartContext/cartContext';
import { useList } from '@/context/wishListContext/wishListContext';
import DoubleRangeSlider from '@/Global-Components/MultiRangeBar/MultiRange';
import RatingReview from '../starRating/starRating';
import ProductCardTwo from '../ProductCardTwo/ProductCardTwo';
import { useProductArchive } from '@/context/ActiveSalePageContext/productArchiveContext';
import SortModal from '@/UI/Modals/SortModal/SortModal';
import { IoArrowBack } from "react-icons/io5";
import SnakBar from '@/Global-Components/SnakeBar/SnakBar';
import ProductInfoModal from '@/Global-Components/ProductInfoModal/ProductInfoModal';
import SectionLoader from '../Loader/SectionLoader';
import Image from 'next/image';
import { useRouter, useSearchParams, useParams, usePathname } from 'next/navigation';
import Link from 'next/link';

const Products = ({ navigationType }) => {

    // All Contexts
    const {
        cartProducts,
        increamentQuantity,
        decreamentQuantity,
        removeFromCart,
    } = useCart();

    const {
        products,
        setProducts,
        activePage,
        setActivePage,
        activePageIndex,
        setActivePageIndex,
        allFilters,
        setAllFilters,
        priceRange,
        setPriceRange,
        subCategories,
        setSubCategories,
        totalPages,
        setTotalPages,
        colorValue,
        setColorValue,
        sortProducts,
        selectedRelevanceValue,
        setSelectedRelevanceValue,
    } = useProductArchive()

    useEffect(() => {
        if (navigationType !== 'POP' || products.length > 0) {
            setActivePage(1);
            setActivePageIndex(1);
        }
    }, [navigationType])


    const slug = useParams();
    const subCategorySlug = slug['product-archive'];
    
    // const location = useLocation();
    const location = useSearchParams();
    const params = new URLSearchParams(location.search);

    const pathname = usePathname()

    const query = params.get('query');
    const searchParams = useSearchParams()
    // const setSearchParams = (value) => {
    //     const params = new URLSearchParams(searchParams.toString());
    //     if (value) {
    //         params.set(value);
    //     } else {
    //         params.delete(value)
    //     }

    // }
    const [hideFilters, setHideFilters] = useState(false);
    const [relevanceTrue, setRelevanceTrue] = useState(false)
    const navigate = useRouter();
    const [addToCartClicked, setAddToCartClicked] = useState(false);
    const [quickViewClicked, setQuickView] = useState(false);
    const [colors, setColors] = useState([]);
    const [mobileFilters, setMobileFilters] = useState(false);
    const [quickViewProduct, setQuickViewProduct] = useState({})
    const [noProducts, setNoProducts] = useState();
    const [filtereState, setFilterState] = useState(false);
    const [clearFilters, setClearFilters] = useState(true);

    // Path Extractor
    const pathSegments = pathname?.split('/').filter(Boolean)
    const currentRoute = pathSegments[pathSegments?.length - 1];

    // Filters Section
    const [isOpen, setIsOpen] = useState(false);
    const [ratingOpen, setRatingOpen] = useState(false);

    // Sub Categories show
    const  categorySlug = useParams();
    const parentCategory = categorySlug.category
    const getSubCategories = async () => {

        const api = `/api/v1/sub-category/get/${parentCategory}`

        try {
            const response = await axios.get(`${url}${api}`);
            if (response.status === 200) {
                const result = response.data.sub_categories
                setSubCategories(result)
            } else {
                console.log("UnExpected Error", response.status)
            }
        } catch (error) {
            console.log("UnExpected Server Error", error);
        }
    }

    useEffect(() => {getSubCategories()}, [])
    useEffect(() => {
            getSubCategories()
    }, [subCategorySlug])

    // Hide and Show Filter section
    const handleFilterSection = () => {
        setHideFilters(!hideFilters)
    }

    // Fetch Filters
    const fetchFilters = async () => {
        const api = `/api/v1/products/by-category/filters?categorySlug=${subCategorySlug}`
        try {
            const response = await axios.get(`${url}${api}`);
            if (response.status === 200) {
                setAllFilters(response.data)
                if (response.data.priceRange.minPrice !== undefined && response.data.priceRange.maxPrice !== undefined) {
                    setPriceRange([response.data.priceRange.minPrice, response.data.priceRange.maxPrice]);
                }
            } else {
                console.error(`UnExpected ${response.status} Error`)
            }
        } catch (error) {
            console.error("Server Error");
        }
    }

    // Filters Functions

    const handleColorFilterOpenClose = (type) => {
        setIsOpen((prevOpen) => prevOpen === type ? '' : type)
        setRatingOpen((prevOpen) => prevOpen === type ? '' : type)
    }

    const router = useRouter()
    

    const handleRangeChange = (newRange) => {
        const params = new URLSearchParams(window.location.search);
        if (newRange[0] !== priceRange[0] || newRange[1] !== priceRange[1]) {
            setPriceRange(newRange);
        }

        params.set('price', newRange.join(','));

        params.set('page', 1);
        setActivePageIndex(1)

        let priceString = params.toString().replace(/%2C/g, ',').replace(/\+/g, ' ');

        router.push(`?${priceString}`);
        filterProducts(priceString)

    }


    const handleColorCheck = (value) => {
        const params = new URLSearchParams(window.location.search);
        const updatedColorValue = colorValue?.includes(value) ? [] : [value];

        setColorValue(updatedColorValue);

        const selectedName = allFilters.colors[0].options
            .filter((item) => updatedColorValue.includes(item.value))
            .map((item) => item.name);

        if (selectedName.length > 0) {
            params.set('color', selectedName.join(','));
        } else {
            params.delete('color');
        }

        // Always reset to page 1 on filter change
        params.set('page', '1');

        const queryString = params.toString().replace(/%2C/g, ',').replace(/\+/g, ' ');
        const pathname = window.location.pathname;

        // ✅ Update the URL
        router.replace(`${pathname}?${queryString}`, { shallow: true });

        // ✅ Call API after updating query
        filterProducts(queryString);
    };


    const [ratingValue, setRatingValue] = useState([]);
    const handleRatingFilter = (value) => {
        const params = new URLSearchParams(window.location.search);
        const updatedRating = ratingValue.includes(value) ? [] : [value]

        setRatingValue(updatedRating)

        if (updatedRating.length > 0) {
            params.set('rating', updatedRating.join(','));
        } else {
            params.delete('rating');
        }

        params.set('page', 1);

        const ratingString = params.toString().replace(/%2C/g, ',').replace(/\+/g, ' ');
        
        const pathname = window.location.pathname;

        // ✅ Update the URL
        router.replace(`${pathname}?${ratingString}`, { shallow: true });
        filterProducts(ratingString);
    }

    const handleCategorySelect = (value) => {
        console.log("Mobile Filter Clicked", value);
    };

    const handleClearFilters = () => {
        setPriceRange([300, 900])
        setColorValue([]);
        setRatingValue([]);
        const pathname = window.location.pathname;
        router.replace(pathname, { shallow: true });
        fetchProductData();
        fetchFilters();
        setActivePage(1);
        setActivePageIndex(1);
    }

    const filterProducts = async (filter) => {

        const api = `/api/v1/products/by-category?categorySlug=${subCategorySlug}&${filter}&per_page=12`;
        try {
            setClearFilters(true)
            const response = await axios.get(`${url}${api}`)
            let data = response.data.products
            switch (selectedRelevanceValue) {
                case 'Recent':
                    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    break;
                case 'By Price (Low to High)':
                    data.sort((a, b) => a.sale_price - b.sale_price);
                    break
                case 'By Price (High to Low)':
                    data.sort((a, b) => b.sale_price - a.sale_price);
                    break;
                case 'Alphabetic (A to Z)':
                    data.sort((a, b) => a.name.localeCompare(b.name));
                    break
                case 'Alphabetic (Z to A)':
                    data.sort((a, b) => b.name.localeCompare(a.name));
                    break
                case 'By Ratings (Low to High)':
                    data.sort((a, b) => parseFloat(a.average_rating) - parseFloat(b.average_rating));
                    break
                case 'By Ratings (High to Low)':
                    data.sort((a, b) => parseFloat(b.average_rating) - parseFloat(a.average_rating));
                    break

                default:
                    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            };

            setProducts(response.data.products)
            setTotalPages(response.data.pagination)

            if (!response.data.products.length > 0) {
                setFilterState(true);
            } else {
                setFilterState(false)
            }
        } catch (error) {
            console.error("Internal Server Error");
            setClearFilters(false);
        } finally {
            setClearFilters(false)
        }
    }

    // Product Side Head 
    const getDeliveryDate = () => {
        const options = { weekday: "long", month: "short", day: "numeric" };
        const today = new Date();

        const optionWithTimeZone = { ...options, timeZone: "America/New_York" };

        today.setDate(today.getDate() + 3);
        return today.toLocaleDateString("en-us", optionWithTimeZone);
    }

    const [isLocationCheck, setIsLocationCheck] = useState(false);
    const [isDeliveryCheck, setIsDeliveryCheck] = useState(false)
    const handleLocationToggler = (e) => {
        setIsLocationCheck(e.target.checked);
    }

    const handleDeliveryToggler = (e) => {
        setIsDeliveryCheck(e.target.checked);
    }

    const relevanceData = [
        { name: 'Recent' },
        { name: 'By Price (Low to High)' },
        { name: 'By Price (High to Low)' },
        { name: 'Alphabetic (A to Z)' },
        { name: 'Alphabetic (Z to A)' },
        { name: 'By Ratings (Low to High)' },
        { name: 'By Ratings (High to Low)' },
    ]

    const handleRelevance = () => {
        setRelevanceTrue(!relevanceTrue);
    }

    const fetchProductData = async () => {
        const queryApi = `/api/v1/products/by-name?name`;
        try {
            setClearFilters(true)
            let response;
            if (query) {
                response = await axios.get(`${url}${queryApi}=${query}`);
            } else {
                response = await axios.get(
                    `${url}/api/v1/products/by-category?categorySlug=${subCategorySlug}&per_page=12`
                );
            }

            const data = response.data.products || [];
            setTotalPages(response.data.pagination)

            switch (selectedRelevanceValue) {
                case 'Recent':
                    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    break;
                case 'By Price (Low to High)':
                    data.sort((a, b) => a.sale_price - b.sale_price);
                    break
                case 'By Price (High to Low)':
                    data.sort((a, b) => b.sale_price - a.sale_price);
                    break;
                case 'Alphabetic (A to Z)':
                    data.sort((a, b) => a.name.localeCompare(b.name));
                    break
                case 'Alphabetic (Z to A)':
                    data.sort((a, b) => b.name.localeCompare(a.name));
                    break
                case 'By Ratings (Low to High)':
                    data.sort((a, b) => parseFloat(a.average_rating) - parseFloat(b.average_rating));
                    break
                case 'By Ratings (High to Low)':
                    data.sort((a, b) => parseFloat(b.average_rating) - parseFloat(a.average_rating));
                    break

                default:
                    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            };
            setProducts(data)
            setColors(colors);

            if (!response.data.products.length > 0) {
                setNoProducts(true)
            } else {
                setNoProducts(false);
            }
            fetchFilters();

        } catch (error) {
            console.error("Error fetching data:", error);
            setClearFilters(false);
        } finally {
            setClearFilters(false)
        }
    };

    useEffect(() => {
        if (navigationType !== 'POP' || !products?.length > 0) {
            fetchProductData()
        }
    }, [location.pathname])

    // Product Click Functions 

    const handleCartSectionClose = () => {
        setAddToCartClicked(false)
    }

    const handleQuickViewOpen = (item) => {
        setQuickView(true);
        setQuickViewProduct(item)
    }

    const handleQuickViewClose = () => { setQuickView(false) }

    const handleProductClick = (item) => {
        navigate.push(`/product/${item.slug}`);
    };


    // wish list Add And Remove Functionality
    const { addToList, removeFromList, isInWishList } = useList()
    const [wishlistMessage, setWishlistMessage] = useState('')
    const [openSnakeBar, setOpenSnakeBar] = useState(false);

    const handleWishList = (item) => {
        setOpenSnakeBar(true)
        if (isInWishList(item.uid)) {
            removeFromList(item.uid);
            setWishlistMessage('Removed from wish list')

        } else {
            addToList(item)
            setWishlistMessage('added to wish list')
        }
    }

    const handleCloseSnakeBar = () => {
        setOpenSnakeBar(false)
    }

    // Pagination Click Functions

    const handleActivePage = (index) => {
        if (index !== activePageIndex) {
            const params = new URLSearchParams(window.location.search); // Use current URL
            params.set('page', index); // Update page param
    
            const queryString = params.toString().replace(/%2C/g, ',').replace(/\+/g, ' ');
            const pathname = window.location.pathname;
    
            // Update URL without page reload
            router.replace(`${pathname}?${queryString}`, { shallow: true });
    
            // Update state
            setActivePage(index);
            setActivePageIndex(index);
    
            // Call sorting and filtering with updated query
            sortProducts(selectedRelevanceValue);
            filterProducts(queryString);
    
            // Smooth scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    

    const handlePrevPage = () => {
        if (activePage > 1) {

            // const params = new URLSearchParams(searchParams);
            const params = new URLSearchParams(window.location.search);
            params.set('page', activePage - 1);

            const queryString = params.toString().replace(/%2C/g, ',').replace(/\+/g, ' ');
            const pathname = window.location.pathname;

            // setSearchParams(params.toString())
            router.replace(`${pathname}?${queryString}`, {shallow: true});
            setActivePage(activePage - 1);
            setActivePageIndex(activePageIndex - 1);
            sortProducts(selectedRelevanceValue)

            filterProducts(params.toString())
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })

        }
    };

    const handleNextPage = () => {

        if (activePage < totalPages?.totalPages) {

            // const params = new URLSearchParams(searchParams);
            const params = new URLSearchParams(window.location.search);
            params.set('page', activePage + 1);

            const queryString = params.toString().replace(/%2C/g, ',').replace(/\+/g, ' ');
            const pathname = window.location.pathname;

            router.replace(`${pathname}?${queryString}`, {shallow: true});

            // setSearchParams(params.toString());
            setActivePage(activePage + 1);
            setActivePageIndex(activePageIndex + 1);
            sortProducts(selectedRelevanceValue)
            filterProducts(params.toString())
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    };




    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });

        const pageFromURL = parseInt(searchParams.get("page")) || 1;

        // Update the active page and index
        setActivePage(pageFromURL);
        setActivePageIndex(pageFromURL);
        sortProducts(selectedRelevanceValue);
        filterProducts(searchParams.toString());

        setTimeout(() => {
            const currentScroll = window.scrollY;

            if (currentScroll > 10) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }, 100);

    }, [location.search]);



    const maxLength = 50;

    // Mobile view Script

    const [selectedGrid, setSelectedGrid] = useState('single-col')
    const [activeGrid, setActiveGrid] = useState('single-col')
    const handleActiveGrid = (grid) => {
        setActiveGrid(grid);
        setSelectedGrid(grid)
    }

    const handleMobileFilters = () => {
        setMobileFilters(true)
    }

    const [showSortModal, setShowSortModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState('')
    const handleOpenSortModal = () => {
        setShowSortModal(true)
    }

    const handleCloseSortModal = () => {
        setShowSortModal(false)
    }

    const handleSelectMobileRelevanceValue = (name) => {
        sortProducts(name)
        setShowSortModal(false);
    }

    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const handleOpennfoModal = () => {
        setIsInfoOpen(true);
    }

    const handleCloseInfoModal = () => {
        setIsInfoOpen(false);
    }

    // Disable Scroll on Modal Open
    useDisableBodyScroll(
        isInfoOpen,
        quickViewClicked,
        showSortModal
    )

    return (
        <div className='products-main-container'>
            <Breadcrumb category={products.categories} />
            <div className={`product-archive-sub-categories-container ${currentRoute === 'searched-products' ? 'hide-category-images-container' : ''}`}>
                {subCategories.filter((item) => item.slug !== subCategorySlug).map((item, index) => (
                    <Link href={`/${parentCategory}/${item.slug}`} key={index} className='product-archive-single-sub-category'>
                        {item.filterImage !== "" ? <img src={` ${url}${item.filterImage}`} alt='sub category' /> : <img src={` ${url}${item.image2}`} alt='sub category' />}
                    </Link>
                ))}
            </div>

            <h3 className={`searched-products-heading ${currentRoute !== 'searched-products' ? 'hide-searched-heading' : ''}`}>Searched Products for: {query}</h3>

            {
                // if no product found
                noProducts ? (
                    <div className='product-not-found-container'>
                        <h3>We didn’t find any products that match your selections.Try Adjusting Your Filter for More Results.</h3>
                    </div>
                ) : (
                    // If Product Fount
                    <div className='products-and-filter-container'>
                        {/* Filters side bar section code */}

                        <div className={`filters-section ${filtereState ? 'add-border-to-filters' : ''} ${hideFilters ? 'hide-filter' : ''}`}>

                            <div className={`hide-filters-btn`}>
                                <button onClick={handleFilterSection}>
                                    <IoArrowBack size={20} color='var(--secondary-color)' />
                                    Hide Filters
                                </button>
                            </div>

                            <div className='filters-inner-container'>

                                <div className='filters-heading-section'>
                                    <h3>Filters</h3>
                                    <p onClick={handleClearFilters}>Clear Filters</p>
                                </div>

                                <div className='all-filters-section'>

                                    {/* Price Filter */}
                                    <DoubleRangeSlider
                                        min={allFilters?.priceRange?.minPrice}
                                        max={allFilters?.priceRange?.maxPrice}
                                        initialRange={priceRange}
                                        setInitialRange={setPriceRange}
                                        onRangeChange={handleRangeChange}
                                        minLabel='Min Price:'
                                        maxLabel='Max Price:'
                                    />

                                    {/* Color Filter */}
                                    <div className='single-filter'>
                                        <span onClick={() => handleColorFilterOpenClose('color-filter')}>
                                            <h3 className='filters-heading'>{allFilters?.colors?.[0]?.name}</h3>
                                            <i className='add-button-round'>
                                                {isOpen === 'color-filter' ? <FaMinus ize={14} color='var(--secondary-color)' /> : <FaPlus ize={14} color='var(--secondary-color)' />}
                                            </i>
                                        </span>
                                        <div className={`single-filter-items-container ${isOpen === 'color-filter' ? 'show-single-filter-icons' : ''}`}>
                                            {allFilters?.colors?.[0]?.options.map((item, index) => (
                                                <span key={index} className={`color-span`} >
                                                    <input
                                                        type='checkbox'
                                                        name="colorFilter"
                                                        value={item.name}
                                                        checked={colorValue?.includes(item.value)}
                                                        onChange={(e) => handleColorCheck(item.value, item.name)}
                                                        style={{ backgroundColor: item.value, border: `2px solid ${item.value}` }}
                                                        className='color-custom-checkbox'
                                                        id={`color-filter-${index}`}
                                                    />
                                                    <label className='filter-inner-text' htmlFor={`filter-${index}`}>{item.name}</label>
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Rating Filter */}
                                    <div className='single-filter'>
                                        <span onClick={() => handleColorFilterOpenClose('rating-filter')}>
                                            <h3 className='filters-heading'>Ratings</h3>
                                            <i className='add-button-round'>
                                                {isOpen === 'rating-filter' ? <FaMinus ize={15} color='var(--secondary-color)' /> : <FaPlus ize={15} color='var(--secondary-color)' />}
                                            </i>
                                        </span>
                                        <div className={`single-filter-items-container ${ratingOpen === 'rating-filter' ? 'show-single-filter-icons' : ''}`}>
                                            {[...Array(5).keys()].reverse().map((item, index) => {
                                                const rating = item + 1
                                                return <span key={index} className={`color-span`} >
                                                    <input
                                                        type='checkbox'
                                                        placeholder='checkbox'
                                                        value={rating}
                                                        checked={ratingValue.includes(rating)}
                                                        onChange={(e) => handleRatingFilter(Number(e.target.value))}
                                                        className='custom-checkbox'
                                                        id={`rating-filter-${rating}`}
                                                    />
                                                    <label htmlFor={`filter-${5 - item}`}>
                                                        <RatingReview rating={item + 1} disabled={true} size={"20px"} />
                                                    </label>
                                                </span>
                                            })}
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                        {filtereState ? (
                            <div className='product-not-found-container' >
                                <p>
                                    We didn’t find any products that match all your selections.Try Adjusting Your Filters for More Results.
                                </p>
                            </div>
                        ) : (
                            <div className={`products-section ${hideFilters ? 'full-width' : ''}`}>
                                {clearFilters && <SectionLoader />}
                                <div className={`products-heading ${query ? 'query-hide-search-heading' : ''}`}>

                                    <div className='show-filter-btn-and-product-count'>
                                        <button className={`show-filter-btn ${hideFilters ? 'hide-show-filter-btn' : ''}`} onClick={handleFilterSection}>
                                            <Image src={'/Assets/icons/hide-arrow-black.png'} width={15} height={15} alt='arrow black' className={`show-filter-btn-arrow ${hideFilters ? 'rotate-show-filter-arrow-icon' : ''}`} />
                                            Show Filters
                                        </button>
                                        {products && products?.length > 0 ? (
                                            <p>{totalPages?.totalProducts} Items Starting at {formatedPrice(allFilters?.priceRange?.minPrice)}</p>
                                        ) : (
                                            <p className='total-product-count-shimmer'></p>
                                        )
                                        }
                                    </div>

                                    <div className="toggler-main-container">

                                        <div className='location-toggler'>
                                            <div className='location-toggler-button'>
                                                <label className="toggle14">
                                                    <input type="checkbox" checked={isDeliveryCheck} onChange={handleDeliveryToggler} />
                                                    <span className="slider">
                                                        <span className="circle"></span>
                                                    </span>
                                                </label>
                                            </div>
                                            <FaTruck size={20} color={isDeliveryCheck ? 'var(--tertiary-color)' : 'rgba(89, 89, 89, 0.5)'} />
                                            <span>
                                                <p>Get it by</p>
                                                <h3 style={{ color: `${isDeliveryCheck ? 'var(--tertiary-color)' : 'var(--secondary-color)'}` }}>{getDeliveryDate()}</h3>
                                            </span>
                                        </div>

                                        <div className='location-toggler'>
                                            <div className='location-toggler-button'>
                                                <label className="toggle14">
                                                    <input type="checkbox" checked={isLocationCheck} onChange={handleLocationToggler} />
                                                    <span className="slider">
                                                        <span className="circle"></span>
                                                    </span>
                                                </label>
                                            </div>
                                            <FaLocationDot size={20} color={isLocationCheck ? 'var(--tertiary-color)' : 'rgba(89, 89, 89, 0.5)'} />
                                            <span>
                                                <p>See it in Person</p>
                                                <h3 style={{ color: `${isLocationCheck ? 'var(--tertiary-color)' : 'var(--secondary-color)'}` }}>Venango</h3>
                                            </span>
                                        </div>
                                    </div>

                                    <div className='relevance-container'>
                                        <div className='relevance-filters-body'>
                                            <div className='relevance-filter-heading' onClick={handleRelevance}>
                                                <p className='relevance-heading-text'>Sort By</p>
                                                <div className='selected-relevance-item'>
                                                    <p className='selected-relevance-text'>{selectedRelevanceValue}</p>
                                                    <i className='relevance-heading-icon'>
                                                        <MdKeyboardArrowDown className='relevance-heading-icon-rotate' color='var(--secondary-color)' size={15} />
                                                    </i>
                                                </div>
                                            </div>
                                            <div className={`relevance-filter-items ${relevanceTrue ? 'show-relevance-items' : ''}`}>
                                                {relevanceData.map((item, index) => (
                                                    <div
                                                        className='relevance-single-filter'
                                                        key={index}
                                                        onClick={() => {
                                                            setSelectedRelevanceValue(item.name);
                                                            setRelevanceTrue(false);
                                                            sortProducts(item.name)
                                                        }}>
                                                        <p className='relevance-single-filter-name'>{item.name}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                </div>


                                <div className={`product-main ${hideFilters ? 'increase-columns' : ''}`}>

                                    {products && products?.length > 0 ? (
                                        products?.map((item, index) => {
                                            return <ProductCardTwo
                                                key={item.slug}
                                                slug={item.slug}
                                                singleProductData={item}
                                                showOnPage={true}
                                                showExtraLines={true}
                                                titleHeight={true}
                                                productUid={item.uid}
                                                maxWidthAccordingToComp={"100%"}
                                                justWidth={hideFilters ? '100%' : '100%'}
                                                tagIcon={item.productTag ? item.productTag : '/Assets/icons/heart-vector.png'}
                                                tagClass={item.productTag ? 'tag-img' : 'heart-icon'}
                                                mainImage={`${item.image.image_url}`}
                                                productCardContainerClass="product-card"
                                                ProductSku={item.sku}
                                                tags={item.tags}
                                                allow_back_order={item?.allow_back_order}
                                                ProductTitle={item.name}
                                                reviewCount={item.average_rating}
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
                                        })
                                    ) : (
                                        Array.from({ length: 3 }).map((_, index) => (
                                            <ProductCardShimmer key={index} width={'100%'} />
                                        ))
                                    )}

                                </div>
                                {/* Product Card Code End */}

                                <div className='view-more-products-button-div'>
                                    {totalPages?.totalPages > 1 ? (
                                        <div className='view-more-products-pagination-main'>
                                            <div className='pagination-buttons-container'>
                                                <span
                                                    className={activePageIndex === 1 ? 'disabled' : ''}
                                                    onClick={handlePrevPage}
                                                    style={{
                                                        pointerEvents: activePageIndex === 1 ? 'none' : 'auto',
                                                        color: activePageIndex === 1 ? '#ccc' : 'var(--tertiary-color)',
                                                    }}
                                                >
                                                    <FaRegArrowAltCircleLeft
                                                        size={18}
                                                        style={{
                                                            pointerEvents: activePageIndex === 1 ? 'none' : 'auto',
                                                            color: activePageIndex === 1 ? '#ccc' : 'var(--tertiary-color)',
                                                        }}
                                                    />
                                                    Prev
                                                </span>
                                                {Array.from({ length: totalPages?.totalPages }).map((_, index) => {

                                                    const pageNumber = index + 1;
                                                    const shouldShow =
                                                        pageNumber === activePageIndex ||
                                                        pageNumber === activePageIndex - 1 ||
                                                        pageNumber === activePageIndex + 1 ||
                                                        (activePageIndex === 1 && pageNumber === 3) ||
                                                        (activePageIndex === totalPages?.totalPages && pageNumber === totalPages?.totalPages - 2);

                                                    return shouldShow ? (
                                                        <span
                                                            key={pageNumber}
                                                            onClick={() => handleActivePage(pageNumber)}
                                                            className={activePageIndex === pageNumber ? 'active-page-span' : ''}
                                                        >
                                                            {pageNumber}
                                                        </span>
                                                    ) : null;
                                                })}
                                                <span
                                                    className={activePageIndex === totalPages?.totalPages ? 'disabled' : ''}
                                                    onClick={handleNextPage}
                                                    style={{
                                                        pointerEvents: activePageIndex === totalPages?.totalPages ? 'none' : 'auto',
                                                        color: activePageIndex === totalPages?.totalPages ? '#ccc' : 'var(--tertiary-color)',
                                                    }}
                                                >
                                                    Next
                                                    <FaRegArrowAltCircleRight
                                                        size={18}
                                                        style={{
                                                            pointerEvents: activePageIndex === totalPages?.totalPages ? 'none' : 'auto',
                                                            color: activePageIndex === totalPages?.totalPages ? '#ccc' : 'var(--tertiary-color)',
                                                        }}
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <></>
                                    )}



                                </div>

                            </div>
                        )}


                    </div>
                )
            }



            {/* Mobile view product section */}
            <div className='mobile-view-product-and-filter-section'>

                <div className='mobile-view-filters-section'>

                    <div className='mobile-view-filter-head'>
                        <div className='mobile-view-product-count'>
                            <p>214 items</p>
                            <p>Starting at $ 299</p>
                        </div>
                        <div className='mobile-view-product-card-grid-select'>
                            <div className={`mobile-view-card-grid-single-col ${activeGrid === 'single-col' ? 'grid-active' : ''}`} onClick={() => handleActiveGrid('single-col')}></div>
                            <div className='mobile-view-card-grid-dual-col' onClick={() => handleActiveGrid('dual-col')}>
                                <div className={`mobile-view-card-grid-dual-col-inner ${activeGrid !== 'single-col' ? 'active-dual-col' : ''}`}></div>
                                <div className={`mobile-view-card-grid-dual-col-inner ${activeGrid !== 'single-col' ? 'active-dual-col' : ''}`}></div>
                            </div>
                        </div>
                    </div>

                    <div className='mobile-view-filter-body'>
                        <button className='mobile-view-show-filters' onClick={handleMobileFilters}>
                            <Image src={'/Assets/icons/humberger-icon.png'} fill alt='filter' />
                            Show Filter
                        </button>
                        <button className={`mobile-view-sort-btn`} onClick={handleOpenSortModal}>
                            <Image src={'/Assets/icons/arrow-up-donw.png'} fill alt='arrow up down' />
                            Sort
                        </button>
                    </div>

                </div>

                <div className={`${selectedGrid === 'single-col' ? 'mobile-view-product-single-column' : 'mobile-view-products-main-container'} `}>

                    {products.length === 0 ? (
                        selectedGrid === 'single-col' ?
                            Array.from({ length: 1 }).map((_, index) => (
                                <ProductCardShimmer width={'100%'} key={index} />
                            )) : Array.from({ length: 2 }).map((_, index) => (
                                <ProductCardShimmer width={'100%'} key={index} />
                            ))
                    ) : (
                        products.map((item, index) => {
                            return <ProductCardTwo
                                key={item.slug}
                                slug={item.slug}
                                singleProductData={item}
                                maxWidthAccordingToComp={"100%"}
                                justWidth={'100%'}
                                showOnPage={true}
                                showExtraLines={true}
                                percent={'12%'}
                                colTwo={selectedGrid === 'single-col' ? false : true}
                                tagIcon={item.productTag ? item.productTag : '/Assets/icons/heart-vector.png'}
                                tagClass={item.productTag ? 'tag-img' : 'heart-icon'}
                                mainImage={`${item.image.image_url}`}
                                productCardContainerClass="product-card"
                                ProductSku={item.sku}
                                tags={item.tags}
                                allow_back_order={item?.allow_back_order}
                                ProductTitle={item.name}
                                reviewCount={item.average_rating}
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
                        })
                    )}
                </div>

                <div className='view-more-products-pagination-main'>
                    <div className='pagination-buttons-container'>
                        <span
                            className={activePageIndex === 1 ? 'disabled' : ''}
                            onClick={handlePrevPage}
                            style={{
                                pointerEvents: activePageIndex === 1 ? 'none' : 'auto',
                                color: activePageIndex === 1 ? '#ccc' : 'var(--tertiary-color)',
                            }}
                        >
                            <FaRegArrowAltCircleLeft
                                size={18}
                                style={{
                                    pointerEvents: activePageIndex === 1 ? 'none' : 'auto',
                                    color: activePageIndex === 1 ? '#ccc' : 'var(--tertiary-color)',
                                }}
                            />
                            <p className='hide-on-mob'> Previous </p>
                        </span>

                        {Array.from({ length: totalPages?.totalPages }).map((_, index) => {

                            const pageNumber = index + 1;
                            const shouldShow =
                                pageNumber === activePageIndex ||
                                pageNumber === activePageIndex - 1 ||
                                pageNumber === activePageIndex + 1 ||
                                (activePageIndex === 1 && pageNumber === 3) ||
                                (activePageIndex === totalPages?.totalPages && pageNumber === totalPages?.totalPages - 2);

                            return shouldShow ? (
                                <span
                                    key={pageNumber}
                                    onClick={() => handleActivePage(pageNumber)}
                                    className={activePageIndex === pageNumber ? 'active-page-span' : ''}
                                >
                                    {pageNumber}
                                </span>
                            ) : null;
                        })}

                        <span
                            className={activePageIndex === totalPages?.totalPages ? 'disabled' : ''}
                            onClick={handleNextPage}
                            style={{
                                pointerEvents: activePageIndex === totalPages?.totalPages ? 'none' : 'auto',
                                color: activePageIndex === totalPages?.totalPages ? '#ccc' : 'var(--tertiary-color)',
                            }}
                        >
                            <p className='hide-on-mob'> Next </p>
                            <FaRegArrowAltCircleRight
                                size={18}
                                style={{
                                    pointerEvents: activePageIndex === totalPages?.totalPages ? 'none' : 'auto',
                                    color: activePageIndex === totalPages?.totalPages ? '#ccc' : 'var(--tertiary-color)',
                                }}
                            />
                        </span>
                    </div>
                </div>
            </div>

            <CartSidePannel
                cartData={cartProducts}
                addToCartClicked={addToCartClicked}
                handleCartSectionClose={handleCartSectionClose}
                removeFromCart={removeFromCart}
                decreamentQuantity={decreamentQuantity}
                increamentQuantity={increamentQuantity}
            />
            <QuickView
                setQuickViewProduct={quickViewProduct}
                quickViewShow={quickViewClicked}
                quickViewClose={handleQuickViewClose}
            />
            <MobileViewProductFilters
                showMobileFilters={mobileFilters}
                setMobileFilters={setMobileFilters}
                filtersData={allFilters}
                subCategorySlug={subCategorySlug}
                priceRange={priceRange}
                tempRange={priceRange}
                setTampRange={setPriceRange}
                setPriceRange={setPriceRange}
                colorValue={colorValue}
                setColorValue={setColorValue}
                handleColor={handleColorCheck}
                handleRating={handleRatingFilter}
                handleCategory={handleCategorySelect}
                handlePriceRange={handleRangeChange}
            />
            <SortModal
                isOpenSort={showSortModal}
                handleCloseSortModal={handleCloseSortModal}
                setSelectedOption={setSelectedOption}
                handleSelect={handleSelectMobileRelevanceValue}
            />
            <SnakBar
                message={wishlistMessage}
                openSnakeBarProp={openSnakeBar}
                setOpenSnakeBar={setOpenSnakeBar}
                onClick={handleCloseSnakeBar}
            />
            <ProductInfoModal
                openModal={isInfoOpen}
                closeModal={handleCloseInfoModal}
            />
        </div>
    )
}
export default Products