const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.TOKEN;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }

    req.user = user;

    next();
  });
  
};

const authenticateWithClaims = (claims) => (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.log("No authHeader");
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    for (let claim of claims) {
      if (user.claims.includes(claim)) {
        req.user = user;
        return next();
      }
    }
    return res.sendStatus(404);
  });
}

module.exports = { authenticateJWT, authenticateWithClaims };