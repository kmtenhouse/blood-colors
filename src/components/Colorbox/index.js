import React from 'react';
import './colorbox.css';
import { textContrast } from '../../utils/hex-conversion';


function Colorbox(props) {

  const hex = (props.color.hasOwnProperty('hex') ? props.color.hex : "FFFFFF");
  let style = {
    backgroundColor: "#" + hex,
    color: "#" + textContrast(hex)
  };

  let sum = null;
  if(props.color.hasOwnProperty('rgbDiff') && props.color.hasOwnProperty('yuvDiff')) {
    sum = props.color.rgbDiff + props.color.yuvDiff;
  }

  return (
    <div className="colorbox" style={style}>
      <p className="colorbox__label">{(props.color.hasOwnProperty('name') ? props.color.name : '')}</p>
      <p className="colorbox__label">{(props.color.hasOwnProperty('hex') ? props.color.hex : '')}</p>
     
    </div>
  );
}

export default Colorbox;
