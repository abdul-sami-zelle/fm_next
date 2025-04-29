import React, { useEffect, useState } from 'react'
import './ProductStickyTabBar.css'
import { CiDeliveryTruck, CiLocationOn } from "react-icons/ci";
import { formatedPrice } from '../../../../utils/api';
import LocationPopUp from '../../LocationPopUp/LocationPopUp';
import { useGlobalContext } from '../../../../context/GlobalContext/globalContext';

const ProductStickyTabBar = (
    {
        sectionRefs = {},
        isSticky,
        setIsSticky,
        productData,
        addToCart0,
        handleAddToCartProduct,
        variationData,
        isProtectionCheck,
        quantity
    }) => {

    const tabBarItems = ['Description', 'Details', 'Recommendations', 'Reviews'];
    const [activeTab, setIsActiveTab] = useState('Description');
    const [searchLocation, setSearchLocation] = useState(false);
    // const [isSticky, setIsSticky] = useState(false);

    const { info, fetchAllstores } = useGlobalContext();
 
    useEffect(() => {
        const handleScroll = () => {
            const container = document.querySelector('.product-sticky-tab-bar-main-container');
            if (container) {
                const rect = container.getBoundingClientRect();
                if (rect.top <= 51) {
                    setIsSticky(true);
                } else {
                    setIsSticky(false);
                }
            }

            // Detect Active Tab Based on Scroll
            let currentTab = 'Description';
            tabBarItems.forEach((tab) => {
                const section = sectionRefs[tab]?.current;
                if (section) {
                    const { top } = section.getBoundingClientRect();
                    if (top <= 100) {
                        currentTab = tab;
                    }
                }
            })
            setIsActiveTab(currentTab)
            // setPrevScrollY(currentScrollY);

            // ✅ NEW: If "Reviews" tab is reached via scrolling, scroll the tab container to the last position
            const tabContainer = document.querySelector('.product-sticky-fixed-tabs-container');
            if (tabContainer) {
                if (currentTab === 'Reviews') {
                    tabContainer.scrollLeft = tabContainer.scrollWidth; // ✅ Scroll to last tab when reaching "Reviews"
                } else if (currentTab === 'Description') {
                    tabContainer.scrollLeft = 0; // ✅ Scroll back to the first tab when reaching "Description"
                }
            }

        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, [sectionRefs]);

    const handleTabClick = (tab) => {
        const section = sectionRefs[tab]?.current;
        const stickyBarHeight = document.querySelector('.product-sticky-fixed-tabs-container')?.offsetHeight || 0;
        const offset = 0; // Adjust this value as needed for extra spacing

        // if (section) {
        //     section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // }

        if (section) {
            const sectionTop = section.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: sectionTop - stickyBarHeight - offset, // Scroll with offset
                behavior: 'smooth',
            });
        }

        // ✅ NEW: Scroll the tab container to the last position if "Reviews" is clicked
        const tabContainer = document.querySelector('.product-sticky-fixed-tabs-container');
        if (tabContainer) {
            if (tab === 'Reviews') {
                tabContainer.scrollLeft = tabContainer.scrollWidth; // ✅ Moves to the last tab when "Reviews" is clicked
            } else if (tab === 'Description') {
                tabContainer.scrollLeft = 0; // ✅ Moves to the first tab when "Description" is clicked
            }
        }
    }

    const [locationDetails, setLocationDetails] = useState({
        zipCode: '',
        city: '',
        state: '',
        country: ''
      });

    const handleSearchModal = () => {
    setSearchLocation(true)
  }

  const handleCloseSearch = () => {
    setSearchLocation(false)
  }

  const getDeliveryDate = () => {
    const options = {weekday: "long", month: "long", day: "numeric"};
    const today = new Date();

    const optionWithTimeZone = {...options, timeZone: "America/New_York"};

    today.setDate(today.getDate() + 5);
    return today.toLocaleDateString("en-us", optionWithTimeZone)
  }

    return (
        <>
            <div className={`product-sticky-tab-bar-main-container ${isSticky ? 'add-margin' : ''}`}>
                {isSticky && <div className={`product-sticky-fixed-container`}>
                    <div className='product-sticky-fixed-detail-and-add-to-cart'>
                        <div className='product-sticky-fixed-details'>
                            <h3>{productData?.name}</h3>
                            <span className='product-sticky-fixed-delivery-detail'>
                                <CiDeliveryTruck size={20} color='var(--secondary-color)' />
                                <p>Get it by</p>
                                <strong>{getDeliveryDate()}</strong>
                                <i onClick={handleSearchModal}>
                                    <CiLocationOn scale={20} />
                                    <p>{info.locationData.zipCode} {info.locationData.stateCode}</p>
                                </i>
                            </span>
                        </div>
                        <div className='product-sticky-fixed-add-to-cart'>
                            <div className='product-detail-fixed-sale-price'>
                                <p>Sale</p>
                                {productData.sale_price !== '' ? (
                                    <span>
                                        <h3>{formatedPrice(productData?.sale_price)}</h3>
                                        <del>was {formatedPrice(productData?.regular_price)}</del>
                                    </span>
                                ) : (
                                    <h3>{formatedPrice(productData?.regular_price)}</h3>
                                )}
                            </div>
                            <button
                                onClick={() => {
                                    addToCart0(productData, variationData, !isProtectionCheck ? 1 : 0, quantity)
                                    handleAddToCartProduct(productData);
                                }
                                }
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>

                    


                    <div className='product-sticky-fixed-tabs-container'>
                        {tabBarItems.map((item, index) => (
                            <div
                                key={index}
                                className={`product-sticky-tab-bar-item-container ${activeTab === item ? 'active-tab' : ''}`}
                                onClick={() => handleTabClick(item)}
                            >
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>}


                <div className='product-sticky-tab-bar'>
                    {tabBarItems.map((item, index) => (
                        <div
                            key={index}
                            className={`product-sticky-tab-bar-item-container ${activeTab === item ? 'active-tab' : ''}`}
                            onClick={() => handleTabClick(item)}
                        >
                            <p>{item}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Location Modal */}
            <LocationPopUp
                searchLocation={searchLocation}
                handleCloseSearch={handleCloseSearch}
                setLocationDetails={setLocationDetails}
                locationDetails={locationDetails}
            />
        </>

    )
}

export default ProductStickyTabBar
