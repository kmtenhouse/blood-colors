import React from 'react';
import './colorbox.css';


function Colorbox(props) {
  const { _id, name, hex, contrastColor } = props.color;
  const tiers = (props.tiers ? props.tiers : [])

  let style = {
    backgroundColor: hex,
    color: contrastColor
  };

  let selectStyle = {
    borderColor: contrastColor
  };

  return (
    <div className="colorbox" style={style}>
      <ul className="colorbox__info">
        <li className="colorbox__label">{(name ? name : '')}</li>
        <li className="colorbox__label"> {hex}</li>
        {tiers.length > 0 ? (
          <li className="colorbox__label">
            <select style={selectStyle} onChange={(event)=>{
              event.preventDefault();
              if(props.dropDownChange && event.target.value!==-2) {
                props.dropDownChange(props.color, event.target.value);
              }
            }}>
              <option value="-2">Select:</option>
              <option value="-1">Off Spectrum</option>
              {tiers.map(currentTier => (<option key={_id + currentTier._id} value={currentTier._id}>{currentTier.name}</option>) )}
            </select>
          </li>) : ''}
      </ul>
    </div>
  );
}

export default Colorbox;
