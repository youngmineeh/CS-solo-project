const path = require('path');
const axios = require('axios')
const { URLSearchParams } = require('url');
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyController = {};


let client_id = 'b87ffc0c0e854e2696dc83353d7237fd';
let client_secret = '936f262971ce480fbd63c56c25da0987';
let encodedIdSecret = 'Yjg3ZmZjMGMwZTg1NGUyNjk2ZGM4MzM1M2Q3MjM3ZmQ6OTM2ZjI2Mjk3MWNlNDgwZmJkNjNjNTZjMjVkYTA5ODc=';
let token = '';
let redirect_uri = "http://localhost:8080";

const spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri,
})

spotifyController.get = (req, res, next) => {
  res.locals = req.body;
  return next();
}

spotifyController.login = async (req, res, next) => {
  const params = new URLSearchParams(req.body.authURL).toString()
  const authCode = new URLSearchParams(params).get('code')
  try{
    const data = await spotifyApi.authorizationCodeGrant(authCode)
    console.log('The token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
    console.log('The refresh token is ' + data.body['refresh_token']);

    // Set the access token on the API object to use it in later calls
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);

    res.locals = data.body
  // try{
  //   const body = {
  //     grant_type: 'authorization_code',
  //     code: authCode,
  //     redirect_uri: redirect_uri
  //   }
  //   const authOptions = {
  //     method: 'post',
  //     url: 'https://accounts.spotify.com/api/token',
  //     headers: {
  //       'Authorization': 'Basic ' + encodedIdSecret,
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //     params: body,
  //   };
  //   const data = await axios(authOptions)
  //   res.locals= data.data
  //   token = res.locals.access_token
  //   console.log(res.locals.access_token)
  //   spotifyApi.setAccessToken(res.locals.access_token);
    return next();
  }
  catch (err) {
    return next({
      log: `spotifyController.login: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      message: { err: 'Error occurred in spotifyController.login Check server logs for more details.' },
    });
  };
};

spotifyController.getUser = (req, res, next) => {
  spotifyApi.getUser('youngmineeh')
  .then(function(data) {
    console.log('Some information about this user', data.body);
    res.locals.user = data.body
    return next();
  }, function(err) {
    return next({
      log: `spotifyController.getUser: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      message: { err: 'Error occurred in spotifyController.getUser Check server logs for more details.' },
    });
  });
};

spotifyController.getUserPlaylists = (req, res, next) => {
  spotifyApi.getUserPlaylists(res.locals.user.id)
    .then(function(data) {
      console.log('Retrieved playlists', data.body);
      res.locals.userPlaylists = data.body
      return next();
    },function(err) {
      return next({
        log: `spotifyController.getUserPlaylists: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
        message: { err: 'Error occurred in spotifyController.getUserPlaylists Check server logs for more details.' },
      });
    });
  };

spotifyController.searchTracks = (req, res, next) => {
  spotifyApi.searchTracks(req.body.search, { limit: 10 })
  .then(function(data) {
    // console.log('Search by :' + req.body.search + data.body);
    res.locals.search = data.body
    return next();
  }, function(err) {
    return next({
      log: `spotifyController.searchTracks: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      message: { err: 'Error occurred in spotifyController.searchTracks Check server logs for more details.' },
    });
  });
};

module.exports = spotifyController