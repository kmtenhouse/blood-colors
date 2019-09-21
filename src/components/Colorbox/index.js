import React from 'react';
import './colorbox.css';
import { textContrast } from '../../utils/hex-conversion';


function Colorbox(props) {

  const hex = (props.color.hasOwnProperty('hex') ? props.color.hex : "FFFFFF");
  let style = {
    backgroundColor: "#" + hex,
    color: "#" + textContrast(hex)
  };

  return (
    <div className={props.size === 'large' ? "colorbox colorbox--large" : "colorbox colorbox--thumbnail"} style={style}>
      <p className="colorbox__label">{(props.color.hasOwnProperty('name') ? props.color.name : '')}</p>
      { <p className="colorbox__label">{(props.color.hasOwnProperty('fit') ? props.color.fit : '')}</p>}
      <p className="colorbox__label">Y: { (props.color.hasOwnProperty('y') ? props.color.y : '')} U: {(props.color.hasOwnProperty('u') ? props.color.u : '')} V: {(props.color.hasOwnProperty('v') ? props.color.v : '')}</p> 
     
    </div>
  );
}

export default Colorbox;
