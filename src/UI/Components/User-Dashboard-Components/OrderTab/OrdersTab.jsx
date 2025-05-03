import React, { useEffect, useState } from 'react'
import './OrdersTab.css';
import arrowLeft from '../../../../Assets/icons/arrow-left-charcol.png';
import arrowRight from '../../../../Assets/icons/arrow-right-charcol.png';
import Loader from '../../Loader/Loader';
import OrderViewModal from '../OrderViewModal/OrderViewModal';
import Pagination from '../../../../Global-Components/Pagination/Pagination';

const OrdersTab = () => {


  const dataPerPage = 7;
  const [currentTableDataIndex, setCurrentTableDataIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const ordersData = [
    {
      row: 'TableHeah', tableHeadData:
        [
          'Order Number',
          'Date',
          'Status',
          'Total',
          'Action'
        ],
      tableBody: [
        {
          orderNumber: '#0001',
          date: 'september 12, 24',
          status: 'Canceled',
          total: '$14555 for 15 items',
        },
        {
          orderNumber: '#0002',
          date: 'september 12, 24',
          status: 'Canceled',
          total: '$14555 for 15 items',
        },
        {
          orderNumber: '#0003',
          date: 'september 12, 24',
          status: 'Canceled',
          total: '$14555 for 15 items',
        },
        {
          orderNumber: '#0004',
          date: 'september 12, 24',
          status: 'Canceled',
          total: '$14555 for 15 items',
        },
        {
          orderNumber: '#0005',
          date: 'september 12, 24',
          status: 'Canceled',
          total: '$14555 for 15 items',
        },
        {
          orderNumber: '#0006',
          date: 'september 12, 24',
          status: 'Canceled',
          total: '$14555 for 15 items',
        },
        {
          orderNumber: '#0007',
          date: 'september 12, 24',
          status: 'Canceled',
          total: '$14555 for 15 items',
        },
        {
          orderNumber: '#0008',
          date: 'september 12, 24',
          status: 'Canceled',
          total: '$14555 for 15 items',
        },
        {
          orderNumber: '#0009',
          date: 'september 12, 24',
          status: 'Canceled',
          total: '$14555 for 15 items',
        },
        {
          orderNumber: '#0010',
          date: 'september 12, 24',
          status: 'Canceled',
          total: '$14555 for 15 items',
        },
        {
          orderNumber: '#0011',
          date: 'september 12, 24',
          status: 'Canceled',
          total: '$14555 for 15 items',
        },
        {
          orderNumber: '#0012',
          date: 'september 12, 24',
          status: 'Canceled',
          total: '$14555 for 15 items',
        },
        {
          orderNumber: '#0013',
          date: 'september 12, 24',
          status: 'Canceled',
          total: '$14555 for 15 items',
        },
        {
          orderNumber: '#0014',
          date: 'september 12, 24',
          status: 'Canceled',
          total: '$14555 for 15 items',
        },
        {
          orderNumber: '#0015',
          date: 'september 12, 24',
          status: 'Canceled',
          total: '$14555 for 15 items',
        },
      ]
    }
  ]

  const totalItems = ordersData[0]?.tableBody.length || 0;
  const totalPages = Math.ceil(totalItems / dataPerPage);

  const handleNextPage = () => {
    setCurrentTableDataIndex((prevIndex) => {
      if (prevIndex < totalPages - 1) {
        setLoading(true);
        setTimeout(() => setLoading(false), 1500);
        return prevIndex + 1;
      }
      return prevIndex;
    });
  };

  const handlePrevPage = () => {
    setCurrentTableDataIndex((prevIndex) => {
      if (prevIndex > 0) {
        setLoading(true);
        setTimeout(() => setLoading(false), 1500);
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };

  const handleActivePage = (pageNumber) => {
    setLoading(true);
    setCurrentTableDataIndex(pageNumber - 1);
    setTimeout(() => setLoading(false), 1500);
  };

  const starterIndex = currentTableDataIndex * dataPerPage;
  const endIndex = starterIndex + dataPerPage;
  const currentItems = ordersData[0]?.tableBody.slice(starterIndex, endIndex) || [];

  // View Modal
  const [viewProductModal, setViewProductModal] = useState(false)
  const [selectedProductData, setSelectedProductData] = useState([])
  const handleViewProductData = (data) => {
    setViewProductModal(true);
    setSelectedProductData(data);
  }

  useEffect(() => {
    if(viewProductModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [viewProductModal])
  return (
    <div className='dash-orders-main-container'>
      {loading && <Loader />}
      <table className='order-table'>
        {ordersData.map((items, index) => (
          <>
            <tr key={index}>
              {items.tableHeadData.map((headItems, headItemIndex) => (
                <th key={headItemIndex}>{headItems}</th>
              ))}
            </tr>
            {currentItems.map((tbody, tindex) => (
              <tr key={tindex}>
                <td>{tbody.orderNumber}</td>
                <td>{tbody.date}</td>
                <td>{tbody.status}</td>
                <td>{tbody.total}</td>
                <td>
                  <div className='table-action-buttons'>
                    <button onClick={() => handleViewProductData(tbody)}>View</button>
                  </div>
                </td>
              </tr>
            ))}
          </>
        ))}
      </table>
      <div className='paginations'>
        <Pagination
          activePageIndex={currentTableDataIndex + 1}
          totalPages={{ totalPages }}
          handleActivePage={handleActivePage}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
        

      </div>
      <OrderViewModal
        viewModal={viewProductModal}
        setViewModal={setViewProductModal}
      />
    </div>
  )
}

export default OrdersTab
