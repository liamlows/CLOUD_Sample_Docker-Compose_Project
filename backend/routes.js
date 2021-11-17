const pool = require('./db')
const bcrypt =  require("bcryptjs");
const jwt = require('jsonwebtoken');
const checkAuth = require('./middleware/check-auth');

module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });


  //register user
   app.post('/users/register', async (req, res) => {
	   var firstName = req.body.firstName;
			var lastName = req.body.lastName;
			var username = req.body.username;
			var passwd = await bcrypt.hash(req.body.passwd,10);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if (err){
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        return logger.error('Problem obtaining MySQL connection', err)
      }  
      connection.query('select * from Users where username = ?',username,function (err, result, fields) {
        if (err) { 
          // if there is an error with the query, release the connection instance and log the error
          connection.release()
          return logger.error("Problem checking if username exists ", err);
        } else { 
          // if there is no error with the query, release the connection instance
          res.send(result);
          if(result.length>0){
              connection.release()
              return logger.error("Username already exists ",err);
          }
          else{
            connection.query('insert into Users (firstName, lastName, username, password) values (?,?,?,?)',[firstName,lastName,username,passwd],function (err, result, fields) { });
          }
          connection.release()
          
        }
      });
        
        
    })
  });
  
  app.post('/users/login',async (req,res)=>{
    var username = req.body.username;
    var passwd = req.body.passwd;
    pool.getConnection(function (err, connection){
      if (err){
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        connection.release();
        return logger.error('Problem obtaining MySQL connection', err)
      }  
      
      connection.query('select * from Users where username = ?',username,function (err, result, fields){
        if (err) { 
          // if there is an error with the query, release the connection instance and log the error
          connection.release()
          return logger.error("Problem checking if username exists ", err);
        } 
        if(result.length===0){
          connection.release()
          return res.status(401).json({
            message :'Authentication Failed'
          });
        }
        else{
          connection.query('select password from Users where username = ?',username,function(err,result,fields){
            if (err) { 
              // if there is an error with the query, release the connection instance and log the error
              connection.release()
              return logger.error("Problem getting password ", err);
            } 
            else{
              var hash = result[0].password;
              bcrypt.compare(passwd,hash,(err,result2)=>{
                if(err){
                  connection.release();
                  return res.status(401).json({
                    message :'Authentication Failed'
                  });
                }
                if(result2){
                  const token = jwt.sign({username:req.body.username},'secret',{
                    expiresIn: "1h"
                  });

                  connection.release();
                  return res.status(200).json({
                    message :'Authentication Successful',
                    token : token
                  });
                }
                if(!result2){
                  connection.release();
                  return res.status(401).json({
                    message :'Authentication Failed'
                  });
                }
                
              });
            }
          })
        }
      });

    })
  })



  // update a specific player's position
  // /player/position?playerID=123&playerPos=Quarterback
  app.put('/player/position', async (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if (err){
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      }  else {
			var playerID = req.body.playerID;
			var playerPos = req.body.playerPos;
            connection.query("UPDATE Players SET Position = ? WHERE PlayerID = ?",[playerPos,playerID], function (err, result, fields) {
              if (err) { 
                // if there is an error with the query, release the connection instance and log the error
                connection.release()
                logger.error("Problem updating player position: ", err);
                res.status(400).send('Problem updating player position'); 
              } else { 
                // if there is no error with the query, release the connection instance
				res.send(result);
                connection.release()
                
              }
            });
          }
        });
      });
  // get players ppg, just specify player first and last name using body
  app.get('/player/ppg',checkAuth, async (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if (err){
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      }  else {
			var firstName = req.body.firstName;
			var lastName = req.body.lastName;
            connection.query("select PPG from Players where FirstName = ? and LastName = ?",[firstName,lastName], function (err, result, fields) {
              if (err) { 
                // if there is an error with the query, release the connection instance and log the error
                connection.release()
                logger.error("Problem getting ppg: ", err);
                res.status(400).send('Problem getting ppg'); 
              } else { 
                // if there is no error with the query, release the connection instance
				res.send(result);
                connection.release()
                
              }
            });
          }
        });
      });
	  
	  
	  // get list of players so that you can vote for mvp (assume it should be filtered by the league but they did not say that)
  app.get('/players', async (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if (err){
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      }  else {
			var league = req.body.league;
            connection.query("select FirstName,LastName,TeamName from Players join Teams T on T.TeamID = Players.TeamID where League = ?",[league], function (err, result, fields) {
              if (err) { 
                // if there is an error with the query, release the connection instance and log the error
                connection.release()
                logger.error("Problem getting ppg: ", err);
                res.status(400).send('Problem getting ppg'); 
              } else { 
                // if there is no error with the query, release the connection instance
				res.send(result);
                connection.release()
                
              }
            });
          }
        });
      });
	  
	  
	//gets list of games a player has played in, just specify first and last name, returns the players name, and the game ids
	app.get('/player/games', async (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if (err){
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      }  else {
			var firstName = req.body.firstName;
			var lastName = req.body.lastName;
            connection.query("select FirstName,LastName,GameID from Players P join Teams T on P.TeamID = T.TeamID join Games G on T.TeamID = G.Team1ID or T.TeamID=G.Team2ID where P.FirstName=? and P.LastName=?",[firstName,lastName], function (err, result, fields) {
              if (err) { 
                // if there is an error with the query, release the connection instance and log the error
                connection.release()
                logger.error("Problem getting ppg: ", err);
                res.status(400).send('Problem getting ppg'); 
              } else { 
                // if there is no error with the query, release the connection instance
				res.send(result);
                connection.release()
                
              }
            });
          }
        });
      });
	  
	//update a games score, must specify which team, which game and the score you want to update
  app.put('/games/score', async (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if (err){
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      }  else {
			var GameID = req.body.GameID;
			var score = req.body.score;
			var teamNum=req.body.teamNum;
			if(teamNum=1){
				connection.query("update Games set Team1Score = ? where GameID = ?;",[score,GameID], function (err, result, fields){
				if (err)  {
                // if there is an error with the query, release the connection instance and log the error
                connection.release()
                logger.error("Problem getting ppg: ", err);
                res.status(400).send('Problem getting ppg'); 
				} 
				else { 
                // if there is no error with the query, release the connection instance
				res.send(result);
                connection.release()
                }
				});
			}
			else{
				connection.query("update Games set Team2Score = ? where GameID = ?;",[score,GameID], function (err, result, fields){
				if (err){
                // if there is an error with the query, release the connection instance and log the error
                connection.release()
                logger.error("Problem getting ppg: ", err);
                res.status(400).send('Problem getting ppg'); 
				} 
				else { 
                // if there is no error with the query, release the connection instance
				res.send(result);
                connection.release()
                }
				});
			}
        }
      });
  });



  // POST /multplynumber
  app.post('/multplynumber', (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO `db`.`test_table` (`value`) VALUES(\'' + req.body.product + '\')', function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            res.status(200).send(`added ${req.body.product} to the table!`);
          }
        });
      }
    });
  });

  // GET /checkdb
  app.get('/values', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT value FROM `db`.`test_table`', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });

  app.get('/games/league', async (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if (err){
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      }  else {
			var league = req.body.league;
            connection.query("select * from Games join Teams T on Games.WinnerID = T.TeamID where League = ? order by Date",league, function (err, result, fields) {
              if (err) { 
                // if there is an error with the query, release the connection instance and log the error
                connection.release()
                logger.error("Problem getting games from league: ", err);
                res.status(400).send('Problem getting games from league'); 
              } else { 
                // if there is no error with the query, release the connection instance
				res.send(result);
                connection.release()
                
              }
            });
          }
        });
      });


}

