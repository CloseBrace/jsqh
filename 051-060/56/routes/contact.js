var express = require('express');
var router = express.Router();

/* Used by EVERY contact route */
router.use(function (req, res, next) {
  var method = req.method;
  if (method === 'POST') {
    console.log('Body: ' + JSON.stringify(req.body));
  }
  else {
    console.log('Not a POST');
  }
  next();
})

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

/* POST to index page - append date */
router.post('/', function(req, res, next) {
  const { name, message } = req.body;
  const now = new Date();
  req.data = {
    date: now,
    message,
    name,
  };
  next();
});

/* POST to index page. */
router.post('/', function(req, res, next) {
  var querystring =
    'date=' + encodeURIComponent(req.data.date) +
    '&name=' + encodeURIComponent(req.data.name) +
    '&message=' + encodeURIComponent(req.data.message)
  ;
  res.redirect('/contact/thanks?' + querystring);
});

/* GET thanks page */
router.get('/thanks', function(req, res, next) {
  console.log(req.query);
  res.render('thanks', {
    title: 'Thanks',
    date: req.query.date,
    name: req.query.name,
    message: req.query.message,
  });
});

module.exports = router;
