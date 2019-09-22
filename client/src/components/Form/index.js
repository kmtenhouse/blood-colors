import React from 'react';
import './form.css';

function Form(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-row">

        <div className="col">
          <label className="sr-only" htmlFor="fitConstraint">Fit</label>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">Fit</div>
            </div>
            <input type="number" min="0" step="1" className="form-control" id="fitConstraint" name="fitConstraint" value={props.fitConstraint} onChange={props.handleChange} />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mx-2">Update</button>
        <button onClick={props.handleColorsReset} className="btn btn-secondary">Reset</button>
      </div>
      
    </form>

  );
}

export default Form;
