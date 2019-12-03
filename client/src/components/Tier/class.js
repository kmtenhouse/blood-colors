import React from 'react';
import './tier.css';

/* Import Axios for requests */
import axios from 'axios';

import Colorbox from '../Colorbox';

/* Import local data sources */
const baseURL = "http://localhost:3001";

class Tier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: [],
            name: props.tier.name || '',
            displayColor: props.tier.displayColor || {},
            _id: props.tier._id || null
        };
    }

    async componentDidMount() {
        if (this.state._id) {
            const allTiers = await axios.get(`${baseURL}/api/tiers/${this.state._id}`);
            const {colors, displayColor, name, _id} = allTiers.data;
            this.setState({ _id, colors, displayColor, name });
        }
    }

    render() {
        // Deconstruct the props
        const { displayColor, name } = this.state;

        // Next, set values for the tier's overall styling
        const hex = ((displayColor && displayColor.hasOwnProperty('hex')) ? displayColor.hex : "#000000");
        const contrastColor = ((displayColor && displayColor.hasOwnProperty('contrastColor')) ? displayColor.contrastColor : "#FFFFFF");

        const tierColors = {
            backgroundColor: hex,
            color: contrastColor
        };

        //Make the tier names more legible (if necessary)
        let nameToShow = "";
        if (name) {
            nameToShow = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        }

        return (
            <div className="tier">
                <div className="tier__header" style={tierColors}>
                    <h2 className="tier__title">{nameToShow}</h2>
                </div>
                <div className="tier__collection">
                    {this.state.colors.length > 0 ? (this.state.colors.map(currentColor=> (<Colorbox color={currentColor} key={currentColor._id} />))) : <p>Loading...</p>}
                </div>
            </div>
        );
    }
}

export default Tier;
