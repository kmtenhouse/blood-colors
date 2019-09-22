/* Import React */
import React from 'react';
import './App.css';

/* Import components */
import Tier from './components/Tier';
import Container from './components/Container';
import Title from './components/Title';
import Form from './components/Form';
import { RGBtoYUV } from './utils/hex-conversion';

/* Import local data sources */
const onSpecCastes = require('./data/json/hemospectrum.json.js');
const allColors = require('./data/json/all-colors.json.js');
const canonTrolls = require('./data/json/canon-trolls.json.js');
const veTrolls = require('./data/json/vast-error.json.js');

class App extends React.Component {

  constructor(props) {
    super(props);
    //bindings!
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLockToggle = this.handleLockToggle.bind(this);
    this.handleColorsReset = this.handleColorsReset.bind(this);
    this.handleDropDown = this.handleDropDown.bind(this);
    //next, go through all approved colors and make sure they're marked as on spec...
    onSpecCastes.forEach(caste => caste.onSpec = true);

    //and one final one that is not on spec
    let offSpec = {
      name: "indeterminate",
      hex: "FFFFFF",
      RGB: { r: 255, g: 255, b: 255 },
      YUV: RGBtoYUV({ r: 255, g: 255, b: 255 }),
      caste: "indeterminate", _id: this.createUUID()
    };

    onSpecCastes.push(offSpec);

    //then set the initial state
    this.state = {
      definitions: onSpecCastes, //default caste definitions are what is on spec
      castes: onSpecCastes,
      colors: [], //no colors to distro just yet
      yWeight: 1,
      uWeight: 0.25,
      vWeight: 0.25,
      fitConstraint: 100
    };
  }

  componentDidMount() {
    //Make sure the canon trolls define their castes to start out...
    canonTrolls.forEach(troll => troll.definesCaste = true);

    //...then distribute everything else accordingly :)
    this.setState({
      definitions: [].concat(this.state.definitions, canonTrolls)
    });

    //next, distribute our colors based on these constraints
    let colorsToDistro = [].concat(canonTrolls, veTrolls, allColors);
    colorsToDistro = this.distributeColors(colorsToDistro);

    this.setState({
      colors: colorsToDistro,
    });
  }

  /*   Form Handling */
  handleChange(e) {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleDropDown(event, colorToEdit) {
    event.preventDefault();
    let chosenCaste = event.target.value;
    //forcibly update this item to be part of another caste (and lock it there to be sure)
    let tempColors = this.state.colors;
    //Note: we're using a vanilla for loop so we can break as soon as we find the relevant one
    for (let i = 0; i < tempColors.length; i++) {
      if (tempColors[i]._id === colorToEdit._id) {
        console.log(chosenCaste.name);
        tempColors[i].caste = chosenCaste;
        tempColors[i].definesCaste = true;
        break;
      }
    }
    this.setState({ colors: this.distributeColors(tempColors) });
  }

  handleSubmit(event) {
    event.preventDefault();
    //recalculate colors with new weighting
    this.setState({ colors: this.distributeColors(this.state.colors) });
  }

  handleColorsReset(event) {
    event.preventDefault();
    window.location.reload();
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
        //invert its lock state
        tempColors[i].definesCaste = !tempColors[i].definesCaste;
        //we also want to recalculate the caste in case we just unlocked it - maybe it should shuffle elsewhere
        if (tempColors[i].definesCaste === false) {
          tempColors[i].caste = this.determineCasteForOneColor(tempColors[i]);
        } else {
          //otherwise add it to our definitions!
          let newDef = this.state.definitions;
          newDef.push(tempColors[i]);
          this.setState({ definitions: newDef });
        }
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

  determineCasteForOneColor(color) {
    //takes in a single color and calculates its current caste
    //returns the caste it belongs to (default: 'indeterminate')

    //first, we make an object to hold our counts
    const casteFit = {};
    this.state.castes.forEach(caste => {
      casteFit[caste.name] = {
        sum: 0,
        count: 0
      };
    });

    //now we calculate the average fit based on key colors
    this.state.definitions.forEach(def => {
      if (casteFit[def.name]) {
        casteFit[def.name].sum += this.getRGBDistance(color.RGB, def.RGB);
        casteFit[def.name].count++;
      }
    });

    //lastly, figure out the averages for each one and return the result
    let bestCaste = "indeterminate";
    let bestFit = null;
    for (let caste in casteFit) {
      let avgFit = casteFit[caste].sum / casteFit[caste].count;

      if (bestFit === null || (avgFit < bestFit)) {
        if (avgFit < this.state.fitConstraint) {
          bestFit = avgFit;
          color.fit = bestFit;
          bestCaste = caste;
        }
      }
    }
    return bestCaste;
  }

  distributeColors(arr) {
    //takes an array of color objects, and an array of caste objects
    //go through the colors and get a fit / caste assignment for each
    const colorsToDistro = arr.slice(0);
    colorsToDistro.forEach(color => {
      //Note: we don't determine the weight for something that is 'locked'
      if (!color.definesCaste) {
        color.caste = this.determineCasteForOneColor(color);
      }
    });
    return colorsToDistro;
  }

  render() {

    return (
      <Container>
        <Title>Hemospectrum</Title>
        <Form yWeight={this.state.yWeight} uWeight={this.state.uWeight} vWeight={this.state.vWeight} fitConstraint={this.state.fitConstraint} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleColorsReset={this.handleColorsReset} />
        {
          this.state.castes
            /* .filter(caste => caste.onSpec === true) */
            .map(caste => (
              <React.Fragment key={caste._id}>
                {(!caste.onSpec ? <Title>Off-Spectrum</Title> : '')}
                <Tier
                  handleLockToggle={this.handleLockToggle}
                  handleDropDown={this.handleDropDown}
                  caste={caste} 
                  castes={this.state.castes}
                  colors={this.state.colors.filter(color => color.caste === caste.name)}>
                </Tier> 
              </React.Fragment>
            ))
        }

      </Container>
    );
  }
}


export default App;
