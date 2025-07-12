import React, { useEffect, useState } from 'react'
import './DashboardTabs.css';
import DashTab from '../DashTab/DashTab';
import OrdersTab from '../OrderTab/OrdersTab';
import DownloadsTab from '../DownloadsTab/DownloadsTab';
import AddressesTab from '../AddressesTab/AddressesTab';
import PaymentMethodTab from '../PaymentMethodTab/PaymentMethodTab';
import AccountDetailsTab from '../AccountDetailsTab/AccountDetailsTab';
import Loader from '../../Loader/Loader';
import { url } from '../../../../utils/api';
import axios from 'axios';
import Favorites from '../DashTab/DashboardComponents/Favorites';
import { useParams } from 'next/navigation';

const DashboardTabs = ({ data }) => {
    const [loading, setLoading] = useState(false);
    const [trigerApi, setTrigerApi] = useState(false);
    const params = useParams();
      const id = params.id;
    const [userToken, setUserToken] = useState('');
    useEffect(() => {
        const getToken = localStorage.getItem('userToken');
    if(getToken) {
      setUserToken(getToken)
    }
    }, [])


    const [userData, setUserData] = useState();
    const getBillingData = async (userId, authToken) => {
        try {
            if (!authToken) {
                throw new Error("Authorization token missing");
            }

            const response = await axios.get(
                `${url}/api/v1/web-users/get/${userId}`,
                {
                    headers: {
                        authorization: `${authToken}`,
                    }
                }
            );
            if (response.status === 200) {

                setUserData(response.data.data)
                setTrigerApi(false)
            } else {
                console.log("Error fetching billing address data");
            }


        } catch (error) {
            console.error("Error fetching billing address:", error.message);
            throw error;
        }
    }

    useEffect(() => {
        const userId = localStorage.getItem('uuid')
        const authToken = localStorage.getItem('userToken')
        if (authToken) {
            getBillingData(userId, authToken)
        }
    }, [])

    useEffect(() => {
        const userId = localStorage.getItem('uuid')
        const authToken = localStorage.getItem('userToken')
        if (authToken) {
            getBillingData(userId, authToken)
        }
    }, [trigerApi === true])

    const dashTabsTitles = [
        'Dashboard',
        'Orders',
        'Addresses',
        'Favorites',
        'Profile'
    ]

    const [currentTabIndex, setCurrentTabIndex] = useState(0)
    const handleTabOpen = (index) => {
        setLoading(true)
        setCurrentTabIndex(index);
        setTimeout(() => setLoading(false), 1000);
    }

    const [favoritesData, setFavoritesData] = useState([]);
    const handleFavoritesData = async () => {
        const api = `${url}/api/v1/web-users/wishlist/${id}`
        try {
            const response = await axios.get(api, 
                {
            headers: {
              Authorization: userToken, // Replace with your actual token variable
              'Content-Type': 'application/json', // Optional but good practice
            }
          });
          if(response.status === 200) {
            setFavoritesData(response.data.wishlist)
          }
            console.log("wish list response", response);
        } catch (error) {
            console.log("unExpected Server Error", error);
        }
    }



    
    useEffect(() => {
        if(currentTabIndex === 3) {
            handleFavoritesData()
        }
    }, [currentTabIndex])
    useEffect(() => {
        if(currentTabIndex === 3) {
            handleFavoritesData()
        }
    }, [favoritesData])
    

    return (
        <div className='dashboard-all-tabs-toggler-main-container'>
            {loading && <Loader />}
            <div className='dashboard-tabs-toggle-nav'>
                {dashTabsTitles.map((item, index) => (
                    <h3
                        key={index}
                        className={`dash-single-tab-title ${currentTabIndex === index ? 'active-dash-tab' : ''}`}
                        onClick={() => handleTabOpen(index)}
                    >
                        {item}
                    </h3>
                ))}
            </div>
            {
                currentTabIndex === 0 ? <DashTab data={data} /> :
                    currentTabIndex === 1 ? <OrdersTab data={data} /> :
                        currentTabIndex === 2 ? <AddressesTab data={data} userAddresses={userData} setTrigerPoint={setTrigerApi} /> :
                            currentTabIndex === 3 ? <Favorites data={favoritesData} />:
                                currentTabIndex === 4 ? <AccountDetailsTab data={data} /> : <></>
            }
        </div>
    )
}

export default DashboardTabs
