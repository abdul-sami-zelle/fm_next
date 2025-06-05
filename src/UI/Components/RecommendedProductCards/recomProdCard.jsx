import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { GrPowerCycle } from "react-icons/gr";
import Image from "next/image";
import { url } from "@/utils/api";

import "./style.css";

export default function RecomProductCard({ handleQuickView, slug, singleProductData, mainImage,handleRemoveProduct ,handleSingleShuffle, parentProduct}) {
    const [mainLoaded, setMainLoaded] = useState(false);
    const [hoverLoaded, setHoverLoaded] = useState(false);

    return (
        <div className="recommendedProductCard">
            {parentProduct && (<div className="rpc_header_top_space"><p>Current Product</p></div>)}
            <div className={`rpc_header_container ${parentProduct ? 'hide-shuffle-buttons' : ''}`}>
                <button onClick={handleRemoveProduct} className="remove-icon-header"><IoClose size={20} /></button>
                <div className="header-label"></div>
                <button onClick={handleSingleShuffle}  className="remove-icon-header"><GrPowerCycle size={20} /></button>
            </div>
            <div className="rpc_body">
                <div className="image_wrapper_rpc">
                    <div className="rpc_image_hover_container">
                        {!mainLoaded && <div className="shimmer" />}
                        <Image
                            src={url + mainImage}
                            alt={singleProductData?.name || "Product Image"}
                            width={300}
                            height={200}
                            className="rpc_image first"
                            onLoad={() => setMainLoaded(true)}
                        />
                        {singleProductData.images[1]?.image_url && (
                            <>
                                {!hoverLoaded && <div className="shimmer" />}
                                <Image
                                    src={url + singleProductData.images[1].image_url}
                                    alt="Hover Product Image"
                                    width={300}
                                    height={200}
                                    className="rpc_image second"
                                    onLoad={() => setHoverLoaded(true)}
                                />
                            </>
                        )}
                    </div>
                </div>

                <div className="info_container_rpc">
                    <span className="rpc_product_name">
                        {singleProductData?.name}
                    </span>
                    <div className="rpc_pricing_section">
                        <h2 className={singleProductData?.sale_price === "" ? "rpc_price" : "rpc_price sale"}>
                            ${singleProductData?.sale_price === "" ? singleProductData?.regular_price : singleProductData?.sale_price}
                        </h2>
                        <button className={`rpc_recomanded_quick_view_button ${parentProduct ? 'hide_recomanded_quick_view_button' : ''}`} onClick={handleQuickView}>Quick View</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
