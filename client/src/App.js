/* Import React */
import React from 'react';
import './App.css';

/* Import components */
import Container from './components/Container';
import Spectrum from './components/Spectrum';
import Tier from './components/Tier';

/* Import local data sources */

class App extends React.Component {

  constructor(props) {
    super(props);
    //bindings!
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      tiers: [],
      colors: []
    };
  }

  componentDidMount() {
    //test data!
    const fakeTier = {
      name: "Rustie",
      order: 0,
      colors: [],
      _id: "5d888c1b46a0a604a402e950",
      displayColor: {
        name: "Rust - Aradia Tier",
        _id: "5d886724bd4b55584cbb1a8e",
        hex: "#a10000",
        contrastColor: "#FFFFFF",
        date: "2019-09-23T09:10:51.642Z",
        __v: 0
      },
      date: "2019-09-23T09:10:51.647Z",
      __v: 0
    };

    this.setState({ tiers: [fakeTier] });

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
          {this.state.tiers.map(tier => (
            <Tier key={tier._id} name={tier.name} color={tier.displayColor} >
            </Tier>)
          )}
        </Spectrum>

        <Spectrum title="Off Spectrum">
          <Tier>

          </Tier>
        </Spectrum>
      </Container>
    );
  }
}


export default App;
