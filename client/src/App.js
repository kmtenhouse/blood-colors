/* Import React */
import React from 'react';
import './App.css';

/* Import components */
import Container from './components/Container';
import Spectrum from './components/Spectrum';

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

        <Spectrum title="Hemospectrum">
          <h2>Test</h2>
        </Spectrum>

        <Spectrum title="Off Spectrum">
          <h2>Test</h2>
        </Spectrum>
      </Container>
    );
  }
}


export default App;
