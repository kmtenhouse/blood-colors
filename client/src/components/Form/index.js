import React from 'react';
import './form.css';

function Form(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-row">

        <div className="col">
          <label className="sr-only" htmlFor="yWeight">Y</label>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">Y</div>
            </div>
            <input type="number" min="0" step="0.05" className="form-control" id="yWeight" name="yWeight" value={props.yWeight} onChange={props.handleChange} />
          </div>
        </div>

        <div className="col">
          <label className="sr-only" htmlFor="uWeight">U</label>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">U</div>
            </div>
            <input type="number" min="0" step="0.05" className="form-control" id="uWeight" name="uWeight" value={props.uWeight} onChange={props.handleChange} />
          </div>
        </div>

        <div className="col">
          <label className="sr-only" htmlFor="vWeight">V</label>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">V</div>
            </div>
            <input type="number" min="0" step="0.05" className="form-control" id="vWeight" name="vWeight" value={props.vWeight} onChange={props.handleChange} />
          </div>

        </div>
        <button type="submit" className="btn btn-secondary">Change Weighting</button>
      </div>
      <button onClick={props.handleColorsReset} className="btn btn-secondary">Reset</button>
    </form>

  );
}

export default Form;
