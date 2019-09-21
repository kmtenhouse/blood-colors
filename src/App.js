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
    //(TO-DO): make this an actual database so we have real ids askdlj
    let id = 0;
    //castes are (currently) defined as a color object with a caste name and a boolean, on-spec or off-spec
    //first, go through all approved colors and make sure they're on spec...
    let onSpecCaste = castes.map(caste => {
      let currCaste = this.createColorObject(caste);
      currCaste.tier = caste[1];
      currCaste.onSpec = true;
      currCaste._id = id;
      id++;
      return currCaste;
    });

    //...then do the opposite with offspec
    let offSpecCaste = offSpec.map(caste => {
      let currCaste = this.createColorObject(caste);
      currCaste.tier = caste[1];
      currCaste.onSpec = false;
      currCaste._id = id;
      id++;
      return currCaste;
    });

    //lastly, add an indeterminate catch-all
    const indeterminateCaste = {
      hex: "000000",
      name: "indeterminate",
      tier: "indeterminate", 
      onSpec: false,
      _id: id
    };

    //join those together and set in the state
    const allCastes = [].concat(onSpecCaste, offSpecCaste, [indeterminateCaste]);

    this.state = {
      castes: allCastes,
      colors: [] //and no colors to distro just yet
    };
  }

  componentDidMount() {
    //(TO-DO):
    //long term these will come from the server
    const colorsToDistro = [].concat(canonTrolls, allColors).map(troll => this.createColorObject(troll));;
    this.distributeColors(colorsToDistro, 75);
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
  getRGBFit(color, constraint=100) {
    let currentCastes = this.state.castes.filter(caste=>caste.name!=="indeterminate");
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
    
    //otherwise, let's impose some arbitrary constraints (based on what we put in)
    if(totalMatches > 1 || bestMatch.fit > constraint) {
      return {
        caste: 'indeterminate', 
        fit: 0
      };
    } else {
      return bestMatch;
    }

  }

  distributeColors(colorsToDistro, constraint=100) {
    colorsToDistro.forEach(swatch => {
      let result = this.getRGBFit(swatch, constraint);
      swatch.fit = result.fit
      swatch.tier = result.caste;
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
        <Title>Hemospectrum</Title>
        {
          this.state.castes
            .filter(caste => caste.onSpec === true)
            .map((caste, index) => (
              <Tier caste={caste} onDelete={this.removeCaste} name={caste.tier} key={index} hex={caste.hex}>
                <Collection tier={caste.tier} colors={this.state.colors} />
              </Tier>
            ))
        }
        <Title>Off Spectrum</Title>
        {
          this.state.castes
            .filter(caste => caste.onSpec === false)
            .map((caste, index) => (
              <Tier caste={caste} onDelete={this.removeCaste} name={caste.tier} key={index} hex={caste.hex} canDelete={(caste.name==='indeterminate' ? false : true)}>
                <Collection tier={caste.tier} colors={this.state.colors} />
              </Tier>
            ))
        }
      </Container>
    );
  }
}


export default App;
