require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDb = require('./config/connection');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'YOUR-DOMAIN.TLD'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static('public'));

app.use('/api/v1/works', require('./api/works'));

app.listen(port, () => {
  console.log(`Listening on ${port}`);
  connectDb().then(() => {
    console.log('MongoDb connected');
  });
});
