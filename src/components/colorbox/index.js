import React from 'react';
import './colorbox.css';

function Colorbox(props) {
    let style = {
        backgroundColor: "#"+props.hex || "transparent"
    };

  return (
    <div className={props.size==='large' ? "colorbox colorbox--large" : "colorbox" } style={style}>
      <p>{(props.name ? props.name : '')}</p>
    </div>
  );
}

export default Colorbox;
