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

  let selectStyle = {
    borderColor: contrastingColor
  };

  const materialIcon = ((props.color.hasOwnProperty('definesCaste') && props.color.definesCaste === true) ? 'lock' : 'lock_open');
  const materialIconClasses = "material-icons " + (contrastingColor === "#FFFFFF" ? "md-light" : "md-dark") + ((props.color.hasOwnProperty('definesCaste') && props.color.definesCaste === true) ? "" : " md-inactive");

  return (
    <div className="colorbox" style={style}>
      <ul className="colorbox__info">
        <li className="colorbox__label">{(props.color.hasOwnProperty('name') ? props.color.name : '')}</li>
        <li className="colorbox__label"> {(props.color.hasOwnProperty('hex') ? props.color.hex : '')}</li> 
        <li className="colorbox__label"><button onClick={(event)=>{props.handleLockToggle(event, props.color)}} className="colorbox__button"><i className={materialIconClasses}>{materialIcon}</i></button></li>
        <select value={props.color.caste} className="colorbox__select" style={selectStyle} onChange={(event)=>{props.handleDropDown(event, props.color)}}>
        { (props.hasOwnProperty('castes') && props.castes ? props.castes.map(currCaste => {
          return(
            <option className="colorbox__option" value={currCaste.name} key={currCaste._id} >{currCaste.name}</option>
          );
        } ) : '')}
        <option className="colorbox__option" value="indeterminate">offspectrum</option>
        </select>

       
      </ul>
    </div>
  );
}

export default Colorbox;
