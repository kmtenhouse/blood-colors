import React from 'react';
import './tier.css';

function Tier(props) {
  return (
    <div className="tier">
        {props.children}
    </div>
  );
}

export default Tier;
