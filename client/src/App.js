/* Import React */
import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

/* Import CSS (for App) */
import './App.css';

/* Import pages */
import ColorSort from './pages/colorSort';
import Home from "./pages/home";

export default function App() {
  return (
    <Router>
      <div>
        <nav className="nav">
          <ul className="nav__bar">
            <li className="nav__item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav__item">
              <Link to="/train">Train</Link>
            </li>
            <li className="nav__item">
              <Link to="/sort">Sort Data</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/train">
            <Train />
          </Route>
          <Route exact path="/sort">
            <ColorSort />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Train() {
  return <h2>Train</h2>;
}

