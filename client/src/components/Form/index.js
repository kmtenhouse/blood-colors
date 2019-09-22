import React from 'react';
import './form.css';

function Form(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-row">

        <div className="col-xl-3 offset-xl-9 d-flex flex-row">
          <button onClick={props.handleColorsReset} className="btn btn-secondary">Start Over From Scratch</button>
        </div>
      </div>

    </form>

  );
}

export default Form;
