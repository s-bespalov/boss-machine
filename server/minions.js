const express = require('express');
const minionsRouter = express.Router();
const db = require('./db');

const minionsModel = 'minions';
const workModel = 'work';''

minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = db.getFromDatabaseById(minionsModel, id);
  if (minion) {
    req.minionId = id;
    req.minion = minion;
    return next();
  }

  res.status(404).send();
});

minionsRouter.param('workId', (req, res, next, id) => {
  const work = db.getFromDatabaseById(workModel, id);
  if (work) {
    req.workId = id;
    req.work = work;
    return next();
  }
  res.status(404).send();
});

minionsRouter.route('/')
  .get((req, res, next) => {
    const minions = db.getAllFromDatabase(minionsModel);
    res.send(minions);
  })
  .post((req, res, next) => {
    const newMinion = db.addToDatabase(minionsModel, req.body);
    if(newMinion) {
      res.status(201).send(newMinion);
    } else {
      res.status(400).send();
    }
  });

minionsRouter.route('/:minionId')
  .get((req, res, next) => {
    res.send(req.minion);
  })
  .put((req, res, next) => {
    req.body.id = req.minionId;
    const updatedMinion = db.updateInstanceInDatabase(minionsModel, req.body);
    if (updatedMinion) {
      res.status(202).send(updatedMinion);
    } else {
      res.status(400).send();
    }
  })
  .delete((req, res, next) => {
    const deletedMinion = db.deleteFromDatabasebyId(minionsModel, req.minionId);
    if (deletedMinion) {
      res.status(204).send();
    } else {
      res.status(400).send();
    }
  });

minionsRouter.route('/:minionId/work')
  .get((req, res, next) => {
    let works = db.getAllFromDatabase(workModel);
    works = works.filter(work => work.minionId === req.minionId);
    if (works) {
      res.send(works);
    } else {
      res.status(204).send();
    }
  })
  .post((req, res, next) => {
    const newWork = db.addToDatabase(workModel, req.body);
    if (newWork) {
      res.status(201).send(newWork);
    } else {
      res.status(400).send();
    }
  });

minionsRouter.route('/:minionId/work/:workId')
  .put((req, res) => {
    const minion = db.getFromDatabaseById(minionsModel, req.body.minionId);
    const work = db.getFromDatabaseById(workModel, req.body.id);
    if (!minion || !work) {
      return res.status(400).send();
    }

    const updatedWork = db.updateInstanceInDatabase(workModel, req.body);
    if (updatedWork) {
      res.status(202).send(updatedWork);
    } else {
      res.status(400).send();
    }
  })
  .delete((req, res) => {
    const deletedWork = db.deleteFromDatabasebyId(workModel, req.workId);
    if (deletedWork) {
      res.status(204);
    } else {
      res.status(400);
    }
    res.send();
  });

module.exports= minionsRouter;
