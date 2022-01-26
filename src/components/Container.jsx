import React, { Component } from 'react';
import Search from './Search.jsx';

class Container extends Component {
  constructor(){
    super();
    this.state = {
      songTitle: '',
    };
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.recordSearch = this.recordSearch.bind(this);
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

  render() {
    return(
      <div>
        <Search 
          songTitle = {this.state.songTitle}
          handleSearchClick = {this.handleSearchClick}
          recordSearch = {this.recordSearch}
        />
        <h1>Hello World</h1>
      </div>
    )
  }
}

export default Container;