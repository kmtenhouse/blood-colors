import React from 'react';
import './tier.css';
import Colorbox from '../colorbox';

function Tier(props) {
  const style = {
    backgroundColor: "#" + props.hex || "FFFFFF"
  };

  return (
    <div className="tier">
      <div className="tier__header" style={style}>
        <h6>{props.name}</h6>
      </div>
      <div className="tier__collection">
          {props.children}
        </div>
      </div>
      );
    }
    
    export default Tier;
