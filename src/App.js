import React from 'react';
import './App.css';
import Tier from './components/Tier';
import Container from './components/Container';
import Collection from './components/Collection';
import Title from './components/Title';
import offSpec from './data/off-spectrum';
import castes from './data/hemospectrum-colors';
import allColors from './data/all-colors';
import canonTrolls from './data/canon-trolls';
import { hexToRGB } from './utils/hex-conversion';



class App extends React.Component {

  constructor(props) {
    super(props);
    this.removeCaste = this.removeCaste.bind(this);
    //(TO-DO): make this an actual database so we have real ids askdlj

    //castes are (currently) defined as a color object with a caste name and a boolean, on-spec or off-spec
    //first, go through all approved colors and make sure they're on spec...
    let onSpecCaste = castes.map(caste => {
      let currCaste = this.createColorObject(caste);
      currCaste.caste = caste[1];
      currCaste.onSpec = true;
      currCaste._id = this.createUUID();
      return currCaste;
    });

    //...then do the opposite with offspec
    let offSpecCaste = offSpec.map(caste => {
      let currCaste = this.createColorObject(caste);
      currCaste.caste = caste[1];
      currCaste.onSpec = false;
      currCaste._id = this.createUUID();
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
    const colorsToDistro = [].concat(canonTrolls, allColors).map(troll => this.createColorObject(troll));;
    const assignedColors = this.distributeColors(colorsToDistro, this.state.castes);
    this.setState({ colors: assignedColors });
  }

  //borrowed from https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
  createUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  createColorObject(color) {
    let newObj = {
      hex: color[0],
      name: color[1],
      caste: ''
    };
    return newObj;
  }

  //looks at our current tiers to determine where to distribute
  getFit(color, castes) {
    let currentCastes = castes.filter(caste => caste.name !== "indeterminate");
    let colorHex = hexToRGB(color.hex);

    let results = currentCastes.map(caste => {
      let casteHex = hexToRGB(caste.hex);

      return {
        caste: caste.name,
        fit: Math.abs(casteHex.r - colorHex.r) + Math.abs(casteHex.g - colorHex.g) + Math.abs(casteHex.b - colorHex.b)
      };
    });

    results = results.sort((a, b) => (a.fit > b.fit ? 1 : -1));

    //check for any dupes -- if we have two that are identical, go ahead and chuck into 'indeterminate'
    let bestMatch = results[0];
    let totalMatches = results.filter(result => result.fit === bestMatch.fit).length;

    const constraint = 100;
    //otherwise, let's impose some arbitrary constraints (based on what we put in)
    if (totalMatches > 1 || bestMatch.fit > constraint) {
      return {
        caste: 'indeterminate',
        fit: 0
      };
    } else {
      return bestMatch;
    }

  }

  distributeColors(colorsToDistro, castes) {
    //takes an array of color objects, and an array of caste objects
    //go through the colors and get a fit / caste assignment for each


    colorsToDistro.forEach(swatch => {
      let result = this.getFit(swatch, castes);
      swatch.fit = result.fit
      swatch.caste = result.caste;
    });
    return colorsToDistro;
  }

 /*  handleChange(e) {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  } */

  removeCaste(casteToDelete) {
    //first, remove the caste from the array

    let tempCastes = this.state.castes;

    //find and splice the offending one
    const findCasteToDelete = (caste) => (caste._id === casteToDelete._id);
    const indexToRemove = tempCastes.findIndex(findCasteToDelete);
    tempCastes.splice(indexToRemove, 1);

    //redistribute all colors based on the castes now availble 
    let tempColors = this.state.colors;
    tempColors = this.distributeColors(tempColors, tempCastes);

    //set the new state
    this.setState({
      castes: tempCastes,
      colors: tempColors
    });

  }

  render() {

    return (
      <Container>
        <Title>Hemospectrum</Title>
        {
          this.state.castes
            .filter(caste => caste.onSpec === true)
            .map(caste => (
              <Tier caste={caste} key={caste._id}>
                <Collection caste={caste} colors={this.state.colors.filter( color=>color.caste===caste.name)} />
              </Tier>
            ))
        }
        <Title>Off Spectrum</Title>
        {
          this.state.castes
            .filter(caste => caste.onSpec === false)
            .map(caste => (
              <Tier caste={caste} onDelete={this.removeCaste} key={caste._id}>
                <Collection caste={caste} colors={this.state.colors.filter( color=>color.caste===caste.name)} />
              </Tier>
            ))
        }
        <Title>Could Not Determine Automagically</Title>
        <Tier caste={{ name: 'indeterminate', caste: 'indeterminate'}}>
          <Collection caste={{ name: 'indeterminate', caste: 'indeterminate'}} colors={this.state.colors.filter(color=>color.caste==='indeterminate')} />
        </Tier>
      </Container>
    );
  }
}


export default App;
