import React from 'react';
import './colorbox.css';

function Colorbox(props) {
    let style = {
        backgroundColor: "#"+props.hex || "transparent"
    };

  return (
    <div className={props.size==='large' ? "colorbox colorbox--large" : "colorbox" } style={style}>
      {props.children}
    </div>
  );
}

export default Colorbox;
