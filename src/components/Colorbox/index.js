import React from 'react';
import './colorbox.css';
import { textContrast } from '../../utils/hex-conversion';


function Colorbox(props) {

  let style = {
    backgroundColor: "#" + props.color.hex || "transparent",
    color: "#" + textContrast(props.color.hex) || "000000"
  };


  return (
    <div className={props.size === 'large' ? "colorbox colorbox--large" : "colorbox colorbox--thumbnail"} style={style}>
      <p className="colorbox__label">{(props.color ? props.color.name : '')}</p>
      <p className="colorbox__label">{(props.color ? props.color.fit : '')}</p> 
    </div>
  );
}

export default Colorbox;
