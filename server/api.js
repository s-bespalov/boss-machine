const express = require('express');
const apiRouter = express.Router();

// import routers
const minionsRouter = require('./minions');
const ideasRouter = require('./ideas');

// set up routers
apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);

module.exports = apiRouter;
