'use client'

import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react'
import './DeliveryInfo.css';
// import { Link, useNavigate } from 'react-router-dom';

import { useMyOrders } from '@/context/orderContext/ordersContext';
import { useRouter } from 'next/navigation';

const DeliveryInfo = forwardRef((props, ref) => {


    const navigate = useRouter()
    const signupEmailRef = useRef(null)
    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const emailRef = useRef(null)
    const phoneRef = useRef(null)
    const addressOneRef = useRef(null)
    const addressTwoRef = useRef(null)
    const cityRef = useRef(null)
    const stateRef = useRef(null)
    const postalCodeRef = useRef(null)

    const [focusedField, setFocusedField] = useState("");
    const [signupEmail, setSignupEmail] = useState("");

    const {
        orderPayload,
        handleNestedValueChange,
        handleZipCodeChange
    } = useMyOrders();

    

    const [error, setError] = useState({})

    // const validateEmail = (email) => {
    //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    // };

    const handleNavigateToSignup = () => {
        
        navigate.push('/my-account');
    }


    const handleSubmitDeliveryInfo = () => {
        let newErrors = {};

        Object.keys(orderPayload?.billing).forEach((field) => {
            if (field === 'address2') return;

            if (!orderPayload?.billing?.[field]?.trim()) {
                newErrors[field] = `Required`;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setError((prev) => ({ ...prev, ...newErrors }));
            console.log("Errors found: ", newErrors);
            return false
        }

        setError({});
        props.onSubmit();
        return true;
    }

    useImperativeHandle(ref, () => ({
        validateAndSubmit: handleSubmitDeliveryInfo,
    }));

    useEffect(() => { }, [orderPayload])


    return (
        <div className='delivery-form-main-container'>
            <p>All Fields Required Unless indicated Optional </p>

            <div className='delivery-form-signup-container'>
                <h3>Your Information</h3>
             
                <div
                        className={`input-container ${focusedField === 'signupEmail' || signupEmail ? "focused" : ""}`}
                        style={{ border: error?.signupEmail ? '1px solid var(--primary-color)' : '' }}
                        onClick={() => signupEmailRef.current?.focus()}
                    >
                        <label
                            className="floating-label"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            className="input-field-email"
                            ref={signupEmailRef}
                            onFocus={() => setFocusedField("signupEmail")}
                            onBlur={() => setFocusedField("")}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            name='signupEmail'

                        />
                    </div>
                <span>Already have an account <p onClick={handleNavigateToSignup}>SIGN IN</p></span>
                <p>You Can Create an Account After Checkout.</p>
            </div>

            <div className='delivery-info-input-main-container'>
                <h3>Delivery Information</h3>

                <div className='delivery-info-input-first-and-last-name'>

                    <div
                        className={`delivery-input-container ${focusedField === 'first_name' || orderPayload.billing?.first_name ? "focused" : ""}`}
                        style={{ border: error.first_name ? '1px solid var(--primary-color)' : '' }}
                        onClick={() => firstNameRef.current?.focus()}
                    >
                        <label
                            className="floating-label"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            className="input-field-email"
                            ref={firstNameRef}
                            onFocus={() => setFocusedField("first_name")}
                            onBlur={() => setFocusedField("")}
                            name='first_name'
                            value={orderPayload.billing?.first_name}
                            onChange={handleNestedValueChange}

                        />
                    </div>

                    <div
                        onClick={() => lastNameRef.current?.focus()}
                        style={{ border: error.last_name ? '1px solid var(--primary-color)' : '' }}
                        className={`delivery-input-container ${focusedField === 'last_name' || orderPayload.billing?.last_name ? "focused" : ""}`}
                    >
                        <label
                            className="floating-label"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            ref={lastNameRef}
                            className="input-field-email"
                            onFocus={() => setFocusedField("last_name")}
                            onBlur={() => setFocusedField("")}
                            onChange={handleNestedValueChange}
                            name='last_name'
                            value={orderPayload.billing?.last_name}
                        />
                    </div>
                </div>

                <div className='delivery-info-email-and-phone'>

                    <div
                        onClick={() => emailRef.current?.focus()}
                        style={{ border: error.email ? '1px solid var(--primary-color)' : '' }}
                        className={`delivery-input-container-email ${focusedField === 'email' || orderPayload.billing?.email ? "focused" : ""}`}
                    >
                        <label
                            className="floating-label"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            ref={emailRef}
                            className="input-field-email"
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField("")}
                            name='email'
                            value={orderPayload.billing?.email}
                            onChange={handleNestedValueChange}
                        />
                    </div>

                    <div
                        onClick={() => phoneRef.current?.focus()}
                        style={{ border: error.phone ? '1px solid var(--primary-color)' : '' }}
                        className={`delivery-input-container-phone ${focusedField === 'phone' || orderPayload.billing?.phone ? "focused" : ""}`}
                    >
                        <label
                            className="floating-label"
                        // style={{ color: error.last_name ? 'var(--primary-color)' : '' }}
                        >
                            Phone
                        </label>
                        <input
                            type="text"
                            ref={phoneRef}
                            className="input-field-email"
                            onFocus={() => setFocusedField("phone")}
                            onBlur={() => setFocusedField("")}
                            name='phone'
                            value={orderPayload.billing?.phone}
                            onChange={handleNestedValueChange}
                        />
                    </div>

                </div>

                

                <div
                    onClick={() => addressOneRef.current?.focus()}
                    style={{ border: error.address_1 ? '1px solid var(--primary-color)' : '' }}
                    className={`delivery-input-container ${focusedField === 'address_1' || orderPayload.billing?.address_1 ? "focused" : ""}`}
                >
                    <label
                        className="floating-label"
                    >
                        Address
                    </label>
                    <input
                        type="text"
                        ref={addressOneRef}
                        className="input-field-email"
                        onFocus={() => setFocusedField("address_1")}
                        onBlur={() => setFocusedField()}
                        name='address_1'
                        onChange={handleNestedValueChange}
                        value={orderPayload.billing?.address_1}
                    />
                </div>

                <div
                    onClick={() => addressTwoRef.current?.focus()}
                    className={`delivery-input-container ${focusedField === 'address2' || orderPayload.billing?.address2 ? "focused" : ""}`}
                >
                    <label className="floating-label">Apt, Suite, Building, (Optional)</label>
                    <input
                        type="text"
                        ref={addressTwoRef}
                        className="input-field-email"
                        onFocus={() => setFocusedField("address2")}
                        onBlur={() => setFocusedField("")}
                        name='address2'
                        value={orderPayload.billing?.address2}
                        onChange={handleNestedValueChange}
                    />
                </div>

                <div className='delivery-options-city-and-state'>
                <div
                        onClick={() => postalCodeRef.current?.focus()}
                        style={{ border: error.postal_code ? '1px solid var(--primary-color)' : '' }}
                        className={`delivery-input-container-postal-code ${focusedField === 'postal_code' || orderPayload.billing?.postal_code ? "focused" : ""}`}
                    >
                        <label
                            className="floating-label"
                        >
                            Zip Code
                        </label>
                        <input
                            type="text"
                            ref={postalCodeRef}
                            className="input-field-email"
                            onFocus={() => setFocusedField('postal_code')}
                            onBlur={() => setFocusedField("")}
                            name='postal_code'
                            value={orderPayload.billing?.postal_code}
                            onChange={handleZipCodeChange}
                            maxLength={5}
                        />
                    </div>


                    <div
                        onClick={() => cityRef.current?.focus()}
                        style={{ border: error.city ? '1px solid var(--primary-color)' : '' }}
                        className={`delivery-input-container ${focusedField === 'city' || orderPayload.billing?.city ? "focused" : ""}`}
                    >
                        <label
                            className="floating-label"
                        >
                            City
                        </label>
                        <input
                            type="text"
                            ref={cityRef}
                            className="input-field-email"
                            onFocus={() => setFocusedField('city')}
                            onBlur={() => setFocusedField("")}
                            name='city'
                            value={orderPayload.billing?.city}
                            onChange={handleNestedValueChange}
                        />
                    </div>

                    <div
                        onClick={() => stateRef.current?.focus()}
                        style={{ border: error.state ? '1px solid var(--primary-color)' : '' }}
                        className={`delivery-input-container ${focusedField === 'state' || orderPayload.billing?.state ? "focused" : ""}`}
                    >
                        <label
                            className="floating-label"
                        >
                            State
                        </label>
                        <input
                            type="text"
                            ref={stateRef}
                            className="input-field-email"
                            onFocus={() => setFocusedField("state")}
                            onBlur={() => setFocusedField("")}
                            name='state'
                            value={orderPayload.billing?.state}
                            onChange={handleNestedValueChange}
                        />
                    </div>

                </div>

                
            </div>

        </div>
    )
})

export default DeliveryInfo