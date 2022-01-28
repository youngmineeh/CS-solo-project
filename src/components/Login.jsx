import React, { Component } from 'react';

const Login = (props) => {
  return (
    <div>
      <button
        className='spotifyLogin'
        onClick={props.handleLoginClick}> Spotify Login
      </button>
      <a 
        href="https://accounts.spotify.com/authorize?client_id=b87ffc0c0e854e2696dc83353d7237fd&response_type=code&redirect_uri=http://localhost:8080"
        onClick={props.handleAuthClick}>
          <button>O-Auth</button>
      </a>
    </div>
  )
}

export default Login;