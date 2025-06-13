import React from "react";
import "./DesignYourRoomIndv.css";
import { url } from "@/utils/api";

export default function DesignYourRoomIndv({ image }) {
  return (
    <div className="design_room_indv">
      <h3>Design Your Room</h3>
      <div
        className="design_room_main_indv"
        style={{ backgroundImage: `url(${url+image})` }}
      >
        <div className="overlay" />
        <div className="overlay-content-dri">
          <h2>Design Your Dream Home And Step Inside.</h2>
          <p>Use our free Room Design Tool To Find Your Style,Set Your Budget And Design Your Space.</p>
          <button>Get Started</button>
        </div>
      
      </div>
    </div>
  );
}
