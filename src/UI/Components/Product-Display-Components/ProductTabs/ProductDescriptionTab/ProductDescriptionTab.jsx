import React, { useState } from 'react'
import './ProductDescriptionTab.css'
import { url } from '../../../../../utils/api'

const ProductDescriptionTab = ({ id, descriptionRef, productData, addMarginTop ,}) => {

  const featuresData = [
    {icon: '/Assets/icon/performance-fabric.svg', title: 'Upholstery Material', secondTitle: 'Performance Fabric'},
    {icon: '/Assets/icon/pillows.svg', title: '# of Accent Pillows', secondTitle: '2'},
    {icon: '/Assets/icon/home-dimention.svg', title: 'Lifestyle Size', secondTitle: 'Small Space'},
    {icon: '/Assets/icon/sofa-side.svg', title: 'Seat Depth', secondTitle: '20.00"'},
    {icon: '/Assets/icon/sofa-front.svg', title: 'Seat Cushion Style', secondTitle: 'Loose'},
  ]


  return (
    <div
      id={'Description'}
      ref={descriptionRef}
      className={`product-description-main-container ${addMarginTop ? 'add-top-margin' : ''}`}
    >
      <h3>Description</h3>
      <div className='product-description-section'>
        <div className='product-description-image-container'>
          <img src={`${url}${productData?.image?.image_url}`} alt='product' />
        </div>
        <div className='product-description'>
          
          <div dangerouslySetInnerHTML={{ __html: productData?.description }} ></div>
        </div>
      </div>

      {productData?.product_features?.length > 0 && <div className='product-features-main-container'>
        <h3>Features</h3>
        <div className='product-features-and-extra-features-container'>
          <div className='product-features-section'>
            {productData?.product_features?.map((item, index) => (
              <div 
                key={index}
                className='product-single-feature'
              >
                <img src={url+item.image} alt='icon' />
                <div className='product-single-feature-title-and-desc'>
                  <h3>{item.title}</h3>
                  <p>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>}

    </div>
  )
}

export default ProductDescriptionTab