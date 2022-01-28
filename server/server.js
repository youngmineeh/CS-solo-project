const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = 3000;
const spotifyRouter = require('./router/spotify');
const { urlencoded } = require('express');

app.use(express.json());
app.use(cors())
app.use(urlencoded());

if (process.env.NODE_ENV === 'production'){
  app.use('/dist', express.static(path.join(__dirname, '../dist')));
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../src/index.html'));
  });
};

// define routes
app.use('/api/spotify', spotifyRouter);

// local error handler
app.use((req, res) => {
  return res.sendStatus(404);
})

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }
  }
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log)
  return res.status(errorObj.status).json(errorObj.message)
});

// server port
app.listen(PORT, (err) => {
  if (err) console.log('Error in server setup');
  console.log(`Server listeneing on port: ${PORT}`);
})

module.exports = app;