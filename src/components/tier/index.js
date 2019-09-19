import React from 'react';
import './tier.css';

function Tier(props) {
  return (
    <div className="tier">
      <div className="tier__body">
        {props.children}
      </div>
    </div>
  );
}

export default Tier;
