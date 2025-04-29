import React from "react";
import './FinanceBannerSlider.css';
import { url } from "../../../utils/api";
import { useRouter } from "next/navigation";


function FinanceBanner2({image,mobileImage}) {
  const navigate = useRouter;
  const handleNavigate = () => {
    navigate.push(`/financing`);
  }
  return (
    <div className="finance_banner_2">
        <div className="finance_banner_2_desktop" >
            <img src={url+image?.image_url} alt="" srcset="" onClick={handleNavigate}/>
        </div>
        <div className="finance_banner_2_mobile">
            <img src={url+mobileImage?.image_url} alt="" srcset="" />
        </div>
    </div>
  );
}

export default FinanceBanner2;
