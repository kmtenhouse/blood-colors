import React from 'react';
import './form.css';

function Form(props) {
  return (
    <form>
      <label>
        Name:
      <input type="text" name="name" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Form;
