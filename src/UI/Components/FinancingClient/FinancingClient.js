'use client'

import React, { useEffect, useState } from 'react'
import './Financing.css'
import LatestModulerBanner from '../../Components/LatestModuler/LatestModulerBanner'
import { url } from '../../../utils/api'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'





const FinancingClient = () => {

    const [financingPageData, setFinancingPageData] = useState(null);
    const getFinancingPageData = async () => {
        try {
            const response = await axios.get(`${url}/api/v1/pages/financing/get`);
            setFinancingPageData(response.data.financingPage || []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (financingPageData === null) {
            getFinancingPageData();
        }
    }, [financingPageData]);




    return (
        <div className='financing-main-container'>
            {financingPageData ? (
                financingPageData && <LatestModulerBanner
                    customWidth={false}
                    mainImgShow={true}
                    mobileMainImage={financingPageData?.main_banner?.mobile?.image_url}
                    mainImage={financingPageData?.main_banner?.desktop?.image_url}
                />
            ) : (
                <div className='financing-page-main-banner-shimmer'></div>
            )}

            <div className='mobile-finance-secondBanner'>
                <Image src={'/Assets/Furniture Mecca/Financing/download 146.png'} width={480} height={155}  alt='mobile-second-banner' />
            </div>
            <div className='desktop-finance-secondBanner'>
                <Image src={url + "/uploads/media/Pages/home/financeSlider/1737797410760_405_Finance-Page-Points-2.jpg"} width={2200} height={100} alt='desktop-second-banner' />
            </div>
            {/* <LeaseToOwn /> */}
            <div className='payment-solutions desktopview' style={{ flexDirection: "column" }}>
                {financingPageData ? (
                    financingPageData && financingPageData?.slides?.desktop?.map((items, index) => (
                        <Link
                            key={index}
                            className="payment-solution-single-card"
                            href={items?.link_url} target='_blank' >
                            <img className='' src={url + items?.image_url} alt="" srcset="" />
                        </Link>

                    ))
                ) : (
                    <div className='financing-page-main-banner-shimmer'></div>
                )}

            </div>
            <div className='payment-solutions mobileview' style={{ flexDirection: "column" }}>
                {financingPageData  ? (
                    financingPageData && financingPageData?.slides?.mobile?.map((items, index) => (
                    <Link
                        className="payment-solution-single-card"
                        key={index}
                        href={items?.link_url} target='_blank' >
                        <img className='' src={url + items?.image_url} alt="" srcset="" />
                    </Link>

                ))
                ) : (
                    <div className='financing-page-main-banner-shimmer'></div>
                )}
            </div>

        </div>
    )
}

export default FinancingClient
