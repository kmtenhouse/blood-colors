import React from 'react';
import './tier.css';
import Colorbox from '../colorbox';

function Tier(props) {
  return (
    <div className="tier">
      <Colorbox size="large" hex={props.hex} />
      <div className="tier__collection">
        {props.children}
      </div>
    </div>
  );
}

export default Tier;
