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
    <div className={props.size === 'large' ? "colorbox colorbox--large" : "colorbox colorbox--thumbnail"} style={style}>
      <p className="colorbox__label">{(props.color.hasOwnProperty('name') ? props.color.name : '')}</p>
      <p className="colorbox__label">Sum: {(sum? sum.toFixed(2): '')}</p>
      <p className="colorbox__label">RGB: {(props.color.hasOwnProperty('rgbDiff') ? props.color.rgbDiff.toFixed(2) : '')}</p>
      <p className="colorbox__label">YUV: {(props.color.hasOwnProperty('yuvDiff') ? props.color.yuvDiff.toFixed(2) : '')}</p>
{/*       { <p className="colorbox__label">{(props.color.hasOwnProperty('y') ? props.color.y.toFixed(2) : '')}</p>}
      { <p className="colorbox__label">{(props.color.hasOwnProperty('u') ? props.color.u.toFixed(2) : '')}</p>}
      { <p className="colorbox__label">{(props.color.hasOwnProperty('v') ? props.color.v.toFixed(2) : '')}</p>} */}
     
    </div>
  );
}

export default Colorbox;
