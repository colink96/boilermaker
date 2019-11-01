const router = require('express').Router();
const User = require('./models/User');
const passport = require('passport');

router.use('/google', require('./oauth2'));

router.get('/me', (req, res, next) => {
  if (!req.user) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    res.json(req.user);
  }
});

router.put('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(user => {
      if (!user) {
        res.status(401).send('User not found');
      } else if (!user.hasMatchingPassword(req.body.password)) {
        res.status(401).send('Incorrect password');
      } else {
        req.login(user, err => {
          if (err) next(err);
          else res.json(user);
        });
      }
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => {
        if (err) {
          next(err);
        } else {
          res.json(user);
        }
      });
    })
    .catch(next);
});

router.delete('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(204);
});

module.exports = router;
