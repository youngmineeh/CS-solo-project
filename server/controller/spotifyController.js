const path = require('path');
const { URLSearchParams } = require('url');
const spotifyController = {};
let client_id = 'b87ffc0c0e854e2696dc83353d7237fd';
let redirect_uri = "http://localhost:8080";

spotifyController.get = (req, res, next) => {
  res.locals = req.body;
  return next();
}



spotifyController.login = (req, res, next) => {
  console.log('arrived at the login controller')
  console.log(redirect_uri);
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: client_id,
    redirect_uri: redirect_uri,
  });
  console.log('https://accounts.spotify.com/authorize?' + params.toString())
  res.locals = res.redirect('https://accounts.spotify.com/authorize?' + params.toString())
  // console.log(params.toString());
  // console.log('hello')
  // try {
    // res.redirect('https://accounts.spotify.com/authorize?' +
    //   querystring.stringify({
    //     response_type: 'code',
    //     client_id: client_id,
    //     redirect_uri: redirect_uri,
    //   }));
  return next();
//   }
//   catch (err) {
//     return next({
//       log: `spotifyController.login: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
//       message: { err: 'Error occurred in spotifyController.login Check server logs for more details.' },
//     });
//   }
  
};

module.exports = spotifyController