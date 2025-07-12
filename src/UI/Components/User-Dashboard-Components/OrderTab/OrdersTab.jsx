import React, { useEffect, useState } from 'react'
import './OrdersTab.css';
import arrowLeft from '../../../../Assets/icons/arrow-left-charcol.png';
import arrowRight from '../../../../Assets/icons/arrow-right-charcol.png';
import Loader from '../../Loader/Loader';
import OrderViewModal from '../OrderViewModal/OrderViewModal';
import Pagination from '../../../../Global-Components/Pagination/Pagination';

const OrdersTab = ({data}) => {


  const dataPerPage = 10;
  const [currentTableDataIndex, setCurrentTableDataIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const ordersData = [
    {
      row: 'TableHeah', tableHeadData:
        [
          'Order Number',
          'Invoice',
          'Date',
          'Status',
          'Total',
          'Action'
        ],
      tableBody: data?.orders?.map((item, index) => ({
      orderNumber: item.order_number,
      invoice: item.inv_number,
      date: item.date,
      status: item.status,
      total: `$${item.total} for ${item.items} items`,
    }))
    }
  ]

  console.log("order details", ordersData)

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
    if (viewProductModal) {
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
                <td>{tbody.invoice}</td>
                <td>{tbody.date}</td>
                <td>{tbody.status}</td>
                <td>{tbody.total}</td>
                <td>
                  <div className='table-action-buttons'>
                    <button onClick={() => handleViewProductData(tbody)}>View</button>
                    <button onClick={() => handleViewProductData(tbody)}>Invoice</button>
                    <button onClick={() => handleViewProductData(tbody)}>Reschedule</button>
                  </div>
                </td>
              </tr>
            ))}
          </>
        ))}
      </table>
      <div className='paginations'>
        {data?.orders?.length > 10 && <Pagination
          activePageIndex={currentTableDataIndex + 1}
          totalPages={{ totalPages }}
          handleActivePage={handleActivePage}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />}
        


      </div>
      <OrderViewModal
        viewModal={viewProductModal}
        setViewModal={setViewProductModal}
      />
    </div>
  )
}

export default OrdersTab
