const express = require('express');
const router = express.Router();

// GET /
router.get('/', (req, res) => {
  res.status(200);

  if(req.session.username){
    res.write(`Welcome, ${req.session.username}.`);
  } else{
    res.write('You are not currently logged in.');
  }

  res.send();
});

module.exports = router;