import React from 'react'
import './RelatedProducts.css'
import SwiperSlider from '@/UI/Sliders/SwiperSlider/SwiperSlider'
import ProductCardTwo from '../ProductCardTwo/ProductCardTwo'
import ArrowSlider from '@/UI/Sliders/ArrowsSlider/ArrowSlider'
import heart from '../../../Assets/icons/heart-vector.png'

const RelatedProducts = ({data}) => {
  return (
    <div className='related-products-main-container'>
        <h3>Popular Items You May Like</h3>
        <div className='related-crds-slider-contaner'>

            <ArrowSlider
              slidesData={data}
              renderSlide={(item, index) => (
                <div key={index} className='cart-latest-product-cards-container'>
                  <ProductCardTwo
                    key={index}
                    slug={item.slug}
                    singleProductData={item}
                    maxWidthAccordingToComp={"100%"}
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
              )}
              showDots={false}
              showArrows={true}
              spaceBetween={10}
              isPadding={true}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 4 },
              }}
            />

            {/* <ArrowSlider
                  slidesData={data}
                  renderSlide={(item, index) => (
                    <div key={index} className='cart-latest-product-cards-container'>
                      <ProductCardTwo
                        key={index}
                        slug={item.slug}
                        singleProductData={item}
                        maxWidthAccordingToComp={"100%"}
                        justWidth={'100%'}
                        percent={'12%'}
                        showOnPage={true}
                        tagIcon={item.productTag ? item.productTag : '/Assets/icons/heart-vector.png'}
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
                  )}
                  showDots={false}
                  showArrows={true}
                  spaceBetween={15}
                  breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 4 },
                  }}
                /> */}
        </div>
    </div>
  )
}

export default RelatedProducts