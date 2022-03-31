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

  // // /api/d/{table}/{variable}/{value}/put
  // app.put('/api/d/:table/:variable/:value/put', async (req, res) => {
  //   pool.getConnection(function (err, conn) {
  //     if (err) {
  //       logger.error('Problem with MySQL connection');
  //       res.status(400).json({
  //         code: 400,
  //         message: 'Problem with MySQL connection'
  //       });
  //     } else {
  //       controller.put(req, res, conn);
  //       conn.release();
  //     }
  //   });
  // });

module.exports = router;