import React from 'react'
import './MobileCart.css';
import deleteIcon from '../../../../Assets/icons/delete-red.png';
import plusBtn from '../../../../Assets/icons/plus.png';
import minusBtn from '../../../../Assets/icons/minus.png';
import { formatedPrice, url } from '../../../../utils/api';
import { MdDelete } from "react-icons/md";
import { FaPlus, FaMinus } from 'react-icons/fa';
import { IoIosClose } from "react-icons/io";

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
        productData
    }) => {

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

        </div>
    )
}

export default MobileCart
