import React, { useState } from 'react'
import './ReviewTab.css';
import { useAppointment } from '../../../../context/AppointmentContext/AppointmentContext';
import { formatPhoneNumber } from '../../../../utils/api';

const ReviewTab = ({ handleSubmitAppointment, selectedTab, setSelectedTab }) => {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { appointmentPayload, setAppointmentPayload } = useAppointment();
  const handleUserDataChange = (e) => {
    const {name, value} = e.target;
    setAppointmentPayload((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: name === 'contact' ? formatPhoneNumber(value) : value
      }
    }))
  }
  return (
    <div className='review-tab-main-container'>
      <h3>Please provide your details to be added to our appointment book</h3>
      
      <div className='review-tab-form'>

        <label>
          <input type='text' name='firstName' value={appointmentPayload.details.firstName} placeholder='First Name' onChange={handleUserDataChange} />
        </label>

        <label>
          <input type='text' name='lastName' value={appointmentPayload.details.lastName} placeholder='Last Name' onChange={handleUserDataChange} />
        </label>

        <label>
          <input type='text' name='email' value={appointmentPayload.details.email} placeholder='Email Address' onChange={handleUserDataChange} />
        </label>

        <label>
          <input type='text' name='contact' value={appointmentPayload.details.contact} placeholder='Contact Phone' onChange={handleUserDataChange} />
        </label>

        <div className='confirm-associate-container'>
          <input 
            type='checkbox' 
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <h3>Was there an associate that you were working with?</h3>
        </div>

        {isChecked && (
          <label>
            <input type='text' name='associate' value={appointmentPayload.details.associate} placeholder='Associate Name' onChange={handleUserDataChange} />
          </label>
        )}
        
        <div className='type-selected-button'>
          <button onClick={() => setSelectedTab(selectedTab - 1)}>Previous</button>
          <button onClick={handleSubmitAppointment}>
            Book Consultant
          </button>
        </div>
      </div>

    </div>
  )
}

export default ReviewTab
