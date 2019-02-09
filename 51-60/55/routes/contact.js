var express = require('express');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

/* POST to index page. */
router.post('/', function(req, res, next) {
  var querystring =
    'name=' + encodeURIComponent(req.body.name) +
    '&message=' + encodeURIComponent(req.body.message)
  ;
  res.redirect('/contact/thanks?' + querystring);
});

/* GET thanks page */
router.get('/thanks', function(req, res, next) {
  console.log(req.query);
  res.render('thanks', {
    title: 'Thanks',
    name: req.query.name,
    message: req.query.message,
  });
});

module.exports = router;
