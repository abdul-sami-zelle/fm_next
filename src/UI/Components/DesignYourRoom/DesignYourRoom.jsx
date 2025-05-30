// import React, { useState } from 'react'
// import './DesignYourRoom.css'
// import ProductCardTwo from '../ProductCardTwo/ProductCardTwo'
// import { useList } from '@/context/wishListContext/wishListContext'
// import QuickView from '../QuickView/QuickView'
// import heart from '../../../Assets/icons/heart-vector.png'

// const DesignYourRoom = ({ data }) => {

//     const [quickViewProduct, setQuickViewProduct] = useState({})
//             const [quickViewClicked, setQuickView] = useState(false);
//     const handleQuickViewOpen = (item) => {
//         setQuickView(true);
//         setQuickViewProduct(item)

//     }
//     const handleQuickViewClose = () => { setQuickView(false) }


//     const { addToList, removeFromList, isInWishList } = useList()
//     const notify = (str) => toast.success(str);
//     const notifyRemove = (str) => toast.error(str)
//     const handleWishList = (item) => {
//         if (isInWishList(item.uid)) {
//             removeFromList(item.uid);
//             notifyRemove('Removed from wish list', {
//                 autoClose: 10000,
//                 className: "toast-message",
//             })
//         } else {
//             addToList(item)
//             notify("added to wish list", {
//                 autoClose: 10000,
//             })
//         }
//     }
//     return (
//         <div className='design-your-room-main-container'>
//             <h3>Design Your Room</h3>
//             <div className='design-your-room-cards-container'>
//                 {data && data.map((item, index) => (
//                     <ProductCardTwo
//                         key={index}
//                         slug={item.slug}
//                         singleProductData={item}
//                         maxWidthAccordingToComp={"98%"}
//                         justWidth={'100%'}
//                         showOnPage={true}
//                         percent={'12%'}
//                         showExtraLines={false}
//                         titleHeight={true}
//                         tagIcon={item.productTag ? item.productTag : heart}
//                         tagClass={item.productTag ? 'tag-img' : 'heart-icon'}
//                         mainImage={`${item.image.image_url}`}
//                         productCardContainerClass="product-card"
//                         ProductSku={item.sku}
//                         tags={item.tags}
//                         allow_back_order={item?.allow_back_order}
//                         ProductTitle={item.name}

//                         reviewCount={item.reviewCount}
//                         lowPriceAddvertisement={item.lowPriceAddvertisement}
//                         priceTag={item.regular_price}
//                         sale_price={item.sale_price}
//                         financingAdd={item.financingAdd}
//                         learnMore={item.learnMore}
//                         mainIndex={index}
//                         deliveryTime={item.deliveryTime}
//                         stock={item.manage_stock}
//                         attributes={item.attributes}
//                         // handleCardClick={() => handleProductClick(item)}
//                         handleQuickView={() => handleQuickViewOpen(item)}
//                         handleWishListclick={() => handleWishList(item)}
//                     />
//                 ))}
//             </div>
//             <div className='design-your-room-shuffle-button-container'>
//                 <button>Shuffle</button>
//             </div>

//             <QuickView
//                 setQuickViewProduct={quickViewProduct}
//                 quickViewShow={quickViewClicked}
//                 quickViewClose={handleQuickViewClose}
//             />
//         </div>
//     )
// }

// export default DesignYourRoom




import React, { useEffect, useState } from 'react'
import './DesignYourRoom.css'
import RecomProductCard from '../RecommendedProductCards/recomProdCard'
import QuickView from '../QuickView/QuickView'
import { toast } from 'react-toastify';

const DesignYourRoom = ({ data }) => {
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [remainingProducts, setRemainingProducts] = useState([]);

    const [quickViewProduct, setQuickViewProduct] = useState({});
    const [quickViewClicked, setQuickView] = useState(false);

    useEffect(() => {
        if (data && data.length > 0) {
            const initial = data.slice(0, 8);
            const remaining = data.slice(8);
            setDisplayedProducts(initial);
            setRemainingProducts(remaining);
        }
    }, [data]);

    const handleQuickViewOpen = (item) => {
        setQuickView(true);
        setQuickViewProduct(item);
    };

    const handleQuickViewClose = () => setQuickView(false);

    const handleShuffle = () => {
        const shuffled = [...data].sort(() => 0.5 - Math.random()).slice(0, 8);
        const newRemaining = data.filter(item => !shuffled.includes(item));
        setDisplayedProducts(shuffled);
        setRemainingProducts(newRemaining);
    };

    const handleRemoveProduct = (uid) => {
        setDisplayedProducts((prevDisplayed) => {
            const filtered = prevDisplayed.filter(item => item.uid !== uid);

            if (remainingProducts.length > 0) {
                const [nextProduct, ...rest] = remainingProducts;
                setRemainingProducts(rest);
                return [...filtered, nextProduct]; // replace the removed one
            }

            return filtered;
        });
    };

    const handleSingleShuffle = (uid) => {
    setDisplayedProducts((prevDisplayed) => {
        const index = prevDisplayed.findIndex((item) => item.uid === uid);
        if (index === -1 || remainingProducts.length === 0) return prevDisplayed;

        const [newProduct, ...rest] = remainingProducts;
        const updated = [...prevDisplayed];
        updated[index] = newProduct;
        setRemainingProducts(rest);
        return updated;
    });
};


    return (
        <div className='design-your-room-main-container'>
            <h3>Build Your Room</h3>
            <div className='design-your-room-cards-container'>
                {displayedProducts.map((item, index) => (
                    <RecomProductCard
                        key={item.uid || index}
                        handleQuickView={() => handleQuickViewOpen(item)}
                        handleRemoveProduct={() => handleRemoveProduct(item.uid)}
                        handleSingleShuffle={() => handleSingleShuffle(item.uid)}
                        slug={item.slug}
                        singleProductData={item}
                        mainImage={`${item.image.image_url}`}
                    />
                ))}
            </div>

            <div className='design-your-room-shuffle-button-container'>
                <button onClick={handleShuffle}>Shuffle</button>
            </div>

            <QuickView
                setQuickViewProduct={quickViewProduct}
                quickViewShow={quickViewClicked}
                quickViewClose={handleQuickViewClose}
            />
        </div>
    );
};

export default DesignYourRoom;