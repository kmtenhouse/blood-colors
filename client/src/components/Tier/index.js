import React from 'react';
import './tier.css';
import Collection from '../Collection';
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
    <div className="container-fluid tier">
      <div className="row">
        <div className="col-12 mb-0 px-0">
          <div className="mb-0 d-flex flex-row justify-content-between tier__header" style={style}>
            <h3 className="mb-0 d-inline-block py-2 px-3 tier__label" >{displayName}</h3>
            {props.onDelete ? (<button onClick={() => { props.onDelete(props.caste) }} className="d-inline-block py-2 px-3 btn tier__button" style={style}>X</button>) : ''}
          </div>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-12 d-flex flex-row flex-wrap justify-content-start px-0 tier__definition">
          <Collection caste={props.caste} colors={props.colors.filter(color => (color.hasOwnProperty('definesCaste') && color.definesCaste === true))} />
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex flex-row flex-wrap justify-content-start px-0 tier__collection">
          <Collection caste={props.caste} colors={props.colors} />
        </div>
      </div>
    </div>

  );
}

export default Tier;
