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


// Dynamic Post
// /api/d/{table}/post
router.post('/api/d/:table/post', async (req, res, next) => {
  try{
    await controller.post(req, res);
  } catch(error){
    return next(error);
  }
});

// Dynamic Put
// /api/d/{table}/{variable}/put
router.put('/api/d/:table/:variable/put', async (req, res, next) => {
  try{
    await controller.put(req, res);
  } catch(error){
    return next(error);
  }
});

// Dynamic Delete
// /api/d/{table}/{variable}/delete
router.delete('/api/d/:table/:variable/delete', async (req, res, next) => {
  try{
    await controller.delete(req, res);
  } catch(error){
    return next(error);
  }
});

module.exports = router;