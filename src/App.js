import React from 'react';
import './App.css';
import Tier from './components/tier';
import Container from './components/container';
import Colorbox from './components/colorbox';
import Collection from './components/collection';
import offSpec from './data/off-spectrum';
import castes from './data/hemospectrum-colors';
import allColors from './data/all-colors';
import canonTrolls from './data/canon-trolls';
import { hexToHSL, hexToRGB } from './utils/hex-conversion';
import Form from './components/Form';


class App extends React.Component {

  constructor(props) {
    super(props);
    let casteColors = castes.map(caste => {
      let currCaste = this.createColorObject(caste);
      currCaste.tier = caste[1];
      return currCaste;
    });

    let offColors = offSpec.map(caste => {
      let currCaste = this.createColorObject(caste);
      currCaste.tier = caste[1];
      return currCaste;
    });

    this.state = {
      tierColors: casteColors,
      offSpecColors: offColors,
      colors: []
    };
  }

  componentDidMount() {
    this.distributeColors(canonTrolls);
    this.distributeColors(allColors);
  }

  createColorObject(color) {
    let newObj = {
      hex: color[0],
      name: color[1],
      tier: ''
    };
    return newObj;
  }

  //looks at our current tiers to determine where to distribute
  getRGBFit(color) {
    let currentCastes = [].concat(this.state.tierColors, this.state.offSpecColors);
    let colorHex = hexToRGB(color.hex);
    let colorHSL = hexToHSL(color.hex);
    let results = currentCastes.map(caste => {
      let casteHex = hexToRGB(caste.hex);
      let casteHSL = hexToHSL(caste.hex);
      return {
        tier: caste.name,
        totalDistance: Math.abs(casteHex.r - colorHex.r) + Math.abs(casteHex.g - colorHex.g) + Math.abs(casteHex.b - colorHex.b)
      };
    });

    results = results.sort((a, b) => (a.totalDistance > b.totalDistance ? 1 : -1));

    //check for any dupes;
    let bestMatch = results[0].totalDistance;
    let allMatches = results.filter(result => result.totalDistance === bestMatch);

    return (allMatches.length === 1 ? results[0].tier : "indeterminate");

  }

  distributeColors(arr) {
    //grab the current colors from state
    let colorsToDistro = arr.map(troll => this.createColorObject(troll));

    colorsToDistro.forEach(swatch => {
      swatch.tier = this.getRGBFit(swatch);
    });
    this.setState({ colors: colorsToDistro });
  }

  handleChange(e) {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <Container>
        <Form casteName={this.state.casteName} onChange={this.handleChange} />

        <h2>Can't Determine</h2>
        <Tier name="indeterminate" hex="FFFFFF">

          <Collection tier="indeterminate" colors={this.state.colors} />
        </Tier>
        <h2>Hemospectrum</h2>
        {
          this.state.tierColors.map((caste, index) => (
            <Tier name={caste.tier} key={index} hex={caste.hex}>

              <Collection tier={caste.tier} colors={this.state.colors} />
            </Tier>
          ))
        }
        <h2>Off-Spectrum</h2>
        {
          this.state.offSpecColors.map((caste, index) => (
            <Tier name={caste.tier} key={index} hex={caste.hex}>
              <Collection tier={caste.tier} colors={this.state.colors} />
            </Tier>
          ))
        }
      </Container>
    );
  }
}


export default App;
