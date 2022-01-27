import React, { Component } from 'react';
import Search from './Search.jsx';
import Login from './Login.jsx';


class Container extends Component {
  constructor(){
    super();
    this.state = {
      songTitle: '',
      authURL: '',
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
    console.log(this.state.authURL);
    this.setState({songTitle: e});
  }

  handleLoginClick() {
    console.log('heading into spotify login')
    console.log(window.location.search);
    const url = window.location.search;
    this.setState({ authURL: url }, () => {
      console.log(this.state.authURL)
      if(this.state.authURL === '') console.log('Click the Spotify O-Auth link!');
      else{
        fetch('/api/spotify/login', {
          method: 'POST',
          body: JSON.stringify({ authURL: this.state.authURL }),
          headers: { 'Content-Type': 'application/json' },
        })
          .then(res => res.json())
          .then((data) => {
            console.log(data)
          })
      };
    })
  };

  handleAuthClick() {
    const tempAuthURL = 'window.location.href'
    console.log(tempAuthURL)
    this.setState({authURL: tempAuthURL});
  }

  render() {
    return(
      <div>
        <Login 
          handleLoginClick = {this.handleLoginClick}
          handleAuthClick = {this.handleAuthClick}
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