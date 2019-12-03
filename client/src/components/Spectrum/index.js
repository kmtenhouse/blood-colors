import React from 'react';
import './spectrum.css';

function Spectrum(props) {
    return (
        <div className="spectrum">
            <h2 className="spectrum__title">{(props.title ? props.title : '')}</h2>
            <div className="spectrum__body">
                {props.children}
            </div>
        </div>
    );
}

export default Spectrum;
