var express = require('express');
var mailgun = require('mailgun-js');
var router = express.Router();

const { SANDBOX, KEY } = process.env;
const mg = mailgun({ apiKey: KEY, domain: SANDBOX });

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
  const { email, message, name } = req.body;
  const data = {
    from: `${name} <${email}>`,
    to: 'captaincode@closebrace.com',
    subject: 'Contact Form Submission',
    text: message,
  };

  mg.messages().send(data, function(error, body) {
    if (error) {
      throw new Error(error.message);
    }
    res.redirect('/contact/thanks');
  });
});

module.exports = router;
