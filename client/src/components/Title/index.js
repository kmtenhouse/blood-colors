import React from 'react';

function Title(props) {
    return (
        <React.Fragment>
            <h2 className="spectrum__title">{props.children}</h2>
        </React.Fragment>
    );
}

export default Title;
