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

    this.moveTiers = this.moveTiers.bind(this);
  }

  async componentDidMount() {
    //perform an axios call to get our tiers
    this.refreshColors();
  }

  /*   Form Handling */
  handleChange(e) {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  async refreshColors() {
    const allTiers = await axios.get(`${baseURL}/api/tiers`);
    const tiers = allTiers.data;
    const allColors = await axios.get(`${baseURL}/api/colors`);
    const colors = allColors.data;
    this.setState({ colors, tiers });
  }

  async moveTiers(colorToUpdate, newTierId) {
    console.log(colorToUpdate, newTierId);
    let newColors = this.state.colors;
    //First, remove the color from its existing tier (if it has one):
    if (colorToUpdate.tier && colorToUpdate.tier!=="-1") {
      //axios call to delete from old tier
      await axios.delete(`${baseURL}/api/tiers/${colorToUpdate.tier}/colors/${colorToUpdate._id}`);
    } else {
      //Prepare to update the local state as well
      newColors = this.state.colors.filter(currColor => currColor._id !== colorToUpdate._id);
    }

    //If the new tier is not off spectrum, set that as well:
    if (newTierId !== "-1") {
      await axios.post(`${baseURL}/api/tiers/${newTierId}/colors/${colorToUpdate._id}`);
    } else {
      newColors = this.state.colors;
      newColors.push(colorToUpdate);
    }

    //Now update the local state to match the remote db!
    const allTiers = await axios.get(`${baseURL}/api/tiers`);
    const tiers = allTiers.data;
    this.setState({ colors: newColors, tiers });
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
              key={currentTier._id}
              dropDownChange={this.moveTiers}>
              {currentTier.colors.map(currentColor => (
                <Colorbox color={currentColor} tiers={this.state.tiers} dropDownChange={this.moveTiers} key={currentColor._id} />
              ))}
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
