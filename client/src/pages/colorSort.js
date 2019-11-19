/* Import React */
import React from 'react';

/* Import Axios for requests */
import axios from 'axios';


/* Import components */
import Container from '.././components/Container';
import Spectrum from '.././components/Spectrum';
import Tier from '.././components/Tier';
import Palette from '.././components/Palette';
import Colorbox from '.././components/Colorbox';

/* Import local data sources */
const baseURL = "http://localhost:3001"

class ColorSort extends React.Component {

  constructor(props) {
    super(props);
    //bindings!
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      tiers: [],
      colors: []
    };

    this.moveTiers = this.moveTiers.bind(this);
    this.onLock = this.onLock.bind(this);
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
    const allTiers = await axios.get(`${baseURL}/api/tiers/filter/withcolors`);
    const tiers = allTiers.data;
    const allColors = await axios.get(`${baseURL}/api/colors/filter/notier`);
    let colors = allColors.data;
    this.setState({ colors, tiers });
  }

  async moveTiers(colorToUpdate, newTierId) {

    //First, remove the color from its existing tier (if it has one):
    if (colorToUpdate.tier && colorToUpdate.tier !== "-1") {
      //axios call to delete from old tier
      await axios.delete(`${baseURL}/api/tiers/${colorToUpdate.tier}/colors/${colorToUpdate._id}`);
    }

    //If the new tier is not off spectrum, set that as well:
    if (newTierId !== "-1") {
      await axios.post(`${baseURL}/api/tiers/${newTierId}/colors/${colorToUpdate._id}`);
    }

    //Now update the local state to match the remote db!
    this.refreshColors();
  }

  async onLock(colorToUpdate) {
    console.log(colorToUpdate);
    if (!colorToUpdate.tier) {
      //if there is a suggested tier and we've clicked 'yes' -- make an axios call to save this color for this tier!
      await axios.post(`${baseURL}/api/tiers/5dcea13b056b7a2fe4fe6844/colors/${colorToUpdate._id}`);

      //Now update the local state to match the remote db!
      this.refreshColors();
    }
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
                <Colorbox color={currentColor} tiers={this.state.tiers} dropDownChange={this.moveTiers}key={currentColor._id} />
              ))}
            </Tier>))}
        </Spectrum>
        <Spectrum title="Undecided">
          <Palette>
            {this.state.colors.map(currentColor => (
              <Colorbox color={currentColor} tiers={this.state.tiers} dropDownChange={this.moveTiers} onLock={this.onLock} key={currentColor._id} />
            ))}
          </Palette>
        </Spectrum>
      </Container>
    );
  }
}

export default ColorSort;