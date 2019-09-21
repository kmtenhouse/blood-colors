import React from 'react';
import './tier.css';
import { textContrast } from '../../utils/hex-conversion';


function Tier(props) {
  const hex = props.caste.hex || "000000";
  const contrastColor = "#" + textContrast(hex);

  const style = {
    backgroundColor: "#" + hex,
    color: contrastColor,
  };

  let displayName = props.caste.name || '';
  if (displayName.length > 0) {
    displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1).toLowerCase();
  }

  return (
    <div className="row my-4 tier">
      <div className="col-12 mb-0">
        <div className="mb-0 d-flex flex-row justify-content-between tier__header" style={style}>
          <h3 className="mb-0 d-inline-block py-2 px-3 tier__label" >{displayName}</h3>
          {props.onDelete ? (<button onClick={() => { props.onDelete(props.caste) }} className="d-inline-block py-2 px-3 btn tier__button" style={style}>X</button>) : ''}
        </div>
      </div>
      <div className="tier__collection col-12 d-flex flex-row flex-wrap justify-content-start tier__collection">
        {props.children}
      </div>
    </div>
  );
}

export default Tier;
