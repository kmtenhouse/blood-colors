import React from 'react';
import './tier.css';
import { textContrast } from '../../utils/hex-conversion';

function Tier(props) {
  const style = {
    backgroundColor: "#" + props.hex || "FFFFFF",
    color: "#" + textContrast(props.name) || "FFFFFF"
  };

  let displayName = props.name || '';
  if(displayName.length > 0) {
    displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1).toLowerCase();
  }

  return (
    <div className="tier row my-4">
      <div className="tier__header col-12">
        <h3 className="tier__label" style={style}>{displayName}</h3>
      </div>
      <div className="tier__collection col-12 d-flex flex-row flex-wrap justify-content-start">
        {props.children}
      </div>
    </div>
  );
}

export default Tier;
