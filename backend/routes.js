const pool = require('./db')

module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });

  // add a new player to a team's roster
  // /player
  // example body: {"playerLastName":"Astley","playerFirstName":"Rick","playerNumber":"123","teamID":"1","playerPPG":"2","playerPos":"X","playerTimePlayed":"30","coachID":"1","playerPicture":"https://variety.com/wp-content/uploads/2021/07/Rick-Astley-Never-Gonna-Give-You-Up.png?w=1024"}
  app.post('/player', async (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if (err){
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      }  else {
            // does NOT take in playerID
            var playerLastName = req.body.playerLastName;
            var playerFirstName = req.body.playerFirstName;
            var playerNumber = req.body.playerNumber;
            var teamID = req.body.teamID;
            var playerPPG = req.body.playerPPG;
            var playerPos = req.body.playerPos;
            var playerTimePlayed = req.body.playerTimePlayed;
            var coachID = req.body.coachID;
            var playerPicture = req.body.playerPicture;
            connection.query("INSERT INTO Players (LastName, FirstName, PlayerNumber, TeamID, PPG, Position, TimePlayed, CoachID, Picture) VALUES (?,?,?,?,?,?,?,?,?)",[playerLastName,playerFirstName,playerNumber,teamID,playerPPG,playerPos,playerTimePlayed,coachID,playerPicture], function (err, result, fields) {
              if (err) { 
                // if there is an error with the query, release the connection instance and log the error
                connection.release()
                logger.error("Problem adding a player: ", err);
                res.status(400).send('Problem adding a player'); 
              } else { 
                // if there is no error with the query, release the connection instance
			          res.send(result);
                connection.release()
                
              }
            });
          }
        });
      });

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
  app.get('/player/ppg', async (req, res) => {
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
}