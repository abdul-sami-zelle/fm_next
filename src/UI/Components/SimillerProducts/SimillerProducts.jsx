import React, {useState, useEffect} from 'react'
import './SimillerProducts.css'
// import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { url } from '../../../utils/api'
import heart from '../../../Assets/icons/heart-vector.png'
import ProductCardShimmer from '../Loaders/productCardShimmer/productCardShimmer'
import { useList } from '../../../context/wishListContext/wishListContext'
import Slider from 'react-slick'
import star from '../../../Assets/icons/black-star.png'
import leftArrow from '../../../Assets/icons/arrow-left-charcol.png'
import rightArrow from '../../../Assets/icons/arrow-right-charcol.png'
import { toast } from 'react-toastify'
import ProductCardTwo from '../ProductCardTwo/ProductCardTwo'
import QuickView from '../QuickView/QuickView'
import { useRouter } from 'next/navigation'

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className={`cart-latest-products-slider-arrow cart-latest-products-slider-arrow-left ${className}`} >
      <img src={leftArrow} alt='arrow' />
    </div>
  )
}
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className={`cart-latest-products-slider-arrow cart-latest-products-slider-arrow-right ${className}`} >
      <img src={rightArrow} alt='arrow' />
    </div>
  )
}

const SimillerProducts = ({collection, isPadding}) => {
    const simillerProducts = collection.map((item) => item);
    const [data, setData] = useState()
    const fetchData = async () => {
        const api = `/api/v1/products/get/`;
        try {
            const request = simillerProducts.map(async (item) => {
                const response = await axios.get(`${url}${api}${item}`);
                return response.data.products;
            });
            const myCollections = await Promise.all(request);
            const filteredMyCollection = myCollections.flat();
            return filteredMyCollection;
        } catch (error) {
            console.error("error geting data", error)
        }
    }


    const getchMyCollectionProducts = async () => {
        const products = await fetchData();
        setData(products);
    }
    useEffect(() => {
        getchMyCollectionProducts()
    }, [])


    // Card title words limit
    // const maxLength = 30;
    // const truncateTitle = (title, maxLength) => {
    //     if(!title) return '';
    //     return title.length > maxLength ? title.slice(0, maxLength) + '...' : title
    // };

    // product color variation index from redux

        // const navigate = useNavigate()
        const [quickViewProduct, setQuickViewProduct] = useState({})
        const [quickViewClicked, setQuickView] = useState(false);
        const handleQuickViewOpen = (item) => {
            setQuickView(true);
            setQuickViewProduct(item)

        }

  const handleQuickViewClose = () => { setQuickView(false) }

        // const handleQuickViewClose = () => { setQuickView(false) }

    const navigate = useRouter();
    // const handleCardClick = (item) => {
    //     navigate(`/product/${item.slug}`, {state: {products: item}})
    // }

    // wish list
    
    const {addToList, removeFromList, isInWishList} = useList()
    const notify = (str) => toast.success(str);
    const notifyRemove = (str) => toast.error(str)
    const handleWishList = (item) => {
        if(isInWishList(item.uid)){
            removeFromList(item.uid);
            notifyRemove('Removed from wish list', {
                autoClose: 10000,
                className: "toast-message",
            })
        }else{
            addToList(item)
            notify("added to wish list", {
                autoClose: 10000,
            })
        }
    }

    // Slick
  let settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    nextArrow: 
      data && data.length > 4 ? <SampleNextArrow to="next" /> : null,
    prevArrow: 
      data && data.length > 4 ? <SamplePrevArrow to="prev" /> : null,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
          arrows: data && data.length > 4 ? true : false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          arrows: data && data.length > 2 ? true : false,

        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: data && data.length > 1 ? true : false,
        }
      }
    ]
  };

  const handleProductClick = (item) => {
    navigate.push(`/product/${item.slug}`, { state: item });
  };
    
  return (
    <div className={`similler-products-main-container ${isPadding ? 'add-padding' : ''}`}>
        <h3>Shop From This Collection</h3>

        <div className='cart-related-products-slider-main-div'>
          <Slider {...settings}>
            {data ? (
              data.map((item, index) => (
              <div key={index} className='cart-latest-product-cards-container'>
                <ProductCardTwo
                    key={index}
                    slug={item.slug}
                    singleProductData={item}
                    maxWidthAccordingToComp={"98%"}
                    justWidth={'100%'}
                    showOnPage={true}
                    percent={'12%'}
                    showExtraLines={false}
                    titleHeight={true}
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
                />
              </div>
            ))
            ) : (
              Array.from({ length: 4 }).map((_, index) => (
                            <ProductCardShimmer />
                        ))
            )}
          </Slider>
        </div>

      <QuickView
        setQuickViewProduct={quickViewProduct}
        quickViewShow={quickViewClicked}
        quickViewClose={handleQuickViewClose}
      />
    </div>
  )
}
export default SimillerProducts