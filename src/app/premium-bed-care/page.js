import React from "react";
import './PremiumBedCare.css';
import Image from "next/image";
import PremiumBedDetails from "@/UI/Components/Premium-Bed-Componnts/PremiumBedDetails/PremiumBedDetails";

const PremiumBedCare = () => {
    return (
        <div className="pbc_main_container">
            {/* <Image className="pbc_main_banner_image" src={'/Assets/Protection-Plan.jpg'} width={1590} height={360} alt="protection main image" /> */}
            <div className="pbc_overlay_container">
                <span>
                    <h3>PREMIUM BED</h3>
                    <h3>CARE PROTECTION</h3>
                    <h3>PLAN</h3>
                    <p>10-Year Protection For Mattress & Power Base</p>
                </span>
            </div>

            <div className="pbc_content_contianer">
                <PremiumBedDetails />
            </div>
        </div>
    )
}

export default PremiumBedCare;