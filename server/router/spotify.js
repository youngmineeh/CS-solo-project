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

router.get('/login',
  spotifyController.login,
  (req, res) => {
    return res.status(200).json(res.locals)
  }
  )

module.exports = router;