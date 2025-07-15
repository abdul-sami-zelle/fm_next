import React, { useEffect, useState } from 'react'
import './AddressesTab.css';
import axios from 'axios';
import { url } from '../../../../utils/api';
import Loader from '../../Loader/Loader';
import { useParams } from 'next/navigation';

const AddressesTab = ({ userAddresses, setTrigerPoint, data }) => {

  const params = useParams();
  const id = params.id;
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState('');
  const [billingPayload, setBillingPayload] = useState({
    // userId: '',
    billingAddress: {
      first_name: userAddresses?.billing_address?.first_name,
      last_name: userAddresses?.billing_address?.last_name,
      address_1: userAddresses?.billing_address?.address_1,
      city: userAddresses?.billing_address?.city,
      state: userAddresses?.billing_address?.state,
      postal_code: userAddresses?.billing_address?.postal_code,
      country: 'USA',
    }
  })
  const [shippingPayload, setShippingPayload] = useState({
    userId: '',
    shippingAddress: {
      first_name: userAddresses?.shipping_address?.first_name,
      last_name: userAddresses?.shipping_address?.last_name,
      address_1: userAddresses?.shipping_address?.address_1,
      city: userAddresses?.shipping_address?.city,
      state: userAddresses?.shipping_address?.state,
      postal_code: userAddresses?.shipping_address?.postal_code,
      country: 'USA',
      // email: userAddresses?.email,
      // phone: '090078601'
    }
  })

  useEffect(() => { console.log("billing payload", billingPayload) }, [billingPayload])

  const fetchZipInfo = async (zip) => {
    try {
      const res = await fetch(`https://api.zippopotam.us/us/${zip}`);
      if (!res.ok) throw new Error("ZIP not found");

      const data = await res.json();
      const city = data.places[0]['place name'];
      const state = data.places[0]['state'];

      if (modalType === 'billing-address') {
        setBillingPayload(prev => ({
          ...prev,
          billingAddress: {
            ...prev.billingAddress,
            city,
            state,
          },
        }));
      } else {
        setShippingPayload(prev => ({
          ...prev,
          shippingAddress: {
            ...prev.shippingAddress,
            city,
            state,
          },
        }));
      }
    } catch (error) {
      console.error('Failed to auto-fill address:', error);
    }
  };


  useEffect(() => {
    const zip =
      modalType === 'billing-address'
        ? billingPayload?.billingAddress?.postal_code
        : shippingPayload?.shippingAddress?.postal_code;

    if (zip && zip.length === 5) {
      // call the function here
      fetchZipInfo(zip);
    }
  }, [
    billingPayload?.billingAddress?.postal_code,
    shippingPayload?.shippingAddress?.postal_code,
    modalType
  ]);


  const [userToken, setUserToken] = useState();
  useEffect(() => {
    const getToken = localStorage.getItem('userToken');
    if (getToken) {
      setUserToken(getToken)
    }
  }, []);

  const [isEditTrue, setIsEdit] = useState(false);
  
  const handleEditBillingAddress = (clickType) => {
    setIsEdit(true)
    setModalType(clickType)
  }
  const handleEditShippingClose = () => {
    setIsEdit(false);
    setModalType('')
  }
  useEffect(() => {
  }, [modalType])

  useEffect(() => {
    const uuid = localStorage.getItem('uuid')
    if (modalType === 'billing-address') {
      setBillingPayload((prevPayload) => ({
        ...prevPayload,
        userId: uuid
      }));
    } else if (modalType === 'shipping-address') {
      setShippingPayload((prevPayload) => ({
        ...prevPayload,
        userId: uuid
      }));
    }
  }, [modalType])

  const handleInputData = (e) => {
    const { name, value } = e.target;

    if (modalType === 'billing-address') {
      setBillingPayload((prevPayload) => ({
        ...prevPayload, // Keep previous state
        ...(name === 'email' ? { email: value } : {
          billingAddress: {
            ...prevPayload.billingAddress, // Spread existing shippingAddress
            [name]: value, // Dynamically update the field in shippingAddress
          },
        }), // Dynamically update the field in billingAddress
      }));
    } else if (modalType === 'shipping-address') {
      setShippingPayload((prevPayload) => ({
        ...prevPayload, // Keep previous state
        ...(name === 'email' ? { email: value } : {
          shippingAddress: {
            ...prevPayload.shippingAddress, // Spread existing shippingAddress
            [name]: value, // Dynamically update the field in shippingAddress
          },
        })
      }));
    }
  }

  const handleUpdateAddress = async () => {
    const billingApi = `/api/v1/web-users/update-billing/${id}`
    const shippingApi = `/api/v1/web-users/update-shipping-address`;
    try {

      if (modalType === 'billing-address') {
        setLoading(true)
        // const response = await axios.put(`${url}${billingApi}`, billingPayload);
        const response = await axios.put(
          `${url}${billingApi}`,
          billingPayload,
          {
            headers: {
              Authorization: userToken, // Replace with your actual token variable
              'Content-Type': 'application/json', // Optional but good practice
            }
          }
        );
        if (response.status === 200) {
          setTrigerPoint(true)
        } else {
          console.error("Request response failed");
        }
      } else if (modalType === 'shipping-address') {
        setLoading(true)
        const response = await axios.put(`${url}${shippingApi}`, shippingPayload);
        if (response.status === 200) {
          setTrigerPoint(true)
        } else {
          console.error("Request response failed");
        }
      }

    } catch (error) {
      setLoading(false)
      console.error("UnExpected Server Error", error);
      return {
        error: true,
        message: "Server Error"
      }
    } finally {
      setLoading(false)
      setIsEdit(false)
    }
  }

  // zip state city
  const handleZipCodeChange = async (e) => {
    const zip = e.target.value;

    // Update zip in the form
    const updatedPayload = { ...billingPayload };
    if (modalType === 'billing-address') {
      updatedPayload.billingAddress.postal_code = zip;
      setBillingPayload(updatedPayload);
    } else {
      const updatedShipping = { ...shippingPayload };
      updatedShipping.shippingAddress.postal_code = zip;
      setShippingPayload(updatedShipping);
    }

    if (zip.length === 5) {
      try {
        const res = await fetch(`https://api.zippopotam.us/us/${zip}`);
        if (!res.ok) throw new Error("Invalid ZIP");

        const data = await res.json();
        const city = data.places[0]['place name'];
        const state = data.places[0]['state'];

        if (modalType === 'billing-address') {
          setBillingPayload(prev => ({
            ...prev,
            billingAddress: {
              ...prev.billingAddress,
              city,
              state,
            }
          }));
        } else {
          setShippingPayload(prev => ({
            ...prev,
            shippingAddress: {
              ...prev.shippingAddress,
              city,
              state,
            }
          }));
        }
      } catch (err) {
        console.error('ZIP lookup failed:', err);
      }
    }
  };


  return (
    <div className='addresses-main-container'>
      {/* <p>The following addresses will be used on checkout page by default</p> */}
      {loading && <Loader />}
      <div className='billing-and-shipping-addresses'>
        <div className='user-billing-address'>
          <div className='billing-address-details'>
            <div className='title-and-edit-icon'>
              <h3>Billing Address</h3>
              <img src={'/Assets/icons/edit.png'} alt='edit icon' onClick={() => handleEditBillingAddress('billing-address')} />
            </div>
            <div className='billing-address-show'>
              <p>{userAddresses?.billing_address?.first_name} {userAddresses?.billing_address?.last_name}</p>
              <p>{userAddresses?.email}</p>
              <p>{userAddresses?.billing_address?.phone}</p>
              <p>{userAddresses?.billing_address?.address_1}</p>
              <p>{userAddresses?.billing_address?.address_2}</p>
              <p>{userAddresses?.billing_address?.postal_code}</p>
              <p>{userAddresses?.billing_address?.city} {userAddresses?.billing_address?.state}</p>
            </div>
          </div>
        </div>


      </div>

      <div className={`address-edit-modal ${isEditTrue ? 'show-address-edit-modal' : ''}`}>
        <div className='address-edit-modal-content'>
          <div className='address-edit-modal-head'>
            <h3 className='address-edit-main-heading'>{modalType === 'billing-address' ? 'Billing Address Update' : 'Shipping Address Update'}</h3>
            <button className='address-edit-modal-close-button' onClick={handleEditShippingClose}>
              <img src={'/Assets/icons/close-btn.png'} alt='cross btn' />
            </button>
          </div>
          <div className='address-edit-modal-body'>

            <div className='two-inputs-row'>
              <label className='label-with-input'>
                First Name
                <input
                  className='input-with-label'
                  type='text'
                  placeholder='First Name'
                  name='first_name'
                  value={
                    modalType === 'billing-address'
                      ? billingPayload?.billingAddress?.first_name
                      : shippingPayload?.shippingAddress?.first_name
                  }
                  onChange={handleInputData}
                />
              </label>
              <label className='label-with-input'>
                Last Name
                <input
                  className='input-with-label'
                  type='text'
                  placeholder='Last Name'
                  name='last_name'
                  value={modalType === 'billing-address'
                    ? billingPayload?.billingAddress?.last_name
                    : shippingPayload?.shippingAddress?.last_name
                  }
                  onChange={handleInputData}
                />
              </label>
            </div>



            <div className='country-indication'>
              <p className='country-region'>Country/Region</p>
              <h3 className='only-country'>United States (USA)</h3>
            </div>

            <div className='double-address'>
              <label className='label-with-input'>
                Street Address
                <input
                  className='input-with-label'
                  type='text'
                  placeholder='House number & Street number'
                  name='address_1'
                  value={modalType === 'billing-address'
                    ? billingPayload?.billingAddress?.address_1
                    : shippingPayload?.shippingAddress?.address_1
                  }
                  onChange={handleInputData}
                />
              </label>
              <input className='input-with-label' type='text' placeholder='Apartment, suite, unit etc' />
            </div>

            <div className='zip_city_state_input_container'>
              <label className='label-with-input'>
                Zip Code
                <input
                  className='input-with-label'
                  type='text'
                  placeholder='123123'
                  name='postal_code'
                  value={modalType === 'billing-address'
                    ? billingPayload?.billingAddress?.postal_code
                    : shippingPayload?.shippingAddress?.postal_code
                  }
                  onChange={handleZipCodeChange}
                />
              </label>
              <label className='label-with-input'>
                Towt/City
                <input
                  className='input-with-label'
                  type='text'
                  placeholder='New York'
                  name='city'
                  value={modalType === 'billing-address'
                    ? billingPayload?.billingAddress?.city
                    : shippingPayload?.shippingAddress?.city
                  }
                  onChange={handleInputData}
                />
              </label>
              <label className='label-with-input'>
                State
                <input
                  className='input-with-label'
                  type='text'
                  placeholder='Pennsylvenian'
                  name='state'
                  value={modalType === 'billing-address'
                    ? billingPayload?.billingAddress?.state
                    : shippingPayload?.shippingAddress?.state
                  }
                  onChange={handleZipCodeChange}
                />
              </label>
            </div>

            <div className='update-address-div'>
              <button className='update-address-button' onClick={handleUpdateAddress}>
                Update Address
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AddressesTab
