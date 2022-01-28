import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import App from './App.jsx';
import MasonJarLogo from './svg/MasonJar_SayItWithSimplicity.svg'


// uncomment so that webpack can bundle styles
// import styles from './scss/application.scss';

render(
  <div>
  <div className="header"> 
    <img src={MasonJarLogo} alt="MasonJar Logo" />
    <h1>MasonJar</h1>
  </div>
  <div>
  <Router>
    <App />
  </Router>
  </div>
  </div>,
  document.getElementById('root')
);
