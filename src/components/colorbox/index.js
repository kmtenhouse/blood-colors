import React from 'react';
import './colorbox.css';
import { textContrast } from '../../utils/hex-conversion';

function Colorbox(props) {
    let style = {
        backgroundColor: "#"+props.hex || "transparent",
        color: "#"+textContrast(props.hex) || "000000"
    };

  return (
    <div className={props.size==='large' ? "colorbox colorbox--large" : "colorbox colorbox--thumbnail" } style={style}>
      <p className="colorbox__label">{(props.name ? props.name : '')}</p>
      <p className="colorbox__label">{(props.hex ? props.hex : '')}</p>
    </div>
  );
}

export default Colorbox;
