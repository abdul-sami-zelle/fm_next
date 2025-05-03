'use client'

import React, { useEffect, useState } from 'react'
import './ReturnPolicy.css';
import { url } from '../../../utils/api';

const ReturnPolicyClient = () => {
    

    const [returnPolicy, setReturnPolicy] = useState()
    const fetchReturnPolicy = async () => {
      const api = `/api/v1/pages/return-policy/get`;
      try {
        const response = await fetch(`${url}${api}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'Application/json'
          }
        });
        const result = await response.json();
        setReturnPolicy(result.returnPolicy.content)
      } catch (error) {
        console.error("UnExpected Server Error", error);
      }
    }

    useEffect(() => {fetchReturnPolicy()})

  return (
    <div className='shipping-and-delivery-main-container'>
      <div dangerouslySetInnerHTML={{ __html: returnPolicy }} ></div>
    </div>
  )
}

export default ReturnPolicyClient
