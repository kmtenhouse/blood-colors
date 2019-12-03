import React from 'react';
import './tier.css';

function Tier(props) {
  // Deconstruct the props
  const { displayColor, name} = props;

  // Next, set values for the tier's overall styling
  const hex = ((displayColor && displayColor.hasOwnProperty('hex')) ? displayColor.hex : "#000000");
  const contrastColor = ((displayColor && displayColor.hasOwnProperty('contrastColor')) ? displayColor.contrastColor : "#FFFFFF");

  const tierColors = {
    backgroundColor: hex,
    color: contrastColor
  };

  //Make the tier names more legible (if necessary)
  let nameToShow = "";
  if(name) {
    nameToShow = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  return (
    <div className="tier">
      <div className="tier__header" style={tierColors}>
        <h2 className="tier__title">{nameToShow}</h2>
      </div>
      <div className="tier__collection">
        {props.children}
      </div>
    </div>
  );
}

export default Tier;
