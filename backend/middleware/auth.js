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
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    for (let claim of claims) {
      if (user.claims.includes(claim)) {
        req.user = user;
        return next();
      }
    }
    return res.sendStatus(401);
  });
}

module.exports = { authenticateJWT, authenticateWithClaims };