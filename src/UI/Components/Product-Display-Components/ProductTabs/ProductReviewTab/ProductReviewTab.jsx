import React, { use, useEffect, useState } from 'react'
import './ProductReviewTab.css'
import WriteReview from '../../../WriteReview/WriteReview'
import RatingAndReview from '../../../RatingAndReview/RatingAndReview'
import axios from 'axios'
import { url } from '../../../../../utils/api'
// import { useLocation, useParams } from 'react-router-dom'
import ProductComments from '../../../ProductComments/ProductComments'
import SnakBar from '../../../../../Global-Components/SnakeBar/SnakBar'

const ProductReviewTab = ({ id, reviewRef, productData, params }) => {

  const { slug } = use(params);
  // const location = useLocation();
  const [product, setProduct] = useState(productData || null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('')
  const [snakebarOpen, setSnakebarOpen] = useState(false);

  const handleOpenSnakeBar = (message) => {
    setSnakebarOpen(true);
    setErrorMessage(message)
  }

  const handleCloseSnakeBar = () => {
    setSnakebarOpen(false);
  }

  const fetchReviews = async (productUid) => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/v1/reviews/get-by-product/${productUid}`);
      setReviews(response.data.reviews);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch reviews');
      setLoading(false);
    }
  };

  const fetchProductBySlug = async (slug) => {
    try {
      const response = await axios.get(`${url}/api/v1/products/get-by-slug/${slug}`);
      const fetchedProduct = response.data.products[0] || {};
      setProduct(fetchedProduct);
    } catch (error) {
      console.error('Error fetching product by slug:', error);
    }
  };

  useEffect(() => {
    if (!product) {
      fetchProductBySlug(slug);
    } else if (product?.uid) {
      fetchReviews(product?.uid);
    }
  }, [product, slug]);

  return (
    <div
    className='reviews'
      id={'Reviews'}
      ref={reviewRef}
    >
      <RatingAndReview rating={product?.average_rating} data={reviews} reviews={reviews} loading={loading} error={error} />
      {loading && <div>Loading reviews...</div>}
      {error && <div>{error}</div>}

      <WriteReview productData={product} snakeBarOpen={handleOpenSnakeBar} product_id={product?.uid} review_enable={product?.enable_review} product_name={product?.name} product_permalink={"https://"} />
      <ProductComments review_enable={product?.enable_review} data={reviews} />

      <SnakBar
        message={errorMessage}
        openSnakeBarProp={snakebarOpen}
        setOpenSnakeBar={setSnakebarOpen}
        onClick={handleCloseSnakeBar}
      />
    </div>
  )
}

export default ProductReviewTab
