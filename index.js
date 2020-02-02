const express = require('express');

const app = express();
const port = 3001;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.static('public'));

app.get('/', async (req, res) => {
    const message = await 'Hello World!';
    res.send(message);
})

app.listen(port, (err) => {
    if (err) {
      throw new Error('Something bad happened...');
    }
    console.log(`Server is listening on ${port}`);
  });
  