const express = require('express');
const bodyParser = require('body-parser');
const { validateUser } = require('./middleware/validationMiddleware');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/user', validateUser, (req, res) => {
  const user = req.body;
  console.log('User Recived! ', user);
  res.status(200).json('Success');
});

app.listen(port, () => {
  console.log('App listening at port ' + port);
});
