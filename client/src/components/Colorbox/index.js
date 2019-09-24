import React from 'react';
import './colorbox.css';


function Colorbox(props) {
  const { name, hex, contrastingColor } = props.color;
  const tiers = (props.tiers ? props.tiers : [])

  let style = {
    backgroundColor: hex,
    color: contrastingColor
  };

  let selectStyle = {
    borderColor: contrastingColor
  };

  return (
    <div className="colorbox" style={style}>
      <ul className="colorbox__info">
        <li className="colorbox__label">{(name ? name : '')}</li>
        <li className="colorbox__label"> {hex}</li>
        {tiers.length > 0 ? (
          <li className="colorbox__label">
            <select className="colorbox__select" style={selectStyle}>
              <option value={tiers._id}>{tiers.name}</option>
            </select>
          </li>) : ''}
      </ul>
    </div>
  );
}

export default Colorbox;
