import React from 'react';
import './App.css';
import Tier from './components/tier';
import Container from './components/container';
import Colorbox from './components/colorbox';
import Collection from './components/collection';
import offSpec from './data/off-spectrum';
import castes from './data/hemospectrum-colors';
//import allColors from './data/all-colors';
import canonTrolls from './data/canon-trolls';
import { hexToHSL, hexToRGB } from './utils/hex-conversion';



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tierColors: [],
      offSpec: [],
      colors: []
    };
  }

  componentDidMount() {
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



    this.setState({
      tierColors: casteColors,
      offSpectrumColors: offColors
    });

    console.log(this.state);
    this.distributeColors();

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
    let currentCastes = this.state.tierColors;
    console.log("ucrrent tiers", currentCastes);
    let colorHex = hexToRGB(color.hex);
    console.log(colorHex);
    let results = currentCastes.map(caste => {
      let casteHex = hexToRGB(caste.hex);
      console.log(caste.name);
      return {
        tier: caste.name,
        totalDistance: Math.abs(casteHex.r-colorHex.r)+Math.abs(casteHex.g-colorHex.g)+Math.abs(casteHex.b-colorHex.b)
      };
    });

    console.log("result:",results);
    results = results.sort((a,b) => b.totalDistance > a.totalDistance );
    //to-do: put in offspec stuff
    return results[0];

  }

  distributeColors() {
    //grab the current colors from state
    let colorsToDistro = canonTrolls.map(troll => this.createColorObject(troll));
    
    colorsToDistro.forEach(swatch=>{
      swatch.tier = this.getRGBFit(swatch);
    });
    console.log(colorsToDistro);
    //this.setState({colors: currentSwatches});
  }


  render() {
    return (
      <Container>
        {
          this.state.tierColors.map((caste, index) => (
            <Tier name={caste.tier} key={index}>
              <Colorbox size="large" hex={caste.hex}>
              </Colorbox>
              <Collection tier={caste.tier} colors={this.state.colors} />
            </Tier>
          ))
        }

        {
          this.state.offSpec.map((caste, index) => (
            <Tier name={caste[1]} key={index}>
              <Colorbox size="large" hex={caste[0]}>
              </Colorbox>
              <Collection colors={this.state.colors} />
            </Tier>
          ))
        }
      </Container>
    );
  }
}


export default App;
