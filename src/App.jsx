import React, { Component } from 'react'
import Container from './components/Container.jsx'
import './stylesheets/styles.scss';

class App extends Component {
  constructor(){
    super();
  }

  render() {
    return(
      <div className="app">
        <Container />
      </div>
    )
  }
}

export default App;