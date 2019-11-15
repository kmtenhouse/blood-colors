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
import Palette from './components/Palette';
import Colorbox from './components/Colorbox';

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

  async componentDidMount() {
    //perform an axios call to get our tiers
    const allTiers = await axios.get(`${baseURL}/api/tiers`);
    const tiers = allTiers.data;
    const allColors = await axios.get(`${baseURL}/api/colors`);
    const colors = allColors.data.filter(color=> color.tier);
    this.setState({ colors, tiers });
  }

  /*   Form Handling */
  handleChange(e) {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  async moveTiers(color, tierId) {
    console.log(color.name);
    console.log(tierId);

    //First, if the color is going off spectrum:
    //Remove it from its current tier (if any)
    //Move it to the generic colors area

    //Otherwise, if it is going from tier A to tier B
    //Remove it from its current tier 
    //Replace that with tier B

    //Off-spectrum -> Tier A
    //Add it to Tier A
  }

  render() {
    return (
      <Container>
        <Spectrum title="Hemospectrum">
          {this.state.tiers.map(currentTier => (
            <Tier
              name={currentTier.name}
              displayColor={currentTier.displayColor}
              colors={currentTier.colors}
              key={currentTier._id}>
            </Tier>))}
        </Spectrum>
        <Spectrum title="Off Spectrum">
          <Palette>
            {this.state.colors.map(currentColor => (
              <Colorbox color={currentColor} tiers={this.state.tiers} dropDownChange={this.moveTiers} key={currentColor._id} />
            ))}
          </Palette>
        </Spectrum>
      </Container>
    );
  }
}


export default App;
