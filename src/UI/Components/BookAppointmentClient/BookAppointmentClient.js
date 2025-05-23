'use client'

import React, { useState } from 'react'
import './BookAppointment.css'
// import tabHome from '../../../Assets/icons/home-icon.png';
// import storeIcon from '../../../Assets/icons/home.png'
import outlinedHome from '../../../Assets/icons/home-black-outlined.png'
// import DateAndTime from '../../Components/BookAppointmentComponents/DateAndTime/DateAndTime';
// import SelectStore from '../../Components/BookAppointmentComponents/SelectStores/SelectStore';
// import BasicDetails from '../../Components/BookAppointmentComponents/BasicDetails/BasicDetails';
// import AppointmentSummary from '../../Components/BookAppointmentComponents/Summary/AppointmentSummary';
import LocationTab from '@/Global-Components/AppointmentModal/AppointmentTabs/LocationTab/LocationTab';
import DateTimeTab from '@/Global-Components/AppointmentModal/AppointmentTabs/DateTimeTab/DateTimeTab';
import { useAppointment } from '@/context/AppointmentContext/AppointmentContext';
import TypeTab from '@/Global-Components/AppointmentModal/AppointmentTabs/TypeTab/TypeTab';
import ReviewTab from '@/Global-Components/AppointmentModal/AppointmentTabs/ReviewTab/ReviewTab';

const BookAppointmentClient = ({ params }) => {
    const appointmentTabs = [
        { img: outlinedHome, title: 'Store' },
        { img: outlinedHome, title: 'Date & Time' },
        { img: outlinedHome, title: 'Basic Details' },
        { img: outlinedHome, title: 'Summary' },

    ]

    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleCardSelect = (index) => {
        setSelectedIndex(index)
    }

    const [serviceIndex, setServiceTypeIndex] = useState(null)
        const [loading, setLoading] = useState(false);
    const { appointmentPayload, setAppointmentPayload } = useAppointment()
    const handleServiceType = (service, index) => {
        setAppointmentPayload((prevData) => ({
            ...prevData,
            serviceType: service
        }))
        setServiceTypeIndex(index)
    }

    const handleCategorySelect = (category) => {
        setAppointmentPayload((prev) => {
            // Check if the category already exists in selectedCategories
            const isCategoryExists = prev.selectedCategories.some(
                (item) => item._id === category._id
            );

            // If category already exists, remove it (toggle behavior)
            const updatedCategories = isCategoryExists
                ? prev.selectedCategories.filter((item) => item._id !== category._id)
                : [...prev.selectedCategories, { name: category.name, uid: category.uid, _id: category._id }];

            return {
                ...prev,
                selectedCategories: updatedCategories
            };
        });
    }

    const handleSelectStore = (store) => {
        setAppointmentPayload((prev) => ({
            ...prev,
            selectedStore: {
                store_id: store?.store_id,
                _id: store?._id,
                name: store?.name,
                phone: store?.phone,
                city: store?.city
            }
        }))

        if (Object.keys(store).length > 0) {
            setSelectedTab(selectedTab + 1)
        }
    }

    const handleSubmitAppointment = async () => {
        const api = `/api/v1/appointments/book-appointment`;
        try {
            setLoading(true)
            const response = await axios.post(url + api, appointmentPayload);
            if(response.status !== 201) {
                handleOpenSnakeBar()
            }
            if (response.status === 201) {
                handleAppointmentModal()
            }
        } catch (error) {
            console.log("UnExpected Server Error", error);
            handleOpenSnakeBar()
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className='book-an-appointment-main-container'>
            <div className='book-appointment-head'>
                <h3 className='book-appointment-main-container'>Book an Appointment</h3>
                <p className='book-appointment-slogan'>Do You Want Our Expert To Give Your The Advice, Book An Appointment Now</p>
            </div>
            <div className='book-appointments-body'>
                <div className='book-appointment-select-tab-container'>
                    {appointmentTabs.map((item, index) => (
                        <div key={index} className={`tab-select-card ${selectedIndex === index ? 'selected-tab' : ''}`} onClick={() => handleCardSelect(index)}>
                            <div className='tab-sect-card-icon'></div>
                            {/* <img src={item.img} alt='tab icon' /> */}
                            <p>{item.title}</p>
                        </div>
                    ))}
                </div>

                {/* selectedIndex === 0 ? <SelectStore />
                        : selectedIndex === 1 ? <DateAndTime />
                        : selectedIndex === 2 ? <BasicDetails />
                        : <AppointmentSummary />  */}


                <div className='content-according-to-selected-tab'>
                    {


                        selectedIndex === 0 ? <TypeTab
                            handleServiceType={handleServiceType}
                            selectedTab={selectedIndex}
                            setSelectedTab={setSelectedIndex}
                            handleCategorySelect={handleCategorySelect}
                            serviceIndex={selectedIndex}
                        />
                            : selectedIndex === 1 ? <LocationTab
                                selectedTab={selectedIndex}
                                setSelectedTab={setSelectedIndex}
                                handleSelectStore={handleSelectStore}
                            />
                                : selectedIndex === 2 ? <DateTimeTab
                                    selectedTab={selectedIndex}
                                    setSelectedTab={setSelectedIndex}
                                />
                                    : <ReviewTab
                                        handleSubmitAppointment={handleSubmitAppointment}
                                    />
                    }
                </div>
            </div>
        </div>
    )
}

export default BookAppointmentClient
