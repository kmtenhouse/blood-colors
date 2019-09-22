import React from 'react';

function Title(props) {
    return(
        <div className="row">
            <div className="col-12">
                <h2>{props.children}</h2>
            </div>
        </div>
    );
}

export default Title;
