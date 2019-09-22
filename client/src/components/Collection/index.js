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
        props.colors.map( color => <Colorbox castes={props.castes} handleDropDown={props.handleDropDown} handleLockToggle={props.handleLockToggle} size="thumbnail" key={color._id} color={color}></Colorbox> )
    );
}

export default Collection;
