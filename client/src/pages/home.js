/* Import React */
import React from 'react';

/* Import components */
import Container from '.././components/Container';
import Spectrum from '.././components/Spectrum';
import Tier from '.././components/Tier/class.js';

/* Import Axios for requests */
import axios from 'axios';

/* Import local data sources */
const baseURL = "http://localhost:3001";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tiers: [] };
    }

    async componentDidMount() {
        const allTiers = await axios.get(`${baseURL}/api/tiers/`);
        this.setState({ tiers: allTiers.data });
    }

    render() {
        //Render
        return (
            <Container>
                <Spectrum title="Hemospectrum">
                    {this.state.tiers.map(tier => <Tier tier={tier} key={tier._id} />)}
                </Spectrum>
            </Container>
        );
    }
}