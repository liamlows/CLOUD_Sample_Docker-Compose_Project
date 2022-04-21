require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
//const mysqlConnect = require('./db');

//route handlers
//const routes = require('./routes/routes');
const usersRoutes = require('./routes/users');
const userUpdatesRoutes = require('./routes/user_updates');
const sessionRoutes = require('./routes/session');
const customerDashRoutes = require('./routes/customer_dash');
const farmerDashRoutes = require('./routes/farmer_dash');

//middle ware
const { createModelsMiddleware } = require('./middleware/model-middleware');
const { authenticateJWT, authenticateWithClaims } = require('./middleware/auth');

// set up some configs for express.
const config = {
  name: 'sample-express-app',
  port: 8000,
  host: '0.0.0.0',
};

// create the express.js object
const app = express();

// create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

// specify middleware to use
app.use(bodyParser.json());
app.use(cors({origin: '*'}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));
app.use(createModelsMiddleware);

//health route
app.get('/health', (request, response, next) => {
  const responseBody = { status: 'up', port: 8000 };
  response.json(responseBody);

  next();
});

//include routes
//app.use('/routes', routes);
app.use('/login', sessionRoutes);
app.use('/account', usersRoutes);
app.use('/settings', authenticateJWT, userUpdatesRoutes);
app.use('/dashboard/farmer', authenticateWithClaims(['farmer']), farmerDashRoutes);
app.use('/dashboard/customer', authenticateWithClaims(['customer']), customerDashRoutes);


// connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
