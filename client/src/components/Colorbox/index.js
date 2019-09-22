import React from 'react';
import './colorbox.css';
import { textContrast } from '../../utils/hex-conversion';


function Colorbox(props) {

  const hex = "#" + (props.color.hasOwnProperty('hex') ? props.color.hex : "FFFFFF");
  const contrastingColor = "#" + textContrast(hex);
  let style = {
    backgroundColor: hex,
    color: contrastingColor
  };

  const materialIcon = ((props.color.hasOwnProperty('definesCaste') && props.color.definesCaste === true) ? 'lock' : 'lock_open');
  const materialIconClasses = "material-icons " + (contrastingColor === "#FFFFFF" ? "md-light" : "md-light") + "md-inactive";

  return (
    <div className="colorbox" style={style}>
      <ul className="colorbox__info">
        <li className="colorbox__label">{(props.color.hasOwnProperty('name') ? props.color.name : '')}</li>
        <li className="colorbox__label"> {(props.color.hasOwnProperty('hex') ? props.color.hex : '')}</li>
        <li className="colorbox__label"><button className="colorbox__button"><i className={materialIconClasses}>{materialIcon}</i></button></li>
      </ul>
    </div>
  );
}

export default Colorbox;
