import React from 'react';
import './form.css';

function Form(props) {
  return (
    <div>
      <input type="input" value={props.casteName} onChange={props.handleOnChange} />
      <p>{props.casteName}</p>
    </div>
  );
}

export default Form;
