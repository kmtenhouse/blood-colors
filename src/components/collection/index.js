import React from 'react';
import './collection.css';
import Colorbox from '../colorbox';

function Collection(props) {
    if(!props.colors || props.colors.length===0) {
        return(
            <div>
            </div>
        );
    } 

    console.log(props);
    console.log(props.tier);
    //otherwise, loop through and make lots of tiny colorboxes :)
    return(
        props.colors.map( (color, index) => (props.tier===color.tier ? <Colorbox key={index} hex={color.hex}></Colorbox> : '') )
    );
}

export default Collection;
