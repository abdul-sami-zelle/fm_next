import React, { useEffect, useState } from 'react'
import './PaymentTypes.css'
import { RiSecurePaymentLine, RiInformationLine } from "react-icons/ri";
import paypal2 from '../../../../Assets/icons/paypal-2.png'
import acima2 from '../../../../Assets/icons/acima-2.png'
import card2 from '../../../../Assets/icons/card-2.png'
import { useMyOrders } from '@/context/orderContext/ordersContext';


const PaymentTypes = ({selectedPaymentType, setSelectedPaymentType, onSelectLabel}) => {

    const paymentTypeCheckData = [
        {type: 'credit-card', sign: 'Credit/Debit Card', logo: '/Assets/icons/card-2.png', paymentMethodId: '9879079j7mummjh'},
        {type: 'paypal',sign: 'Paypal', logo: '/Assets/icons/paypal-2.png'},
        // {type: 'finance-account', sign: 'Finance Account', paymentMethodId: '961803160m79delmiw'},
        {type: 'acima-leasing', sign: 'Acima Leasing',logo: '/Assets/icons/acima-2.png', paymentMethodId: '19783168sagsk879'},
        
    ]

    const {
            creditCardData,
            setCreditCardData,
            activePaymentMethods,
            getActivePaymentMethods,
            setOrderPayload,
        } = useMyOrders();

        
    
        const checkPaymentMethodById = (id) => {
            const paymentMethod = activePaymentMethods?.find(pm => pm.id === id);
            if (paymentMethod) {
                return paymentMethod;
            } else {
                return paymentMethod;
            }
        };

    useEffect(() => {setSelectedPaymentType(paymentTypeCheckData[0].type)}, [])
    useEffect(() => {setOrderPayload((prevData) => ({...prevData, setOrderPayload: paymentTypeCheckData[0].type}))}, [])
    // const [selectedPaymentType, setSelectedPaymentType] = useState(paymentTypeCheckData[0].type);
    // useEffect(() => {getActivePaymentMethods()}, [])

    // useEffect(() => {
    //     console.log("start default")
    //     if(window !== 'undefined') {
    //         const storeOrders = localStorage.getItem('myOrders');
    //         if (storeOrders) {
    //             try {
    //                 setOrderPayload(JSON.parse(storeOrders));
    //             } catch (error) {
    //                 console.error("Failed to parse myOrders from localStorage:", error);
    //             }
    //         }

    //     }
    //     // setLoading(false); // Set loading to false after processing
    //     // getActivePaymentMethods();
    // }, []);
    const handleSelectPaymentType = (type) => {
        console.log("selected payment type", type);
        setSelectedPaymentType(type);
        onSelectLabel(type)
        checkPaymentMethodById(type.paymentMethodId)
    }

    const handlePaymentMethod = (type) => {
        onSelectLabel(type)
    }

  return (
    <div className='payment-types-main-container'>
        <span className='payment-type-heading-container'>
            Payment 
            <RiSecurePaymentLine size={25} />
        </span>
        <div className='payment-types-select-boxes-container'>
            {paymentTypeCheckData.map((item, index) => (
                <label 
                    key={index} 
                    onClick={() => handleSelectPaymentType(item)}
                    className={`payment-select-option ${selectedPaymentType === item.type ? 'select-payment' : ''}`}>
                    <input 
                        type='radio' 
                        checked={selectedPaymentType === item.type}
                        // checked={selectPaymentMethod === 'credit-card'}
                        name='selectedPaymentType'
                        onChange={() => handleSelectPaymentType(item.type)}
                    />
                     
                    <div className='payment-types-select-label'>
                    {item.sign}
                    <img src={item.logo} alt='logo' className='payment-type-paypal-logo' /> 
                    </div>
                    
                    
                </label>
            ))}
        </div>
    </div>
  )
}

export default PaymentTypes
