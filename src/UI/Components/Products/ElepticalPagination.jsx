import React from 'react';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';
import './Products.css';

const ElipticalPagenation = ({
  activePageIndex,
  totalPages,
  onPrevPage,
  onNextPage,
  onPageChange
}) => {
  const generatePages = () => {
    const pages = [];

    const middlePages = [
      activePageIndex - 1,
      activePageIndex,
      activePageIndex + 1,
    ].filter(p => p > 0 && p < totalPages);

    const uniquePages = new Set();

    // Add middle pages
    // middlePages.forEach(p => uniquePages.add(p));
    // [1, 2 , 3].forEach(p => uniquePages.add(p))

    [1, 2, 3].forEach(p => {
      if (p <= totalPages) pages.add(p);
    });

    // Always add last page
    uniquePages.add(totalPages);

    // Add "..." only if there's a gap before the last page
    const sorted = Array.from(uniquePages).sort((a, b) => a - b);

    const finalPages = [];
    for (let i = 0; i < sorted.length; i++) {
      finalPages.push(sorted[i]);

      // Check for gap
      if (i < sorted.length - 1 && sorted[i + 1] - sorted[i] > 1) {
        finalPages.push('...');
      }
    }

    return finalPages;
  };


  const pages = generatePages();

  return (
    <div className='view-more-products-pagination-main'>
      <div className='pagination-buttons-container'>
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
    </div>
  );
};

export default ElipticalPagenation;