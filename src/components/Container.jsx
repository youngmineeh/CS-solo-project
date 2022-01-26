import React, { Component } from 'react';
import Search from './Search.jsx';
import Login from './Login.jsx';

class Container extends Component {
  constructor(){
    super();
    this.state = {
      songTitle: '',
      spotify:{
      }
    };
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.recordSearch = this.recordSearch.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleSearchClick() {
    console.log(this.state.songTitle)
    fetch('/api/spotify', {
      method: 'POST',
      body: JSON.stringify({ songTitle: this.state.songTitle }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
      })
  }

  recordSearch(e) {
    console.log(e);
    this.setState({songTitle: e});
  }

  handleLoginClick() {
    console.log('heading into spotify login')
    fetch('/api/spotify/login', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
      })
  }

  render() {
    return(
      <div>
        <Login 
          handleLoginClick = {this.handleLoginClick}
        />
        <Search 
          songTitle = {this.state.songTitle}
          handleSearchClick = {this.handleSearchClick}
          recordSearch = {this.recordSearch}
        />
      </div>
    )
  }
}

export default Container;