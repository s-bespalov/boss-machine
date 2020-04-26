const express = require('express');
const ideasRouter = express.Router();
const db = require('./db');

const model = 'ideas';

ideasRouter.route('/')
  .get((req, res, next) => {
    const ideas = db.getAllFromDatabase(model);
    res.send(ideas);
  })
  .post((req, res, next) =>  {
    const newIdea = db.addToDatabase(model, req.body);
    if (newIdea) {
      res.status(201).send(newIdea);
    } else {
      res.status(400).send();
    }
  })

ideasRouter.param('ideaId', (req, res, next, id) => {
  const idea = db.getFromDatabaseById(model, id);
  if (idea) {
    req.idea = idea;
    req.ideaId = id;
    return next();
  }

  res.status(404).send();
})

ideasRouter.route('/:ideaId')
  .get((req, res, next) => {
    res.send(req.idea);
  })
  .put((req, res, next) => {
    req.body.id = req.ideaId;
    const updatedIdea = db.updateInstanceInDatabase(model, req.body);
    if (updatedIdea) {
      res.status(202).send(updatedIdea);
    } else {
      res.status(400).send();
    }
  })
  .delete((req, res, next) => {
    const deletedIdea = db.deleteFromDatabasebyId(model, req.ideaId);
    if (deletedIdea) {
      res.status(204).send();
    } else {
      res.status(400).send();
    }
  })

module.exports = ideasRouter;
