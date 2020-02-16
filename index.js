require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDb = require('./config/connection');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cors());
app.use(express.static('public'));

app.use('/api/v1/works', require('./router/works'));

app.listen(port, () => {
  console.log(`Listening on ${port}`);
  connectDb().then(() => {
    console.log('MongoDb connected');
  });
});
