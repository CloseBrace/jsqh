var express = require('express');
var mailgun = require('mailgun-js');
var router = express.Router();

const sandbox = 'sandboxcc80cfa391224d5d83e5aba2d09b7590.mailgun.org';
const key = 'key-d7252ebc7e301986004cf32078c555fd';
const mg = mailgun({ apiKey: key, domain: sandbox });

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
  const { email, message, name } = req.body;
  const data = {
    from: `${name} <${email}>`,
    to: 'cwbuecheler@gmail.com',
    subject: 'Contact Form Submission',
    text: message,
  };

  mg.messages().send(data, function(error, body) {
    if (error) {
      throw new Error(error.message);
    }
    return res.json({ success: true });
  });
});

module.exports = router;
