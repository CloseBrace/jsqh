var express = require('express');
var router = express.Router();

/* GET contact page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact Us' });
});

/* GET thanks page. */
router.get('/thanks', function(req, res, next) {
  res.render('thanks', { title: 'Thank You' });
});

/* POST to contact page - part 1: validation */
router.post('/', function(req, res, next) {
  const { email, message, name } = req.body;
  const errors = {
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
    return res.json(errors);
  }

  next();
});

/* POST to contact page - part 2: send the email */
router.post('/', function(req, res, next) {
  // format email and send via SMTP server
  // ... or just console log it, for now!
  console.log(req.body);
  res.redirect('/contact/thanks');
});

module.exports = router;
