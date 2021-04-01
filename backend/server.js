require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { log, ExpressAPILogMiddleware } = require("@rama41222/node-logger");
// const mysqlConnect = require('./db');
const routes = require("./routes");
const { Router } = require("express");

// set up some configs for express.
const config = {
  port: 8000,
  name: "sample-express-app",
  host: "0.0.0.0",
};

// create the express.js object
const app = express();

// create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ label: config.name, file: false, console: true });

// specify middleware to use
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

// eslint-disable-next-line new-cap
app.use(ExpressAPILogMiddleware(logger, { request: true }));

// include routes
routes(app, logger);

// connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error("Internal Server Error");
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});

//POST -> /auction -> create auction
app.post('/auction', async (req,res)=>{
  var id = req.param('id');
  var current_bid= req.param('current_bid');
  var list_user_id= req.param('list_user_id');
  var bid_user_id= req.param('bid_user_id');
  var product_id= req.param('product_id');
  var show_user_bid= req.param('show_user_bid');
  var is_finished= req.param('is_finished');
  var start_date= req.param('start_date');
  var end_date= req.param('end_date');
  var description= req.param('description');

  config.query("INSERT INTO auction (id,current_bid,list_user_id,bid_user_id,product_id,show_user_bid,is_finished,start_date,end_date,description) VALUES (?,?,?,?,?,?,?,?,?,?)",[id,current_bid,list_user_id,bid_user_id,product_id,show_user_bid,is_finished,start_date,end_date,description],function (err, result, fields) {
    if (err) throw err;
    res.end(JSON.stringify(result)); // Result in JSON format
  });
});

//GET -> /auctions -> get all running auctions
app.get('/auctions', function (req,res) {
  var id = req.param('id');
  config.query("SELECT * FROM auction WHERE auction.id = (?)",id, productCode, function(err,result,fields){
		if(err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
});

//DELETE -> /auctions/:id -> stop auction
app.delete('/auctions/:id', async (req,res)=>{

  var id = req.param('id');
  config.query("DELETE FROM auction WHERE auction.id = ?", id, function (err, result, fields) {
    if (err) 
      return console.error(error.message);
    res.end(JSON.stringify(result)); 
  });
});

//PUT /auction/:id -> upacte action, options: descpription,end_date
app.put('/auction/:id', async(req,res) =>{
  var id = req.param('id');
  var end_date = req.param('end_date');

  config.query("UPDATE auction SET auction.end_date = ? WHERE auction.id = ?", [end_date,id],function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
});

//POST /auction/:id/bid -> User bids on auction, sends price
app.post('/auction/:id/bid', async (req,res)=>{
  var id = req.param('id');
  var new_bid = req.param('new_bid');

  config.query("UPDATE auction SET auction.current_bid = ? WHERE auction.id = ? IF (? > auction.current_bid)",[new_bid,id,new_bid],function (err, result, fields) {
    if (err) throw err;
    res.end(JSON.stringify(result)); // Result in JSON format
  });

});