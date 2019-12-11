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
  // Get the data from the DB
  var query = User.find();
  query.exec(function (err, userData) {
    if (err) {
      return res.send('Something went wrong retrieving users from the database');
    }
    // Send it to the view
    res.render('userlist', { title: 'User List', userData: userData });
  });
});

/* GET individual user */
router.get('/:username', function(req, res, next) {
  // Get the data from the DB
  var query = User.findOne({username: req.params.username});
  query.exec(function (err, userData) {
    if (err) {
      return res.send('Something went wrong retrieving the user from the database');
    }
    // Send it to the view
    res.render('user', { title: 'User Data', userData: userData });
  });
})

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
    return res.redirect('/users');
  });
});

/* DELETE to delete. */
router.delete('/delete/:id', function(req, res, next) {
  // Delete the user from the DB
  User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) { return res.status(500).send(err); }
    return res.status(200).send('success');
  });
});

/* GET to update. */
router.get('/update/:id', function(req, res, next) {
  // Get the user from the DB
  var query = User.findOne({_id: req.params.id});
  query.exec(function (err, userData) {
    if (err) {
      return res.send('Something went wrong retrieving the user from the database');
    }
    // Send it to the view
    res.render('update', { title: 'Update User Data', user: userData });
  });
});

/* POST to update. */
router.post('/update', function(req, res, net) {
  const { age, id, email, name, username } = req.body;
  // Update the user in the DB
  User.updateOne(
    { _id: id },
    { name, email, username, age },
    (err, user) => {
      if (err) { return res.status(500).send(err); }
      // Redirect to the user list
      return res.redirect('/users');
    }
  );
});

module.exports = router;
