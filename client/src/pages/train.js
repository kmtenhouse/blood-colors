/* Import React */
import React from 'react';

/* Import Axios for requests */
import axios from 'axios';


/* Import components */
import Container from '.././components/Container';
import Spectrum from '.././components/Spectrum';
import Tier from '.././components/Tier';
import Palette from '.././components/Palette';
import Colorbox from '.././components/Colorbox';

/* Import local data sources */
const baseURL = "http://localhost:3001"

export default class Train extends React.Component {
    //Grab all current spectrum data from all-colors (filtered by tier assignment)
    componentDidMount() {
        
    }
    
    //Render
    render() {
        return (
            <Container>
              <Spectrum title="Hemospectrum">
                
              </Spectrum>

            </Container>
          );
    }
}