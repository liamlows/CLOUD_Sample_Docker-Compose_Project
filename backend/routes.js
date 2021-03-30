const pool = require("./db");
const bcrypt = require("bcryptjs");

module.exports = function routes(app, logger) {
  // GET /
  app.get("/", (_, res) => {
    res.status(200).send("Go to 0.0.0.0:3000.");
  });

  // Users POST /users
  app.post("/users", (req, res) => {
    // obtain a connection with server
    pool.getConnection((err, connection) => {
      if (err) {
        // if there is an error obtaining a connection
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no error obtaining a connection
        const username = req.body.username;
        const password = req.body.password;
        const type = req.body.user_type;
        const saltRounds = 10;

        const error = (err) => {
          logger.error("Error adding new user: \n", err);
          res.status(400).send({
            success: false,
            msg: "There was an error creating your user.",
          });
        };

        bcrypt.genSalt(saltRounds, (err, salt) => {
          if (err) {
            error(err);
            return;
          }
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              error(err);
              return;
            }
            const sql =
              "INSERT INTO db.users (username, pass, user_type) VALUES(?, ?, ?)";
            connection.query(
              sql,
              [username, hash, type],
              (err) => {
                connection.release();
                if (err) {
                  error(err);
                }
                res.status(200).send();
              }
            );
          });
        });
      }
    });
  });

  // Users POST /login
  app.post("/login", (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        const username = req.body.username;
        var sql = "SELECT * FROM db.users WHERE username = ?";
        connection.query(sql, [username], (err, rows) => {
          if (err || !rows.length) {
            logger.error("Error while username salt: \n", err);
            res
              .status(400)
              .send({ success: false, msg: "Invalid username or password" });
          } else {
            const hash = rows[0]["pass"];
            const password = req.body.password;

            bcrypt.compare(password, hash, (err, result) => {
              if (result && !err) {
                sql =
                  "SELECT username, user_type FROM db.users WHERE username = ?";
                connection.query(sql, [username], (err, rows) => {
                  if (err) {
                    logger.error("Error retrieving information: \n", err);
                    res
                      .status(400)
                      .send(
                        "Error retrieving login information from database."
                      );
                  } else {
                    res.status(200).send({ success: true, msg: rows[0] });
                  }
                });
              } else {
                logger.error("Error no matching password: \n", err);
                res.status(400).send({
                  success: false,
                  msg: "Incorrect username or password",
                });
              }
            });
          }
        });
      }
    });
  });

  // Products GET returns all prodcuts
  app.get("/products", (req, res) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        const sql = "SELECT * FROM products"
        connection.query(sql, (err, rows) => {
          if(err) {
            logger.error("Error retrieving products: \n", err);
            res.status(400).send({
              success: false,
              msg: "Error retrieving products"
            })
          } else {
            res.status(200).send({success: true, data: rows});
          }
        })
      }
    })
  })

  // Products POST create new product
  app.post("/product", (req, res) => {
    pool.getConnection(function(err, connection) {
      if(err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        const name = req.body.name;
        const sql = "INSERT INTO products (name) VALUES(?)";

        connection.query(sql, [name], (err, result) => {
          if(err) {
            logger.error("Error adding product: \n", err);
            res.status(400).send({success: false, msg: "Error adding product"})
          } else {
            res.status(200).send({success: true, msg: "Product successfully added"})
          }
        })
      }
    })
  })
};
