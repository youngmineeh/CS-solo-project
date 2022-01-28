const express = require('express');
const router = express.Router();

const spotifyController = require('../controller/spotifyController');

router.post('/',
  // spotifyController.get,
  (req, res) => {
    return res.status(200);
  }
);

router.get('/',
  // spotifyController.get,
  (req, res) => {
    return res.status(200);
  }
);

router.post('/login',
  spotifyController.login,
  (req, res) => {
    return res.status(200).json(res.locals)
  }
  )

router.get('/user',
spotifyController.getUser,
spotifyController.getUserPlaylists,
(req, res) => {
  return res.status(200).json(res.locals)
}
)

router.post('/search',
spotifyController.searchTracks,
(req, res) => {
  return res.status(200).json(res.locals)
}
)

module.exports = router;