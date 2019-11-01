const router = require('express').Router();

//Define routes here

//404 handling
router.use(function(req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
