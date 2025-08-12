import React, { useEffect } from 'react';
import './ToggleSwitch.css';

const SlimToggler = ({ id, checked, onChange }) => {

  useEffect(() => {
    console.log("checked value", checked)

  }, [checked])
  return (

    // Check Box 1
     <div className="checkbox-wrapper-3">
      <label className="toggle">
        <input type="checkbox" id={id} checked={checked} onChange={onChange} />
        <span></span>
      </label>
    </div>
  );
};

export default SlimToggler;





