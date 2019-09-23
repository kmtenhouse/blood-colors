/* Import React */
import React from 'react';

/* Import Axios for requests */
import axios from 'axios';


/* Import CSS (for App) */
import './App.css';

/* Import components */
import Container from './components/Container';
import Spectrum from './components/Spectrum';
import Tier from './components/Tier';

/* Import local data sources */
const baseURL = "http://localhost:3001"

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
    //perform an axios call to get our tiers
    axios.get(`${baseURL}/api/tiers`)
      .then(res => {
        const tiers = res.data;
        this.setState({ tiers });
      })
      .catch(err => console.log("Error:", err));
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
