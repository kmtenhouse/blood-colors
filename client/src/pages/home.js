/* Import React */
import React from 'react';

/* Import Axios for requests */
import axios from 'axios';


/* Import components */
import Container from '.././components/Container';
import Spectrum from '.././components/Spectrum';
import Tier from '.././components/Tier';
import Colorbox from '.././components/Colorbox';

/* Import local data sources */
const baseURL = "http://localhost:3001";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tiers: [] };
    }

    async componentDidMount() {
        const allTiers = await axios.get(`${baseURL}/api/tiers`);
        const tiers = allTiers.data;
        this.setState({tiers});
    }

    render() {
        //Grab all current spectrum data
      
        //Render
        return (
            <Container>
                <Spectrum title="Hemospectrum">
                    {this.state.tiers.map(currentTier => (
                        <Tier
                            name={currentTier.name}
                            displayColor={currentTier.displayColor}
                            colors={currentTier.colors}
                            key={currentTier._id}>
                            {currentTier.colors.map(currentColor => (
                                <Colorbox color={currentColor} key={currentColor._id} />
                            ))}
                        </Tier>))}
                </Spectrum>
            </Container>
        );
    }
}