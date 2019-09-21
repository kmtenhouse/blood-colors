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
import { RGBtoYUV, hexToRGB, hexToYUV } from './utils/hex-conversion';
import Form from './components/Form';

class App extends React.Component {

  constructor(props) {
    super(props);
    //bindings!
    this.removeCaste = this.removeCaste.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //(TO-DO): make this an actual database so we have real ids askdlj

    //castes are (currently) defined as a color object with a caste name and a boolean, on-spec or off-spec
    //first, go through all approved colors and make sure they're on spec...
    let onSpecCaste = castes.map(caste => {
      let currCaste = this.createColorObject(caste);
      currCaste.caste = caste[1];
      currCaste.onSpec = true;
      currCaste.yuv = hexToYUV(caste[0]);
      currCaste.rgb = hexToRGB(caste[0]);
      currCaste._id = this.createUUID();
      return currCaste;
    });

    //...then do the opposite with offspec
    let offSpecCaste = offSpec.map(caste => {
      let currCaste = this.createColorObject(caste);
      currCaste.onSpec = false;
      currCaste.caste = caste[1];
      currCaste.yuv = hexToYUV(caste[0]);
      currCaste.rgb = hexToRGB(caste[0]);
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
    const colorsToDistro = [].concat(canonTrolls , allColors).map(troll => this.createColorObject(troll));;
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

  distributeColors(colorsToDistro, castes) {

    //takes an array of color objects, and an array of caste objects
    //go through the colors and get a fit / caste assignment for each
    colorsToDistro.forEach(color => {
      //get both the hex AND the yuv of the current color
      let currColorRGB = hexToRGB(color.hex);

      let currColorYUV = RGBtoYUV(currColorRGB);

      //next, analyze the fit against every caste
      //start by wiping out any old info
      color.fit = null;
      color.caste = 'indeterminate'; //default

      //NOTE: use an old-school for loop because we might break it early
      for (let i = 0; i < castes.length; i++) {
        //calculate the YUV diffs
        let yDiff = Math.abs(currColorYUV.y - castes[i].yuv.y);
        let uDiff = Math.abs(currColorYUV.u - castes[i].yuv.u);
        let vDiff = Math.abs(currColorYUV.v - castes[i].yuv.v);
        let totalYUVFit = Math.sqrt(Math.pow(yDiff, 2) + Math.pow(uDiff, 2) + Math.pow(vDiff, 2));

        //calculate the RGB diffs
        let rDiff = Math.abs(currColorRGB.r - castes[i].rgb.r);
        let gDiff = Math.abs(currColorRGB.g - castes[i].rgb.g);
        let bDiff = Math.abs(currColorRGB.b - castes[i].rgb.b);
        let totalRGBFit = rDiff + gDiff + bDiff; //Math.sqrt(Math.pow(rDiff, 2)+Math.pow(gDiff,2)+Math.pow(bDiff,2));

        //let totalFit = totalRGBFit;

        if (color.fit === null || totalRGBFit < color.fit ) {
          //check if it's within our rgb constraints
          color.fit = totalRGBFit;
          color.y = yDiff.toFixed(2);
          color.u = uDiff.toFixed(2);
          color.v = vDiff.toFixed(2);
          color.caste = castes[i].name;
        } else if (color.fit === totalRGBFit) { //if we find any dupes, make this indeterminate!
          color.caste = 'indeterminate';
          color.fit = null;
          break;
        }
      }

    });
    console.log(colorsToDistro);
    return colorsToDistro;
  }

  handleChange(e) {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    //recalculate colors with new weighting
    let tempColors = this.distributeColors(this.state.colors, this.state.castes);
    this.setState({ colors: tempColors });

  }


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
                <Collection caste={caste} colors={this.state.colors.filter(color => color.caste === caste.name)} />
              </Tier>
            ))
        }
        <Title>Off Spectrum</Title>
        {
          this.state.castes
            .filter(caste => caste.onSpec === false)
            .map(caste => (
              <Tier caste={caste} onDelete={this.removeCaste} key={caste._id}>
                <Collection caste={caste} colors={this.state.colors.filter(color => color.caste === caste.name)} />
              </Tier>
            ))
        }
        <Title>Could Not Determine Automagically</Title>
        <Tier caste={{ name: 'indeterminate', caste: 'indeterminate' }}>
          <Collection caste={{ name: 'indeterminate', caste: 'indeterminate' }} colors={this.state.colors.filter(color => color.caste === 'indeterminate')} />
        </Tier>
      </Container>
    );
  }
}


export default App;
