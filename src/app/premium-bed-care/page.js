import React from "react";
import './PremiumBedCare.css';
import FurnitureProtectionPlan from "@/UI/Components/Premium-Bed-Componnts/FurnitureProtectionPlan/FurnitureProtectionPlan";
import CoverUnderProtection from "@/UI/Components/Premium-Bed-Componnts/CoverUnderProtection/CoverUnderProtection";
import ProtectYourInvestment from "@/UI/Components/Premium-Bed-Componnts/ProtectYourInvestment/ProtectYourInvestment";
import BedCarePlan from "@/UI/Components/Premium-Bed-Componnts/BedCarePlan/BedCarePlan";

const PremiumBedCare = () => {
    return (
        
        <div className="pbc_main_container">
            {/* Hero Section */}
            <div className="pbc_bg_container">
                <div className="pbc_overlay_container">
                    <span>
                        <h3>PREMIUM</h3>
                        <h3>PROTECTION PLAN</h3>
                        {/* <h3>PLAN</h3>
                        <p>10-Year Protection For Mattress & Power Base</p> */}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="pbc_content_contianer">
                <FurnitureProtectionPlan />
                <CoverUnderProtection />
                <ProtectYourInvestment />
                <BedCarePlan />
            </div>
        </div>
    )
}

export default PremiumBedCare;