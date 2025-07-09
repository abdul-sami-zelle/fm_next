// // 'use client'

// // import React, { useEffect, useState } from 'react'
// // import './MobileViewProductFilters.css'
// // import RatingReview from '../starRating/starRating';
// // import DoubleRangeSlider from '../../../Global-Components/MultiRangeBar/MultiRange';
// // import { IoIosClose } from "react-icons/io";
// // import Image from 'next/image';
// // import { FaPlus, FaMinus } from "react-icons/fa6";
// // import build from 'next/dist/build';

// // const MobileViewProductFilters = (
// //     {
// //         showMobileFilters,
// //         setMobileFilters,
// //         filtersData,
// //         priceRange,
// //         setPriceRange,
// //         handleColor,
// //         handleRating,
// //         handleCategory,
// //         colorValue,
// //         setColorValue,
// //         handlePriceRange,
// //         // tempRange, setTampRange
// //     }) => {


// //     const handleFiltersClose = () => {
// //         setMobileFilters(false)
// //     }

// //     const [colorFilter, setColorFilter] = useState('');
// //     const [ratingFilter, setRatingFilter] = useState('')
// //     const [categoryFilter, setCategoryFilter] = useState('')

// //     const handleFilterType = (type) => {
// //         setColorFilter((prevOpen) => prevOpen === type ? '' : type)
// //         setRatingFilter((prevOpen) => prevOpen === type ? '' : type);
// //         setCategoryFilter((prevOpen) => prevOpen === type ? '' : type)
// //     }
// //     // const [showAllFilters, setShowAllFilters] = useState(false)
// //     // const handleShowAllFilters = () => {
// //     //     setShowAllFilters(!showAllFilters)
// //     // }

// //     // const [tempRange, setTampRange] = useState([])

// //     const handleUpdateRange = (newRange) => {
// //         console.log("new temp range", newRange)
// //         setPriceRange(newRange);
// //     }


// //     const [tempColorValue, setTempColorValue] = useState('');
// //     const [tempRatingValue, setTempRatingValue] = useState([]);
// //     const [tempCategoryValue, setTempCategoryValue] = useState([])

// //     const handleMobileColorCheck = (value, name) => {
// //         console.log("temp color value", value)
// //         const updatedColorValue = colorValue.includes(value) ?
// //             colorValue.filter((item) => item !== value) :
// //             [...colorValue, value]

// //         // console.log("updated color value" ,updatedColorValue)
// //         setTempColorValue(value)
// //     }

// //     const handleMobileRatingFilter = (value) => {
// //         const updatedRating = tempRatingValue.includes(value) ?
// //             tempRatingValue.filter((item) => item !== value) :
// //             [...tempRatingValue, value];

// //         setTempRatingValue(updatedRating)
// //     }

// //     const handleMobileCategorySelect = (value) => {
// //         const updatedCategory = tempCategoryValue.includes(value) ?
// //             tempCategoryValue.filter((item) => item !== value) :
// //             [...tempCategoryValue, value]

// //         setTempCategoryValue(updatedCategory)
// //     }



// //     const handlePriceRangeClick = () => {
// //         // console.log("price changes", priceRange)
// //         // if (
// //         //     priceRange[0] !== priceRange[0] ||
// //         //     priceRange[1] !== priceRange[1]
// //         // ) {
// //         //     handlePriceRange(priceRange);
// //         // } 


// //         // if (tempColorValue !== '') {
// //         //     handleColor(tempColorValue)
// //         // }

// //         // if (tempRatingValue.length > 0) {
// //         //     handleRating(tempRatingValue);
// //         // }
// //         // if (tempCategoryValue.length > 0) {
// //         //     handleCategory(tempCategoryValue)
// //         // }



// //         setMobileFilters(false)

// //     }

// //     return (
// //         <div className={`mobile-view-flters-popup ${showMobileFilters ? 'show-mobile-filter-popup' : ''}`}>
// //             <button className='close-mobile-filters' onClick={handleFiltersClose}>
// //                 <IoIosClose size={25} color='#595959' />
// //             </button>
// //             <div className='mobile-view-filters-head'>
// //                 <a href='/'>
// //                     <Image src={'/Assets/Logo/main-logo.png'} width={200} height={35} alt='logo' />
// //                 </a>
// //             </div>

// //             <div className='mobile-view-filters-body'>
// //                 <div className='mobile-view-filters-body-head'>
// //                     <h3>Filters</h3>
// //                     <a>Clear Filters</a>
// //                 </div>
// //                 <div className='mobile-view-filters-div'>

// //                     <DoubleRangeSlider
// //                         min={filtersData?.priceRange?.minPrice}
// //                         max={filtersData?.priceRange?.maxPrice}
// //                         initialRange={priceRange}
// //                         setInitialRange={setPriceRange}
// //                         onRangeChange={handleUpdateRange}
// //                         minLabel='Min Price:'
// //                         maxLabel='Max Price:'
// //                     />

// //                     <div className='mobile-view-single-filter-dropdown'>
// //                         <div className='mobile-view-single-type'
// //                             onClick={() => handleFilterType('open-color')}
// //                         >
// //                             <p>{filtersData?.colors?.[0]?.name}</p>

// //                             {colorFilter === 'open-color' ? <FaMinus size={20} color='#595959' /> : <FaPlus size={20} color='#595959' />}
// //                         </div>
// //                         <div className={`mobile-single-type-filters 
// //                                 ${colorFilter === 'open-color' ? 'show-filter-type' : ''}`
// //                         }>
// //                             {filtersData?.colors?.[0]?.options.map((item, index) => (
// //                                 <label className='single-filter-label' key={index}>
// //                                     <input
// //                                         type='checkbox'
// //                                         placeholder='checkbox'
// //                                         value={item.name}
// //                                         checked={tempColorValue?.includes(item.value)}
// //                                         onChange={(e) => handleMobileColorCheck(item.value)}
// //                                         style={{ backgroundColor: item.value, border: `2px solid ${item.value}` }}
// //                                         className='color-custom-checkbox'
// //                                         id={`filter-${index}`}
// //                                     />
// //                                     {item.name}
// //                                 </label>
// //                             ))}
// //                         </div>
// //                     </div>

// //                     {/* Rating Filter */}

// //                     <div className='mobile-view-single-filter-dropdown'>
// //                         <div className='mobile-view-single-type'
// //                             onClick={() => handleFilterType('open-rating')}
// //                         >
// //                             <p>Ratings</p>
// //                             {colorFilter === 'open-rating' ? <FaMinus size={20} color='#595959' /> : <FaPlus size={20} color='#595959' />}
// //                         </div>
// //                         <div className={`mobile-single-type-filters 
// //                                 ${colorFilter === 'open-rating' ? 'show-filter-type' : ''}`
// //                         }>
// //                             {[...Array(5).keys()].reverse().map((item, index) => (
// //                                 <span key={index} className={`color-span`} >
// //                                     <input
// //                                         type='checkbox'
// //                                         placeholder='checkbox'
// //                                         value={item + 1}
// //                                         onChange={(e) => handleMobileRatingFilter(e.target.value)}
// //                                         className='custom-checkbox'
// //                                         id={`filter-${index}`}
// //                                     />
// //                                     <label htmlFor={`filter-${5 - item}`}>
// //                                         <RatingReview rating={item + 1} disabled={true} size={"20px"} />
// //                                     </label>
// //                                 </span>
// //                             ))}
// //                         </div>
// //                     </div>

// //                     <div className='mobile-view-single-filter-dropdown'>
// //                         <div className='mobile-view-single-type'
// //                             onClick={() => handleFilterType('open-category')}
// //                         >
// //                             <p>Categories</p>
// //                             {categoryFilter === 'open-category' ? <FaMinus size={20} color='#595959' /> : <FaPlus size={20} color='#595959' />}
// //                         </div>
// //                         <div className={`mobile-single-type-filters 
// //                                 ${categoryFilter === 'open-category' ? 'show-filter-type' : ''}`
// //                         }> 
// //                             {filtersData?.categories?.map((item, index) => (
// //                                 <span key={index} className={`color-span`} >
// //                                     <input
// //                                         type='checkbox'
// //                                         placeholder='checkbox'
// //                                         value={item.name}
// //                                         onChange={(e) => handleMobileCategorySelect(e.target.value)}
// //                                         className='custom-checkbox'
// //                                         id={`filter-${index}`}
// //                                     />
// //                                     <label htmlFor={`filter-${index}`}>{item.name}</label>
// //                                 </span>
// //                             ))}
// //                         </div>
// //                     </div>

// //                 </div>

// //                 {/* <div className='mobile-view-filters-togle-button'>
// //                     <button className='mobile-view-more-filters-button' onClick={handleShowAllFilters}>
// //                         {showAllFilters ? 'View Less Filters' : 'View All Filters'}
// //                     </button>
// //                 </div> */}
// //                 <div className='mobile-view-filters-togle-button'>
// //                     <button className='mobile-view-result-button' onClick={handlePriceRangeClick}>
// //                         View Result
// //                     </button>
// //                 </div>
// //             </div>

// //         </div>
// //     )
// // }

// // export default MobileViewProductFilters



// 'use client'

// import React, { useEffect, useState } from 'react'
// import './MobileViewProductFilters.css'
// import crossBtn from '../../../Assets/icons/close-btn.png'
// import mainLogo from '../../../Assets/Logo/m_logo_360 2.png';
// import AddBtn from '../../../Assets/icons/add-bold-btn.png'
// import axios from 'axios';
// import { url } from '../../../utils/api';
// import RatingReview from '../starRating/starRating';
// import DoubleRangeSlider from '../../../Global-Components/MultiRangeBar/MultiRange';

// const MobileViewProductFilters = (
//     {
//         showMobileFilters,
//         setMobileFilters,
//         filtersData,
//         priceRange,
//         setPriceRange,
//         handleColor,
//         handleRating,
//         handleCategory,
//         colorValue,
//         setColorValue,
//         handlePriceRange,
//         // tempRange, setTampRange
//     }) => {


//     const handleFiltersClose = () => {
//         setMobileFilters(false)
//     }

//     const [colorFilter, setColorFilter] = useState('');
//     const [ratingFilter, setRatingFilter] = useState('')
//     const [categoryFilter, setCategoryFilter] = useState('')

//     const handleFilterType = (type) => {
//         setColorFilter((prevOpen) => prevOpen === type ? '' : type)
//         setRatingFilter((prevOpen) => prevOpen === type ? '' : type);
//         setCategoryFilter((prevOpen) => prevOpen === type ? '' : type)
//     }
//     const [showAllFilters, setShowAllFilters] = useState(false)
//     const handleShowAllFilters = () => {
//         setShowAllFilters(!showAllFilters)
//     }

//     // const [tempRange, setTampRange] = useState([])
//     const [tempColorValue, setTempColorValue] = useState();
//     const [tempRatingValue, setTempRatingValue] = useState([]);
//     const [tempCategoryValue, setTempCategoryValue] = useState([])

    


//     const handleMobileColorCheck = (value, name) => {
        

//         const updatedColorValue = colorValue.includes(value) ?
//                     colorValue.filter((item) => item !== value) :
//                     [...colorValue, value]

//             setTempColorValue(updatedColorValue)
//             console.log("mobile color value", updatedColorValue)
//     }

//     const handleMobileRatingFilter = (value) => {
//         const updatedRating = tempRatingValue.includes(value) ?
//             tempRatingValue.filter((item) => item !== value) :
//             [...tempRatingValue, value];

//         setTempRatingValue(updatedRating)
//     }

//     const handleMobileCategorySelect = (value) => {
//         const updatedCategory = tempCategoryValue.includes(value) ?
//             tempCategoryValue.filter((item) => item !== value) :
//             [...tempCategoryValue, value]

//         setTempCategoryValue(updatedCategory)
//         console.log("category temp data", tempCategoryValue)
//     }



//     const handlePriceRangeClick = () => {
//             handlePriceRange(priceRange)
        
//             handleColor(tempColorValue)

//             handleRating(tempRatingValue);
//             handleCategory(tempCategoryValue)

        

//         setMobileFilters(false)

//     }

//     return (
//         <div className={`mobile-view-flters-popup ${showMobileFilters ? 'show-mobile-filter-popup' : ''}`}>
//             <button className='close-mobile-filters' onClick={handleFiltersClose}>
//                 <img src={crossBtn} alt='close btn' />
//             </button>
//             <div className='mobile-view-filters-head'>
//                 <a href='/'>
//                     <img src={mainLogo} alt='logo' />
//                 </a>
//             </div>

//             <div className='mobile-view-filters-body'>
//                 <div className='mobile-view-filters-body-head'>
//                     <h3>Filters</h3>
//                     <a>Clear Filters</a>
//                 </div>
//                 <div className='mobile-view-filters-div'>

//                     <DoubleRangeSlider
//                         min={filtersData?.priceRange?.minPrice}
//                         max={filtersData?.priceRange?.maxPrice}
//                         initialRange={priceRange}
//                         setInitialRange={setPriceRange}
//                         onRangeChange={handlePriceRange}
//                         minLabel='Min Price:'
//                         maxLabel='Max Price:'
//                     />

//                     <div className='mobile-view-single-filter-dropdown'>
//                         <div className='mobile-view-single-type'
//                             onClick={() => handleFilterType('open-color')}
//                         >
//                             <p>{filtersData?.colors?.[0]?.name}</p>
//                             <img src={AddBtn} alt='add btn' className={`show-filter-add-button 
//                                      ${colorFilter === 'open-color' ? 'mobile-filter-section-button-rotate' : ''}`
//                             } />
//                         </div>
//                         <div className={`mobile-single-type-filters 
//                                 ${colorFilter === 'open-color' ? 'show-filter-type' : ''}`
//                         }>
//                             {filtersData?.colors?.[0]?.options.map((item, index) => (
//                                 <label className='single-filter-label' key={index}>
//                                     <input
//                                         type='checkbox'
//                                         placeholder='checkbox'
//                                         value={item.name}
//                                         checked={tempCategoryValue.includes(item.name)}
//                                         onChange={(e) => handleMobileColorCheck(item.value, item.name)}
//                                         style={{ backgroundColor: item.value, border: `2px solid ${item.value}` }}
//                                         className='color-custom-checkbox'
//                                         id={`filter-${index}`}
//                                     />
//                                     {item.name}
//                                 </label>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Rating Filter */}

//                     <div className='mobile-view-single-filter-dropdown'>
//                         <div className='mobile-view-single-type'
//                             onClick={() => handleFilterType('open-rating')}
//                         >
//                             <p>Ratings</p>
//                             <img src={AddBtn} alt='add btn' className={`show-filter-add-button 
//                                      ${colorFilter === 'open-rating' ? 'mobile-filter-section-button-rotate' : ''}`
//                             } />
//                         </div>
//                         <div className={`mobile-single-type-filters 
//                                 ${colorFilter === 'open-rating' ? 'show-filter-type' : ''}`
//                         }>
//                             {[...Array(5).keys()].reverse().map((item, index) => (
//                                 <span key={index} className={`color-span`} >
//                                     <input
//                                         type='checkbox'
//                                         placeholder='checkbox'
//                                         value={item + 1}
//                                         onChange={(e) => handleMobileRatingFilter(e.target.value)}
//                                         className='custom-checkbox'
//                                         id={`filter-${index}`}
//                                     />
//                                     <label htmlFor={`filter-${5 - item}`}>
//                                         <RatingReview rating={item + 1} disabled={true} size={"20px"} />
//                                     </label>
//                                 </span>
//                             ))}
//                         </div>
//                     </div>

//                     <div className='mobile-view-single-filter-dropdown'>
//                         <div className='mobile-view-single-type'
//                             onClick={() => handleFilterType('open-category')}
//                         >
//                             <p>Categories</p>
//                             <img src={AddBtn} alt='add btn' className={`show-filter-add-button 
//                                      ${categoryFilter === 'open-category' ? 'mobile-filter-section-button-rotate' : ''}`
//                             } />
//                         </div>
//                         <div className={`mobile-single-type-filters 
//                                 ${categoryFilter === 'open-category' ? 'show-filter-type' : ''}`
//                         }>
//                             {filtersData?.categories?.map((item, index) => (
//                                 <span key={index} className={`color-span`} >
//                                     <input
//                                         type='checkbox'
//                                         placeholder='checkbox'
//                                         value={item.name}
//                                         onChange={(e) => handleMobileCategorySelect(e.target.value)}
//                                         className='custom-checkbox'
//                                         id={`filter-${index}`}
//                                     />
//                                     <label htmlFor={`filter-${index}`}>{item.name}</label>
//                                 </span>
//                             ))}
//                         </div>
//                     </div>

//                 </div>

//                 {/* <div className='mobile-view-filters-togle-button'>
//                     <button className='mobile-view-more-filters-button' onClick={handleShowAllFilters}>
//                         {showAllFilters ? 'View Less Filters' : 'View All Filters'}
//                     </button>
//                 </div> */}
//                 <div className='mobile-view-filters-togle-button'>
//                     <button className='mobile-view-result-button' onClick={handlePriceRangeClick}>
//                         View Result
//                     </button>
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default MobileViewProductFilters


'use client'

import React, { useEffect, useState } from 'react'
import './MobileViewProductFilters.css'
import crossBtn from '../../../Assets/icons/close-btn.png'
import mainLogo from '../../../Assets/Logo/m_logo_360 2.png';
import AddBtn from '../../../Assets/icons/add-bold-btn.png'
import axios from 'axios';
import { url } from '../../../utils/api';
import RatingReview from '../starRating/starRating';
import DoubleRangeSlider from '../../../Global-Components/MultiRangeBar/MultiRange';
import { IoIosClose } from "react-icons/io";
import Image from 'next/image';
import { FaPlus, FaMinus } from "react-icons/fa6";

const MobileViewProductFilters = (
    {
        showMobileFilters,
        setMobileFilters,
        filtersData,
        priceRange,
        setPriceRange,
        handleColor,
        handleRating,
        handleCategory,
        colorValue,
        setColorValue,
        handlePriceRange,
        ratingValue,
        clearFilters
    }) => {


    const handleFiltersClose = () => {
        setMobileFilters(false)
    }

    const [colorFilter, setColorFilter] = useState('');
    const [ratingFilter, setRatingFilter] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')

    const handleFilterType = (type) => {
        setColorFilter((prevOpen) => prevOpen === type ? '' : type)
        setRatingFilter((prevOpen) => prevOpen === type ? '' : type);
        setCategoryFilter((prevOpen) => prevOpen === type ? '' : type)
    }
    const [showAllFilters, setShowAllFilters] = useState(false)
    const handleShowAllFilters = () => {
        setShowAllFilters(!showAllFilters)
    }

    // const [tempRange, setTampRange] = useState([])
    const [tempColorValue, setTempColorValue] = useState();
    const [tempRatingValue, setTempRatingValue] = useState([]);
    const [tempCategoryValue, setTempCategoryValue] = useState([])




    const handleMobileColorCheck = (value, name) => {

        console.log("color val", value)
        const updatedColorValue = colorValue.includes(value) ?
            colorValue.filter((item) => item !== value) :
            [...colorValue, value]

        setTempColorValue(updatedColorValue)
    }

    const handleMobileRatingFilter = (value) => {
        const updatedRating = tempRatingValue.includes(value) ?
            tempRatingValue.filter((item) => item !== value) :
            [...tempRatingValue, value];

        setTempRatingValue(updatedRating)
    }

    const handleMobileCategorySelect = (value) => {
        const updatedCategory = tempCategoryValue.includes(value) ?
            tempCategoryValue.filter((item) => item !== value) :
            [...tempCategoryValue, value]

        setTempCategoryValue(updatedCategory)
    }



    const handlePriceRangeClick = () => {
        // handlePriceRange(priceRange)

        // handleColor(tempColorValue)

        // handleRating(tempRatingValue);
        // handleCategory(tempCategoryValue)



        setMobileFilters(false)

    }

    return (
        <div className={`mobile-view-flters-popup ${showMobileFilters ? 'show-mobile-filter-popup' : ''}`}>
            <button className='close-mobile-filters' onClick={handleFiltersClose}>
                {/* <img src={crossBtn} alt='close btn' /> */}
                <IoIosClose size={25} color='#595959' />
            </button>
            <div className='mobile-view-filters-head'>
                <a href='/'>
                    <Image src={'/Assets/Logo/main-logo.png'} width={200} height={35} alt='logo' />
                </a>
            </div>

            <div className='mobile-view-filters-body'>
                <div className='mobile-view-filters-body-head'>
                    <h3>Filters</h3>
                    <p onClick={clearFilters}>Clear Filters</p>
                </div>
                <div className='mobile-view-filters-div'>

                    <DoubleRangeSlider
                        min={filtersData?.priceRange?.minPrice}
                        max={filtersData?.priceRange?.maxPrice}
                        initialRange={priceRange}
                        setInitialRange={setPriceRange}
                        onRangeChange={handlePriceRange}
                        minLabel='Min Price:'
                        maxLabel='Max Price:'
                    />

                    <div className='mobile-view-single-filter-dropdown'>
                        <div className='mobile-view-single-type'
                            onClick={() => handleFilterType('open-color')}
                        >
                            <p>{filtersData?.colors?.[0]?.name}</p>
                            
                            {colorFilter === 'open-color' ? <FaMinus size={20} color='#595959' /> : <FaPlus size={20} color='#595959' />}
                        </div>
                        <div className={`mobile-single-type-filters 
                                ${colorFilter === 'open-color' ? 'show-filter-type' : ''}`
                        }>
                            {filtersData?.colors?.[0]?.options.map((item, index) => (
                                <label className='single-filter-label' key={index}>
                                    <input
                                        type='checkbox'
                                        placeholder='checkbox'
                                        value={item.name}
                                        checked={colorValue.includes(item.value)}
                                        onChange={(e) => handleColor(item.value)}
                                        style={{ backgroundColor: item.value, border: `2px solid ${item.value}` }}
                                        className='color-custom-checkbox'
                                        id={`filter-${index}`}
                                    />
                                    {item.name}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Rating Filter */}

                    <div className='mobile-view-single-filter-dropdown'>
                        <div className='mobile-view-single-type'
                            onClick={() => handleFilterType('open-rating')}
                        >
                            <p>Ratings</p>
                            {colorFilter === 'open-rating' ? <FaMinus size={20} color='#595959' /> : <FaPlus size={20} color='#595959' />}
                        </div>
                        <div className={`mobile-single-type-filters 
                                ${colorFilter === 'open-rating' ? 'show-filter-type' : ''}`
                        }>
                            {[...Array(5).keys()].reverse().map((item, index) => {
                                const rating = item + 1;
                                return <span key={index} className={`color-span`} >
                                    <input
                                        type='checkbox'
                                        placeholder='checkbox'
                                        value={rating}
                                        checked={ratingValue.includes(rating)}
                                        onChange={(e) => handleRating(Number(e.target.value))}
                                        className='custom-checkbox'
                                        id={`filter-${rating}`}
                                    />
                                    <label htmlFor={`filter-${5 - item}`}>
                                        <RatingReview rating={item + 1} disabled={true} size={"20px"} />
                                    </label>
                                </span>
    })}
                        </div>
                    </div>

                    {/* <div className='mobile-view-single-filter-dropdown'>
                        <div className='mobile-view-single-type'
                            onClick={() => handleFilterType('open-category')}
                        >
                            <p>Categories</p>
                            {categoryFilter === 'open-category' ? <FaMinus size={20} color='#595959' /> : <FaPlus size={20} color='#595959' />}
                        </div>
                        <div className={`mobile-single-type-filters 
                                ${categoryFilter === 'open-category' ? 'show-filter-type' : ''}`
                        }>
                            {filtersData?.categories?.map((item, index) => (
                                <span key={index} className={`color-span`} >
                                    <input
                                        type='checkbox'
                                        placeholder='checkbox'
                                        value={item.name}
                                        onChange={(e) => handleMobileCategorySelect(e.target.value)}
                                        className='custom-checkbox'
                                        id={`filter-${index}`}
                                    />
                                    <label htmlFor={`filter-${index}`}>{item.name}</label>
                                </span>
                            ))}
                        </div>
                    </div> */}

                </div>

                <div className='mobile-view-filters-togle-button'>
                    <button className='mobile-view-result-button' onClick={handlePriceRangeClick}>
                        View Result
                    </button>
                </div>
            </div>

        </div>
    )
}

export default MobileViewProductFilters