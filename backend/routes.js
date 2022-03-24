const express = require('express');
const router = express.Router();

// GET /
router.get('/', (req, res) => {
  res.status(200).send('Hello world.');
});

module.exports = router;