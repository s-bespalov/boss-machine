const checkMillionDollarIdea = (req, res, next) => {

  const weeklyRevenue = Number(req.body.weeklyRevenue);
  const numWeeks = Number(req.body.numWeeks);

  const correct = weeklyRevenue !== Number.NaN && numWeeks !== Number.NaN;
  if (correct && (numWeeks * weeklyRevenue >= 1000000)) {

    return next();
  }

  res.sendStatus(400);
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
