import React from 'react';
import Colorbox from '../Colorbox';

function Collection(props) {

    if(!props.colors || props.colors.length===0) {
        return(
            <div>
            </div>
        );
    } 

    return( 
        props.colors.map( (color, index) => <Colorbox size="thumbnail" key={index} name={color.name} hex={color.hex}></Colorbox> )
    );
}

export default Collection;
