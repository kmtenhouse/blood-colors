import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tier from './components/tier';
import Container from './components/container';
import Colorbox from './components/colorbox';
import castes from './data/hemospectrum-colors';

function App() {
  return (
    <Container>
      {
        castes.map(caste => (
        <Tier name={caste[1]}>
          <Colorbox size="large" hex={caste[0]}></Colorbox>
        </Tier>
        ))
      }

    </Container>
  );
}

export default App;
