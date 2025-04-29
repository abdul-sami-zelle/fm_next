import React, { useState } from 'react'
import './ProductDescriptionTab.css'
import { url } from '../../../../../utils/api'

import performanceIcon from '../../../../../Assets/icon/performance-fabric.svg'
import pillow from '../../../../../Assets/icon/pillows.svg'
import spaceIcon from '../../../../../Assets/icon/home-dimention.svg'
import seatDepth from '../../../../../Assets/icon/sofa-side.svg'
import seatCushion from '../../../../../Assets/icon/sofa-front.svg'

const ProductDescriptionTab = ({ id, descriptionRef, productData, addMarginTop }) => {

  const featuresData = [
    {icon: performanceIcon, title: 'Upholstery Material', secondTitle: 'Performance Fabric'},
    {icon: pillow, title: '# of Accent Pillows', secondTitle: '2'},
    {icon: spaceIcon, title: 'Lifestyle Size', secondTitle: 'Small Space'},
    {icon: seatDepth, title: 'Seat Depth', secondTitle: '20.00"'},
    {icon: seatCushion, title: 'Seat Cushion Style', secondTitle: 'Loose'},
  ]


  return (
    <div
      id={'Description'}
      ref={descriptionRef}
      className={`product-description-main-container ${addMarginTop ? 'add-top-margin' : ''}`}
    >
      <div className='product-description-section'>
        <div className='product-description-image-container'>
          <img src={`${url}${productData?.image?.image_url}`} alt='product' />
        </div>
        <div className='product-description'>
          
          <div dangerouslySetInnerHTML={{ __html: productData?.description }} ></div>
        </div>
      </div>

      <div className='product-features-main-container'>
        <h3>Features</h3>
        <div className='product-features-and-extra-features-container'>
          <div className='product-features-section'>
            {featuresData.map((item, index) => (
              <div 
                key={index}
                className='product-single-feature'
              >
                <img src={item.icon} alt='icon' />
                <div className='product-single-feature-title-and-desc'>
                  <h3>{item.title}</h3>
                  <p>{item.secondTitle}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  )
}

export default ProductDescriptionTab