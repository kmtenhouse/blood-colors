import React from 'react';
import './tier.css';
import { textContrast } from '../../utils/hex-conversion';

function DeleteButton() {
  return (
    <h3 onClick={() => { console.log("clicked") }} className="d-inline-block py-2 px-3">X</h3>
  );
}

function Tier(props) {
  const contrastColor = "#" + textContrast(props.hex);

  const style = {
    backgroundColor: "#" + props.hex || "FFFFFF",
    color: contrastColor || "FFFFFF",
  };

  let displayName = props.name || '';
  if (displayName.length > 0) {
    displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1).toLowerCase();
  }

  return (
    <div className="row my-4 tier">
      <div className="col-12 mb-0">
        <div className="mb-0 d-flex flex-row justify-content-between tier__header" style={style}>
          <h3 className="mb-0 d-inline-block py-2 px-3 tier__label" >{displayName}</h3>
          {props.canDelete ? DeleteButton() : ''}
        </div>
      </div>
      <div className="tier__collection col-12 d-flex flex-row flex-wrap justify-content-start tier__collection">
        {props.children}
      </div>
    </div>
  );
}

export default Tier;
