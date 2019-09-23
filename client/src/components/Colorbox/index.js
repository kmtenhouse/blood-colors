import React from 'react';
import './colorbox.css';


function Colorbox(props) {
  const { name, hex, contrastingColor} = props.color;

  let style = {
    backgroundColor: hex,
    color: contrastingColor
  };
/* 
  let selectStyle = {
    borderColor: contrastingColor
  }; */

  const materialIcon = "lock_open";
  const materialIconClasses = "material-icons " + (contrastingColor === "#FFFFFF" ? "md-light" : "md-dark") + " md-inactive";
 
  return (
    <div className="colorbox" style={style}>
      <ul className="colorbox__info">
        <li className="colorbox__label">{(name ? name : '')}</li>
        <li className="colorbox__label"> { hex }</li>
        <li className="colorbox__label">
          <button className="colorbox__button" /* onClick={(event)=>{props.handleLockToggle(event, props.color)}} */ >
            <i className={materialIconClasses}>{materialIcon}</i>
          </button>
        </li>
{/*         <select value={props.color.caste} className="colorbox__select" style={selectStyle} onChange={(event) => { props.handleDropDown(event, props.color) }}>
          {(props.hasOwnProperty('castes') && props.castes ? props.castes.map(currCaste => {
            return (
              <option className="colorbox__option" value={currCaste.name} key={currCaste._id} >{currCaste.name}</option>
            );
          }) : '')}
          <option className="colorbox__option" value="indeterminate">offspectrum</option>
        </select> */}
      </ul>
    </div>
  );
}

export default Colorbox;
