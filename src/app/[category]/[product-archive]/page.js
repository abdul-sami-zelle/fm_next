'use client'

import React, { useEffect, useState } from 'react';
import './ProductArchive.css';

// Components
import FAQ from '@/UI/Components/FAQ/FAQ';
import Products from '@/UI/Components/Products/Products';
import RelatedCategories from '@/UI/Components/Related-categories-Tags/RelatedCategories';
import { useProductArchive } from '@/context/ActiveSalePageContext/productArchiveContext';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import RelatedProducts from '@/UI/Components/RelatedProducts/RelatedProducts';
import { url } from '@/utils/api';

const ProductArchive = () => {

  const [navigationType, setNavigationType] = useState(null);
  const { activePage, setActivePage, setActivePageIndex, setColorValue } = useProductArchive()
  const pathname = usePathname();
  const hideSection = pathname.startsWith('/searched-products');
  const childSlug = pathname.split('/').filter(Boolean).pop();
  const [relatedProducts, setRelatedProducts] = useState([])
  const [hasProducts, setHasProducts] = useState(false)
  const findRelatedProducts = async () => {
    const api = `${url}/api/v1/products/get-best-selling/${childSlug}`;
    try {
      const response = await axios.get(api);
      if(response.status === 200) {
        setRelatedProducts(response.data.products);
      }
      if(response.data.products.length > 0 ) {
        setHasProducts(true);
      } else {
        setHasProducts(false);
      }
    } catch (error) {
      console.error("UnExpected Server Error", error);
    }
  }

  useEffect(() => {findRelatedProducts()}, [childSlug])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.performance) {
      const [navigation] = window.performance.getEntriesByType('navigation');
      if (navigation) {
        setNavigationType(navigation.type);
      }
    }
  }, []);

  useEffect(() => {
    if (navigationType && navigationType !== 'back_forward') {
      setActivePage(1);
      setActivePageIndex(activePage);
      setColorValue([]);
    }
  }, [navigationType]);

  return (
    <div>
      <Products
        navigationType={navigationType}
      />

      {hasProducts && <RelatedProducts data={relatedProducts} />}
      
      {!hideSection && (
        <RelatedCategories
          navigationType={navigationType}
        />
      )}

      

      {!hideSection && (
        <FAQ />
      )}
    </div>
  )
}

export default ProductArchive