var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  age: Number,
  email: String,
  name: String,
  username: String,
});
var User = mongoose.model('User', userSchema);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST to create. */
router.post('/create', function(req, res, next) {
  // insert user in DB
  var NewUser = new User(req.body);
  NewUser.save(function(err, resp) {
    // If there's an error, send an error message
    if (err) {
      return res.send('Something went wrong adding the user to the database.');
    }
    // If not, send a success message
    return res.send('Successfully added the user to the database.');
  });
});

module.exports = router;
