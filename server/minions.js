const express = require('express');
const minionsRouter = express.Router();
const db = require('./db');

const model = 'minions';

minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = db.getFromDatabaseById(model, id);
  if (minion) {
    req.minionId = id;
    req.minion = minion;
    return next();
  }
  res.status(404).send();
})

minionsRouter.route('/')
  .get((req, res, next) => {
    const minions = db.getAllFromDatabase(model);
    res.send(minions);
  })
  .post((req, res, next) => {
    const newMinion = db.addToDatabase(model, req.body);
    if(newMinion){
      res.status(201).send(newMinion);
    } else {
      res.status(400).send();
    }
  })

minionsRouter.route('/:minionId')
  .get((req, res, next) => {
    res.send(req.minion);
  })
  .put((req, res, next) => {
    req.body.id = req.minionId;
    const updatedMinion = db.updateInstanceInDatabase(model, req.body);
    if (updatedMinion) {
      res.status(202).send(updatedMinion);
    } else {
      res.status(400).send();
    }
  })
  .delete((req, res, next) => {
    const deletedMinion = db.deleteFromDatabasebyId(model, req.minionId);
    if (deletedMinion) {
      res.status(204).send(deletedMinion);
    } else {
      res.status(400).send();
    }
  })

module.exports= minionsRouter;
