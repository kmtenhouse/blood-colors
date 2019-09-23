/* Import React */
import React from 'react';
import './App.css';

/* Import components */
import Tier from './components/Tier';
import Container from './components/Container';
import Title from './components/Title';
import Form from './components/Form';
import { RGBtoYUV } from './utils/hex-conversion';

/* Import local data sources */

class App extends React.Component {

  constructor(props) {
    super(props);
    //bindings!
    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount() {
  }

  /*   Form Handling */
  handleChange(e) {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {

    return (
      <Container>
        <Title>Hemospectrum</Title>
        
      </Container>
    );
  }
}


export default App;
