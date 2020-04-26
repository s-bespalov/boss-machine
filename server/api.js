const express = require('express');
const apiRouter = express.Router();

// import routers
const minionsRouter = require('./minions');
const ideasRouter = require('./ideas');
const meetingsRouter = require('./meetings');

// set up routers
apiRouter.use('/minions', minionsRouter);

const checkMillionDollarIdea = require('./checkMillionDollarIdea');
apiRouter.post('/ideas', checkMillionDollarIdea);
apiRouter.use('/ideas', ideasRouter);

apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
