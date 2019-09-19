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
    this.setState({
      tierColors: casteColors,
      colors: casteColors
    });

  }

  createColorObject(color) {
    return {
      name: color[1],
      hex: color[0],
      tier: ''
    };

  }

  distributeColors() {
    //grab the current colors

  }

  sortColors() {

  }

  render() {
    return (
      <Container>
        {
          this.state.tierColors.map((caste, index) => (
            <Tier name={caste.tier} key={index}>
              <Colorbox size="large" hex={caste.hex}>
              </Colorbox>
              <Collection tier={caste.tier} colors={[["000000", "gold"]]} />
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
