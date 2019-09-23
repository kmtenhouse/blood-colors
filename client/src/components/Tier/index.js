import React from 'react';
import './tier.css';


function Tier(props) {
  const { color, name} = props;
  console.log(color);
  const tierColors = { 
    backgroundColor: ( (color && color.hex) ? color.hex : "#000000"),
    color: ( (color && color.contrastColor) ? color.contrastColor : "#FFFFFF")
  };


  return (
    <div className="tier">
      <div className="tier__header" style={tierColors}>
        <h2 className="tier__title">{(name ? name : '')}</h2>
      </div>
      <div className="tier__collection">Collection goes here</div>
    </div>
  );
}

export default Tier;
