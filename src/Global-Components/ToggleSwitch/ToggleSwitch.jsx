import React from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({ id, checked, onChange }) => {
  return (

    // Check Box 1
    //  <div className="checkbox-wrapper-3">
    //   <label className="toggle">
    //     <input type="checkbox" id={id} checked={checked} onChange={onChange} />
    //     <span></span>
    //   </label>
    // </div>

    // Checkbox 2
    <div className="checkbox-wrapper-7" >
      <input className="tgl tgl-ios" type="checkbox" id={id} checked={checked} onChange={onChange} />
      <label className="tgl-btn" for={id}></label>
    </div>


    // <div className="checkbox-wrapper-7">
    //   <input 
    //     className="tgl tgl-ios" 
    //     id={id} 
    //     type="checkbox" 
    //     checked={checked} 
    //     onChange={onChange} 
    //   />
    //   <label className="tgl-btn" htmlFor={id}>
    //   <span className="toggle-text">{checked ? 'Yes Protect it' : 'No Thanks'}</span>
    //   </label>
    // </div>
  );
};

export default ToggleSwitch;





