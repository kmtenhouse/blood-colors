import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tier from './components/tier';
import Container from './components/container';

function App() {
  return (
    <Container>
      <Tier>
        <p>Test</p>
      </Tier>
    </Container>
  );
}

export default App;
