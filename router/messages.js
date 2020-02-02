const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    const message = await 'Hello World!';
    res.send(message);
})

module.exports = router;
