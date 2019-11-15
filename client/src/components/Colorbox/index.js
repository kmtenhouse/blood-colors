import React from 'react';
import './colorbox.css';


function Colorbox(props) {
  const { _id, name, hex, contrastColor } = props.color;
  const tiers = (props.tiers ? props.tiers : []);
  const showLock = (props.onLock ? true : false);

  let style = {
    backgroundColor: hex,
    color: contrastColor
  };

  let selectStyle = {
    borderColor: contrastColor
  };

  return (
    <div className="colorbox" style={style}>
      <ul className="colorbox__info">
        <li className="colorbox__label">{(name ? name : '')}</li>
        <li className="colorbox__label"> {hex}</li>
        {(showLock ? ( <li onClick={(event)=> { event.preventDefault(); props.onLock(props.color);}} className="colorbox__label"><i className="material-icons" style={style}>{(props.color.tier && props.color.tier!==-1 ? 'lock' : 'lock_open')}</i></li>) : '')}
        {props.dropDownChange && tiers.length > 0 ? (
          <li className="colorbox__label">
            <select style={selectStyle} onChange={(event)=>{
              event.preventDefault();
              if(props.dropDownChange && event.target.value!==-2) {
                props.dropDownChange(props.color, event.target.value);
              }
            }}>
              <option value="-2">Select:</option>
              <option value="-1">Pallete</option>
              {tiers.map(currentTier => (<option key={_id + currentTier._id} value={currentTier._id}>{currentTier.name}</option>) )}
            </select>
          </li>) : ''}
      </ul>
    </div>
  );
}

export default Colorbox;
