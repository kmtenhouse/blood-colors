import React from 'react';
import './palette.css';

function Palette(props) {
  return (
    <div className="palette">
      {props.children}
    </div>
  );
}

export default Palette;