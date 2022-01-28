import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import Search from './Search.jsx';
import Login from './Login.jsx';
import User from './User.jsx';


class Container extends Component {
  constructor(){
    super();
    this.state = {
      search: '',
      authURL: '',
      userInfo: {},
      userPlaylists: {},
    };
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.recordSearch = this.recordSearch.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
  }

  handleSearchClick() {
    console.log(this.state.search)
    fetch('/api/spotify', {
      method: 'POST',
      body: JSON.stringify({ search: this.state.search }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
      })
  }

  recordSearch(e) {
    console.log(e)
    this.setState({search: e});
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

  handleUserClick() {
    console.log('getting user info')
      fetch('/api/spotify/user', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then((data) => {
          this.setState({ userInfo: data.user })
          this.setState({ userPlaylists: data.userPlaylists})
          console.log(this.state.userInfo)
          console.log(this.state.userInfo.images[0].url)
          console.log(this.state.userPlaylists)
        })
  };

  handleAuthClick() {
    const tempAuthURL = 'window.location.href'
    console.log(tempAuthURL)
    this.setState({authURL: tempAuthURL});
  }

  render() {
    return(
      <div className="container">
        <Login 
              handleLoginClick = {this.handleLoginClick}
              handleAuthClick = {this.handleAuthClick}
            />
        <Link to="/user" >
          <button>User Info </button> 
        </Link>
        <Link to="/search" >
          <button>Search </button> 
        </Link>
        <Switch>
          <Route 
            path="/search"
            component={
              () => <Search 
              songTitle = {this.state.songTitle}
              handleSearchClick = {this.handleSearchClick}
              recordSearch = {this.recordSearch}
            />
            }
          />
          <Route 
            path="/user"
            component={
              () => <User 
              handleUserClick = {this.handleUserClick}
              userInfo = {this.state.userInfo}
              userPlaylists = {this.state.userPlaylists}
            />
            }
          />
        </Switch>
      </div>
    )
  }
}

export default Container;