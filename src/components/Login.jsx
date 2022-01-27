import React, { Component } from 'react';

const Login = (props) => {
  return (
    <div>
      <button
        className='spotifyLogin'
        onClick={props.handleLoginClick}> Spotify Login
      </button>
      <a href="https://accounts.spotify.com/authorize?response_type=code&client_id=b87ffc0c0e854e2696dc83353d7237fd&redirect_uri=http%3A%2F%2Flocalhost%3A8080">O-Auth</a>
    </div>
  )
}

export default Login;