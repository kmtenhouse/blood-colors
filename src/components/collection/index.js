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
    //otherwise, loop through and make lots of tiny colorboxes :)
    //NOTE: someday we'll need to pass in a color id too
    return( 
        props.colors.map( (color, index) => (props.tier===color.tier ? <Colorbox size="thumbnail" key={index} name={color.name} hex={color.hex}></Colorbox> : '') )
    );
}

export default Collection;
