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
    console.log("Searching claims...");
    console.log(claims);
    for (let claim of claims) {
      console.log(claim);
      if (user.claims.includes(claim)) {
        console.log("User found.");
        req.user = user;
        return next();
      }
    }
    return res.sendStatus(404);
  });
}

const authenticateWithoutClaims = (claims) => (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.log("No authHeader");
    
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    for (let claim of claims) {
      console.log(claim);
      if (user.claims.includes(claim)) {
        return res.sendStatus(401);
        
      }
    }
    req.user = user;
    return next();
  });
}

module.exports = { authenticateJWT, authenticateWithClaims };