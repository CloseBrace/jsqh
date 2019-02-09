var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET user and respond with JSON */
router.get('/:id', function(req, res, next) {
  console.log('The ID is: ' + req.params.id);
  var fakeUser = {
    age: 31,
    name: 'Corey Smith',
    twitter: 'cdawg',
    username: 'csmith',
  };
  res.json(fakeUser);
});

module.exports = router;
