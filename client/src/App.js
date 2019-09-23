/* Import React */
import React from 'react';

/* Import Axios for requests */
import axios from 'axios';


/* Import CSS (for App) */
import './App.css';

/* Import components */
import Container from './components/Container';
import Spectrum from './components/Spectrum';
import Tier from './components/Tier';
import Palette from './components/Palette';
import Colorbox from './components/Colorbox';

/* Import local data sources */
const baseURL = "http://localhost:3001"

class App extends React.Component {

  constructor(props) {
    super(props);
    //bindings!
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      tiers: [],
      colors: []
    };
  }

  componentDidMount() {
    //perform an axios call to get our tiers
    //TO-DO: refactor
    axios.get(`${baseURL}/api/tiers`)
      .then(async res => {
        const tiers = res.data;
        tiers.forEach(tier => {
          if (tier.name === "gold") {
            console.log("Adding Solluc");
            tier.colors.push({
              name: "pizza time",
              hex: "#a1a100",
              _id: "31337",
              contrastingColor: "#000000"
            });
          }
        });
        //also get all colors
        const allColors = await axios.get(`${baseURL}/api/colors`);
        const colors = allColors.data;

        this.setState({ tiers, colors });
      })
      .catch(err => console.log("Error:", err));
  }

  /*   Form Handling */
  handleChange(e) {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <Container>
        <Spectrum title="Hemospectrum">
          {this.state.tiers.map(tier => (
            <Tier key={tier._id} name={tier.name} displayColor={tier.displayColor} colors={tier.colors} >

            </Tier>)
          )}
        </Spectrum>

        <Spectrum title="Off Spectrum">
          <Palette>
            {this.state.colors.map(color => (
              <Colorbox key={color._id} color={color} />
            )
            )}
          </Palette>
        </Spectrum>
      </Container>
    );
  }
}


export default App;
