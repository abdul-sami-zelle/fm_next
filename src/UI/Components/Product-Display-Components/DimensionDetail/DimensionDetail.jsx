import React from 'react';
import './DimensionDetail.css';
import { url } from '../../../../utils/api';

const DimensionDetail = ({productData}) => {

  return (
    <div className='dimension-detail-main-container'>
      <div className='dimension-detail-section'>
        <h3>Dimensions (in)</h3>
        <div dangerouslySetInnerHTML={{ __html: productData?.weight_dimension }} ></div>
      </div>
      {productData?.dimension_image && (
        <div className='dimension-detail-image-section'>
          <img src={`${url}${productData?.dimension_image?.image_url}`} alt='dimension' />
        </div>
      )}
      
    </div>
  )
}

export default DimensionDetail
