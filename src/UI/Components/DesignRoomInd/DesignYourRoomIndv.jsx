import React, { useState } from "react";
import "./DesignYourRoomIndv.css";
import { url } from "@/utils/api";

export default function DesignYourRoomIndv({ image,openFN, designRef }) {

  const [showIframe, setShowIframe] = useState(false);
  return (
    <div className="design_room_indv" id={'DesignYourRoom'} ref={designRef}>
      
      {!showIframe && (
        <div
          className="design_room_main_indv"
          style={{ backgroundImage: `url(${url + image})` }}
        >
          <div className="overlay" />
          <div className="overlay-content-dri">
            <h2>Design Your Dream Home And Step Inside.</h2>
            <p>Use our free Room Design Tool To Find Your Style,Set Your Budget And Design Your Space.</p>
            <button onClick={()=>{openFN()}}>Get Started</button>
          </div>

        </div>
      )}

      {showIframe && (
        <div className="iframe-container">
          <iframe
            src="https://room.myfurnituremecca.com/design/living-room"
            title="Design Your Room"
            allowfullscreen={true}
            style={{
              transform: "scale(0.8)",
              transformOrigin: "50% 50%",
              width: "125%", 
              height: "600px",
              border: "none",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />
        </div>
      )}

    </div>
  );
}
