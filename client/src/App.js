/* Import React */
import React from 'react';
import './App.css';

/* Import components */
import Tier from './components/Tier';
import Container from './components/Container';
import Collection from './components/Collection';
import Title from './components/Title';
import Form from './components/Form';

/* Import functions */
/* import { RGBtoYUV, hexToRGB, hexToYUV } from './utils/hex-conversion'; */

/* Import local data sources */
const offSpecCastes = require('./data/json/off-spectrum.json');
const onSpecCastes = require('./data/json/hemospectrum.json');
const allColors = require('./data/json/all-colors.json');
const canonTrolls = require('./data/json/canon-trolls.json');
const veTrolls = require('./data/json/vast-error.json');

class App extends React.Component {

  constructor(props) {
    super(props);
    //bindings!
    this.removeCaste = this.removeCaste.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  
    //first, go through all approved colors and make sure they're on spec...
    //onSpec =true
    onSpecCastes.forEach(caste=>caste.onSpec=true);

    //...then do the opposite with offspec
    //onSpec = false
    offSpecCastes.forEach(caste=>caste.onSpec=false);

    //join those together and set in the state
    const allCastes = [].concat(onSpecCastes, offSpecCastes);

    this.state = {
      castes: allCastes,
      colors: [], //and no colors to distro just yet,
      yWeight: 1,
      uWeight: 0.25,
      vWeight: 0.25
    };
  }

  componentDidMount() {
    const colorsToDistro = [].concat(canonTrolls, veTrolls, allColors);
    const assignedColors = this.distributeColors(colorsToDistro, this.state.castes);
    this.setState({ colors: assignedColors });
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

  getRGBDistance(color, target) { //assumes both are objects with r, g, b keys
    let rMean = ( target.r + color.r ) / 2;
    let r = target.r - color.r;
    let g = target.g - color.g;
    let b = target.b - color.b;
    return Math.sqrt((((512+rMean)*r*r)>>8) + 4*g*g + (((767-rMean)*b*b)>>8));
  }

  getYUVDistance(color, target) {
    let yDiff = (target.y - color.y)*this.state.yWeight;
    let uDiff = (target.u - color.u)*this.state.uWeight;
    let vDiff = (target.v - color.v)*this.state.vWeight;
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
    console.log(colorsToDistro);
    return colorsToDistro;
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
        <Form yWeight={this.state.yWeight} uWeight={this.state.uWeight} vWeight={this.state.vWeight} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
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
