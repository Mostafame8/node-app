const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const faker = require('faker');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/user', (req, res) => {
  const user = req.body;
  console.log('User Recived! ', user);
  res.status(200).json('Success');
});

app.listen(port, () => {
  console.log('App listening at port ' + port);
});
