const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Dynamic Get
router.get('/api/d/:table', async (req, res, next) => {
  try{
      await controller.get(req, res);
  } catch(error){
      return next(error);
  } 
});

module.exports = router;