import React, { useState } from 'react'
import './MobileCart.css';
import deleteIcon from '../../../../Assets/icons/delete-red.png';
import plusBtn from '../../../../Assets/icons/plus.png';
import minusBtn from '../../../../Assets/icons/minus.png';
import { formatedPrice, url } from '../../../../utils/api';
import { MdDelete } from "react-icons/md";
import { FaPlus, FaMinus } from 'react-icons/fa';
import { IoIosClose } from "react-icons/io";
import ToggleSwitch from '@/Global-Components/ToggleSwitch/ToggleSwitch';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cartContext/cartContext';
import SlimToggler from '@/Global-Components/ToggleSwitch/SlimTogler';

const MobileCart = (
    {
        productColor,
        productAccesories,
        productSinglePrice,
        handleRomoveProduct,
        handleIncreament,
        handleDecreament,
        cartIndex,
        quantity,
        productData,
        isProtected,
        removeProtection,
        addProtection,
    }) => {

    const {
        eachProtectionValue,
        eachProtectionValue2,
        isCartProtected,
        cartProducts,
    } = useCart()

    const [isProtectionClicked, setIsProtectionClicked] = useState(isProtected === 0 ? "no-thanks" : "yes-protect");
    const handleProtectOrNotButtonClicked = (value) => {
        setIsProtectionClicked((prevValue) => prevValue === value ? null : value)
    }

    const handleSingleProtection = (value) => {
        if (isProtectionClicked === 'yes-protect') {
            handleProtectOrNotButtonClicked('no-thanks');
            removeProtection();
        } else {
            handleProtectOrNotButtonClicked('yes-protect');
            addProtection();
        }
    }

    const productTotalPrice = productData.regular_price * quantity;

    return (
        <div className='mobile-cart'>
            <button className='mobile-delete-product' onClick={() => handleRomoveProduct(cartIndex)}>
                {/* <img src={'/Assets/icons/delete-red.png'} alt='delete icon' /> */}
                <IoIosClose size={20} color='var(--text-gray)' />
            </button>
            <h3 className='mobile-priduct-name'>{productData.name}</h3>
            <div className='mobile-cart-product-image-and-containt'>
                <img src={`${url}${productData.image.image_url}`} alt='product-image' className='mobile-cart-product-main-image' />
                <div className='mobile-cart-product-containt'>
                    <p>{productColor}</p>
                    <p>{productAccesories}</p>
                    <p>{formatedPrice(productData.regular_price)}</p>
                    <div className='mobile-cart-product-count-and-total-price'>
                        <div className='mobile-cart-product-count'>
                            <button onClick={handleDecreament}>
                                {/* <img src={'/Assets/icons/minus.png'} alt='minus' /> */}
                                <FaMinus size={10} color='var(--text-gray)' />
                            </button>
                            <p>{quantity}</p>
                            <button onClick={handleIncreament}>
                                {/* <img src={'/Assets/icons/plus.png'} alt='plus-btn' /> */}
                                <FaPlus size={10} color='var(--text-gray)' />
                            </button>
                        </div>
                        <p> {formatedPrice(productTotalPrice)}</p>
                    </div>
                </div>
            </div>

            <div className='desktop-card-protection-div' onClick={handleSingleProtection}>
                <div className='guard-and-heading'>
                    <div className='mobile-guard-title-and-details'>
                        <span>
                            <h3 className='protection-guard-title'>Protection Plan</h3>
                            <p>5 Years Protection $149</p>
                        </span>

                        {cartProducts.is_all_protected === 1 ? <div className="protection-all-protected">
                            <Image src={'/Assets/check.png'} width={50} height={50} alt="" srcset="" />
                            <p>Protection Applied</p>
                        </div>
                            : <div className='mobile-protection-btns-accept-and-cancel'>

                                <SlimToggler
                                    id={`protection-toggle-${productData.isVariable === 1 ? productData.variation_uid : productData.product_uid}`}
                                    checked={isProtectionClicked === 'yes-protect'}
                                    onChange={() => {
                                        if (isProtectionClicked === 'yes-protect') {
                                            handleProtectOrNotButtonClicked('no-thanks');
                                            removeProtection();
                                        } else {
                                            handleProtectOrNotButtonClicked('yes-protect');
                                            addProtection();
                                        }
                                    }}
                                />
                            </div>}
                        {/* <span className='protection-details-and-message'>
                                <p className='protection-price-message'>
                                    Protection Plan
                                </p>
                            </span> */}
                    </div>
                </div>

                {/* {cartProducts.is_all_protected === 1 ? <div className="protection-all-protected">
                        <Image src={'/Assets/check.png'} width={50} height={50} alt="" srcset="" />
                        <p>Protection Applied</p>
                    </div>
                        : <div className='protection-btns-accept-and-cancel'>

                            <SlimToggler
                                id={`protection-toggle-${productData.isVariable === 1 ? productData.variation_uid : productData.product_uid}`}
                                checked={isProtectionClicked === 'yes-protect'}
                                onChange={() => {
                                    if (isProtectionClicked === 'yes-protect') {
                                        handleProtectOrNotButtonClicked('no-thanks');
                                        removeProtection();
                                    } else {
                                        handleProtectOrNotButtonClicked('yes-protect');
                                        addProtection();
                                    }
                                }}
                            />
                        </div>} */}
            </div>

        </div>
    )
}

export default MobileCart
