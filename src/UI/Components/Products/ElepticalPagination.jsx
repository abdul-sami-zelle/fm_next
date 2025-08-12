import React from 'react';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';
import './Products.css';

const ElipticalPagenation = ({
  activePageIndex,
  totalPages,
  onPrevPage,
  onNextPage,
  onPageChange,
  marginTop = '0px',
  innerTop = '10px',
  innerBottom = '10px',
}) => {


  const generatePages = () => {

    if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

    const uniquePages = new Set();

    // Always show first 3 pages
  [1, 2, 3].forEach(p => {
    if (p <= totalPages) uniquePages.add(p);
  });
    
    uniquePages.add(totalPages);


    // Convert to sorted array
  const sorted = Array.from(uniquePages).sort((a, b) => a - b);

  // Insert "..." where there are gaps
  const finalPages = [];
  for (let i = 0; i < sorted.length; i++) {
    finalPages.push(sorted[i]);
    if (i < sorted.length - 1 && sorted[i + 1] - sorted[i] > 1) {
      finalPages.push('...');
    }
  }

  return finalPages;
  };


  const pages = generatePages();

  return (
    <div className='view-more-products-pagination-main' style={{marginTop: marginTop}}>
      {totalPages > 1 && (
        <div className='pagination-buttons-container' style={{marginTop: innerTop, marginBottom: innerBottom}}>

            <span
              className={activePageIndex === 1 ? 'disabled' : ''}
              onClick={onPrevPage}
              style={{
                pointerEvents: activePageIndex === 1 ? 'none' : 'auto',
                color: activePageIndex === 1 ? '#ccc' : '#4487C5',
              }}
            >
              <FaRegArrowAltCircleLeft size={18} /> Prev
            </span>

          {pages.map((page, idx) => {
            if (page === 'start-ellipsis' || page === 'end-ellipsis') {
              return (
                <span key={idx} className='dots'>
                  ...
                </span>
              );
            }

            return (
              <span
                key={idx}
                onClick={() => onPageChange(page)}
                className={activePageIndex === page ? 'active-page-span' : ''}
              >
                {page}
              </span>
            );
          })}

            <span
              className={activePageIndex === totalPages ? 'disabled' : ''}
              onClick={onNextPage}
              style={{
                pointerEvents: activePageIndex === totalPages ? 'none' : 'auto',
                color: activePageIndex === totalPages ? '#ccc' : '#4487C5',
              }}
            >
              Next <FaRegArrowAltCircleRight size={18} />
            </span>
        </div>
      )}
    </div>
  );
};

export default ElipticalPagenation;