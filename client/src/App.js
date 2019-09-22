/* Import React */
import React from 'react';
import './App.css';

/* Import components */
import Tier from './components/Tier';
import Container from './components/Container';
import Title from './components/Title';
import Form from './components/Form';

/* Import functions */
/* import { RGBtoYUV, hexToRGB, hexToYUV } from './utils/hex-conversion'; */

/* Import local data sources */
//const offSpecCastes = require('./data/json/off-spectrum.json');
const onSpecCastes = require('./data/json/hemospectrum.json');
const allColors = require('./data/json/all-colors.json');
const canonTrolls = require('./data/json/canon-trolls.json');
const veTrolls = require('./data/json/vast-error.json');

class App extends React.Component {

  constructor(props) {
    super(props);
    //bindings!
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLockToggle = this.handleLockToggle.bind(this);

    //first, go through all approved colors and make sure they're marked as on spec...
    onSpecCastes.forEach(caste => caste.onSpec = true);

    //then set the initial state
    this.state = {
      castes: onSpecCastes,
      colors: [], //and no colors to distro just yet,
      yWeight: 1,
      uWeight: 0.25,
      vWeight: 0.25
    };
  }

  componentDidMount() {
    //Make sure the canon trolls define their castes to start out...
    canonTrolls.forEach(troll => troll.definesCaste = true);
    //...then distribute everything else accordingly :)
    const colorsToDistro = [].concat(canonTrolls, veTrolls, allColors);
    const assignedColors = this.distributeColors(colorsToDistro, this.state.castes);
    this.setState({ colors: assignedColors });
  }

  /*   Form Handling */
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

  /* Color Lock Handling */
  handleLockToggle(event, clickedColor) {
    event.preventDefault();
    let { _id } = clickedColor;
    //find the relevant one in the color array and update...
    let tempColors = this.state.colors;

    //Note: we're using a vanilla for loop so we can break as soon as we find the relevant one
    for (let i = 0; i < tempColors.length; i++) {
      if (tempColors[i]._id === _id) {
        tempColors[i].definesCaste = !tempColors[i].definesCaste;
        break;
      }
    }
    //...then reset state
    this.setState({ colors: tempColors });
  }

  /* Helper functions to create ids */
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

  /* Color Estimations */
  getRGBDistance(color, target) { //assumes both are objects with r, g, b keys
    let rMean = (target.r + color.r) / 2;
    let r = target.r - color.r;
    let g = target.g - color.g;
    let b = target.b - color.b;
    return Math.sqrt((((512 + rMean) * r * r) >> 8) + 4 * g * g + (((767 - rMean) * b * b) >> 8));
  }

  getYUVDistance(color, target) {
    let yDiff = (target.y - color.y) * this.state.yWeight;
    let uDiff = (target.u - color.u) * this.state.uWeight;
    let vDiff = (target.v - color.v) * this.state.vWeight;
    let totalYUVFit = Math.sqrt(Math.pow(yDiff, 2) + Math.pow(uDiff, 2) + Math.pow(vDiff, 2));
    return totalYUVFit;
  }

  distributeColors(colorsToDistro, castes) {
    //takes an array of color objects, and an array of caste objects
    //go through the colors and get a fit / caste assignment for each
    colorsToDistro.forEach(color => {
      //first, wipe out old info
      color.caste = 'indeterminate'; //default
      //We also prepare to look for which color is the current best fit
      let bestFit = null;

      //NOTE: use an old-school for loop because we might break it early
      for (let i = 0; i < castes.length; i++) {
        //calculate the YUV diffs
        let totalYUVFit = this.getYUVDistance(castes[i].YUV, color.YUV);

        //calculate the RGB diffs
        let totalRGBFit = this.getRGBDistance(castes[i].RGB, color.RGB);

        let totalFit = totalRGBFit + totalYUVFit;

        if (bestFit === null || totalFit < bestFit) {
          if (totalFit < 170 && totalRGBFit < 120) {
            //check if it's within our rgb constraints
            bestFit = totalFit;
            color.caste = castes[i].name;
          }
        } else if (bestFit === totalFit) { //if we find any dupes, make this indeterminate!
          color.caste = 'indeterminate';
          break;
        }
      }

    });
    return colorsToDistro;
  }

  render() {

    return (
      <Container>
        <Title>Hemospectrum</Title>
        <Form yWeight={this.state.yWeight} uWeight={this.state.uWeight} vWeight={this.state.vWeight} handleChange={this.handleChange} handleSubmit={this.handleSubmit} /> 
        {
          this.state.castes
            .filter(caste => caste.onSpec === true)
            .map(caste => (
              <Tier handleLockToggle={this.handleLockToggle} caste={caste} key={caste._id} colors={this.state.colors.filter(color => color.caste === caste.name)}>
              </Tier>
            ))
        }
        <Title>Off Spectrum</Title>
        <Tier handleLockToggle={this.handleLockToggle} caste={{ name: '', caste: 'indeterminate' }} colors={this.state.colors.filter(color => color.caste === 'indeterminate')}>
        </Tier>
      </Container>
    );
  }
}


export default App;
