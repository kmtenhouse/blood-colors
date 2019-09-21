import React from 'react';
import './tier.css';

function Tier(props) {
  const style = {
    backgroundColor: "#" + props.hex || "FFFFFF"
  };

  return (
    <div className="tier">
      <div className="tier__header" style={style}>
        
      </div>
      <div className="tier__collection">
          {props.children}
        </div>
      </div>
      );
    }
    
    export default Tier;
