require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cors());
app.use(express.static('public'));

app.use('/api/v1/works', require('./router/works'));

app.listen(port, (err) => {
    if (err) {
      throw new Error('Something bad happened...');
    }
    console.log(`Server is listening on ${port}`);
  });
  