'use client'

import React, { useEffect, useState} from 'react';
import './ProductArchive.css';

// Components
import FAQ from '@/UI/Components/FAQ/FAQ';
import Products from '@/UI/Components/Products/Products';
import RelatedCategories from '@/UI/Components/Related-categories-Tags/RelatedCategories';
import { useProductArchive } from '@/context/ActiveSalePageContext/productArchiveContext';

const ProductArchive = ({productArchiveHading}) => {

const [navigationType, setNavigationType] = useState(null);

  const {activePage , setActivePage, setActivePageIndex, setColorValue} = useProductArchive()

    
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
          productArchiveHading={productArchiveHading}
          navigationType={navigationType}
        />
        <RelatedCategories
          navigationType={navigationType}
        />
        <FAQ />
    </div>    
  )
}

export default ProductArchive