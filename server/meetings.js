const express = require('express');
const meetingsRouter = express.Router();
const db = require('./db');

const model = 'meetings';

meetingsRouter.route('/')
  .get((req, res, next) => {
    const meetings = db.getAllFromDatabase(model);
    res.send(meetings);
  })
  .post((req, res, next) => {
    let newMeeting = db.createMeeting()
    newMeeting = db.addToDatabase(model, newMeeting);
    if (newMeeting) {
      res.status(201).send(newMeeting);
    } else {
      res.status(400).send();
    }
  })
  .delete((req, res, next) => {
    const deleted = db.deleteAllFromDatabase(model) !== null;
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(400).send();
    }
  })

module.exports = meetingsRouter;
