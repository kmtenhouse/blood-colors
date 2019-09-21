import React from 'react';
import './App.css';
import Tier from './components/tier';
import Container from './components/container';
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
    //castes are (currently) defined as a color object with a caste name and a boolean, on-spec or off-spec
    //first, go through all approved colors and make sure they're on spec...
    let onSpecCaste = castes.map(caste => {
      let currCaste = this.createColorObject(caste);
      currCaste.tier = caste[1];
      currCaste.onSpec = true;
      return currCaste;
    });

    //...then do the opposite with offspec
    let offSpecCaste = offSpec.map(caste => {
      let currCaste = this.createColorObject(caste);
      currCaste.tier = caste[1];
      currCaste.onSpec = false;
      return currCaste;
    });

    //join those together and set in the state
    const allCastes = [].concat(onSpecCaste, offSpecCaste);

    this.state = {
      castes: allCastes,
      colors: [] //and no colors to distro just yet
    };
  }

  componentDidMount() {
    //(TO-DO):
    //long term these will come from the server
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
    let currentCastes = this.state.castes;
    let colorHex = hexToRGB(color.hex);

    let results = currentCastes.map(caste => {
      let casteHex = hexToRGB(caste.hex);

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

  removeCaste(param) {
    console.log(param);
  }

  render() {
    return (
      <Container>
        <h2>Hemospectrum</h2>
        {
          this.state.castes
            .filter(caste => caste.onSpec === true)
            .map((caste, index) => (
              <Tier onDelete={this.removeCaste} name={caste.tier} key={index} hex={caste.hex}>
                <Collection tier={caste.tier} colors={this.state.colors} />
              </Tier>
            ))
        }
        <h2>Off-Spectrum</h2>
        {
          this.state.castes
            .filter(caste => caste.onSpec === false)
            .map((caste, index) => (
              <Tier onDelete={this.removeCaste} name={caste.tier} key={index} hex={caste.hex}>
                <Collection tier={caste.tier} colors={this.state.colors} />
              </Tier>
            ))
        }
        <h2>Can't Determine Directly</h2>
        <Tier name="indeterminate" hex="FFFFFF">

          <Collection tier="indeterminate" colors={this.state.colors} />
        </Tier>
      </Container>
    );
  }
}


export default App;
