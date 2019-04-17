var express = require('express');
var router = express.Router();

/* POST to contact api - part 1: validation */
router.post('/contact', function(req, res, next) {
  const { email, message, name } = req.body;
  const errors = {
    hasError: true,
    count: 0,
    list: [],
  };

  if (!email || email === '') {
    errors.count += 1;
    errors.list.push('Email missing.');
  }
  if (!message || message === '') {
    errors.count += 1;
    errors.list.push('Message missing.');
  }
  if (!name || name === '') {
    errors.count += 1;
    errors.list.push('Name missing.');
  }

  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(email).toLowerCase())) {
    errors.count += 1;
    errors.list.push('Malformed email.');
  }

  if (errors.count > 0) {
    errors.hasError = true;
    return res.json(errors);
  }

  next();
});

/* POST to contact api - part 2: send the email */
router.post('/contact', function(req, res, next) {
  return res.json({ success: true });
});

module.exports = router;
