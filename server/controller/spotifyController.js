const { request } = require('express');
const path = require('path');
const axios = require('axios')
const { URLSearchParams } = require('url');
const spotifyController = {};
let client_id = 'b87ffc0c0e854e2696dc83353d7237fd';
let client_secret = '936f262971ce480fbd63c56c25da0987';
let encodedIdSecret = 'Yjg3ZmZjMGMwZTg1NGUyNjk2ZGM4MzM1M2Q3MjM3ZmQ6OTM2ZjI2Mjk3MWNlNDgwZmJkNjNjNTZjMjVkYTA5ODc=';
let redirect_uri = "http://localhost:8080";

spotifyController.get = (req, res, next) => {
  res.locals = req.body;
  return next();
}

spotifyController.login = async (req, res, next) => {
  console.log(req.body);
  const params = new URLSearchParams(req.body.authURL).toString()
  const authCode = new URLSearchParams(params).get('code')
  try{
    const body = {
      grant_type: 'authorization_code',
      code: authCode,
      redirect_uri: redirect_uri
    }
    const authOptions = {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + encodedIdSecret,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: body,
    };
    const data = await axios(authOptions)
    res.locals= data.data
    console.log(data.data)
    return next();
  }
  catch (err) {
    return next({
      log: `spotifyController.login: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      message: { err: 'Error occurred in spotifyController.login Check server logs for more details.' },
    });
  };
};

// spotifyController.loginUserAuth = (req, res, next) => {
//   console.log('arrived at the login controller')
//   console.log(redirect_uri);
//   const params = new URLSearchParams({
//     response_type: 'code',
//     client_id: client_id,
//     redirect_uri: redirect_uri,
//   });
//   console.log('https://accounts.spotify.com/authorize?' + params.toString())
//   res.locals = res.redirect('https://accounts.spotify.com/authorize?' + params.toString())
//   return next();
// };

module.exports = spotifyController