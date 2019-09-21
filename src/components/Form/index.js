import React from 'react';
import './form.css';

function Form(props) {
  return (
    <div className="row">
      <div className="col-12">
        <form onSubmit={props.handleSubmit}>
          <label>
            Y:
          <input type="text" name="yWeight" value={props.yWeight} onChange={props.handleChange} />
          </label>
          <label>
            U:
          <input type="text" name="uWeight" value={props.uWeight} onChange={props.handleChange} />
          </label>
          <label>
            V:
          <input type="text" name="vWeight" value={props.vWeight} onChange={props.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default Form;
