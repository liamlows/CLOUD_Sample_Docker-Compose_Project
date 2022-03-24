const router = express.Router();

module.exports = function routes(app, logger) {
    // GET /
    app.get("/", (req, res) => {
      res.status(200).send("Go to 0.0.0.0:3000.");
    });
}

//   //sign in api to create new user
//   app.post("/register", async (req, res) => {
//     // obtain a connection from our pool of connections
//     pool.getConnection(function (err, connection) {
//       if (err) {
//         // if there is an issue obtaining a connection, release the connection instance and log the error
//         //logger.error('Problem obtaining MySQL connection',err)
//         res.status(69).send("Problem obtaining MySQL connection");
//       } else {
//         let userName = req.body.userName;
//         let password = req.body.password;
//         const hash = crypto
//           .createHmac("sha256", secret)
//           .update(password)
//           .digest("hex");
//         let insert = [[userName, hash]];

//         //checking if the provided username already exists
//         let sql1 = "SELECT userID FROM User WHERE userName ='" + userName + "'";
//         connection.query(sql1, function (err, rows, fields) {
//           if (err) {
//             logger.error("Error while fetching values: \n", err);
//             res.status(420).json({
//               data: [],
//               error: "Error obtaining values",
//             });
//           } else {
//             //if the username is not taken
//             if (rows.length == 0) {
//               let sql =
//                 "INSERT INTO User (userName, password) VALUES ?";
//               console.log(sql);
//               // if there is no issue obtaining a connection, execute query and release connection
//               connection.query(sql, [insert], function (err, rows, fields) {
//                 connection.release();
//                 if (err) {
//                   logger.error("Error while fetching values: \n", err);
//                   res.status(400).json({
//                     data: [],
//                     error: "Error obtaining values",
//                   });
//                 } else {
//                   let users = {
//                     username: userName,
//                     pxcd: hash,
//                   };
//                   res.cookie(cookieName, users);
//                   res.status(200).json({
//                     data: rows,
//                   });
//                 }
//               });
//             } else {
//               //user already exists
//               res.status(405).json({
//                 status: 1,
//               });
//             }
//           }
//         });
//       }
//     });
//   });