const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
//user model
const User = require('../models/User');

//LoginPage
router.get('/login', (req, res) => res.render('login'));


//RegisterPage
router.get('/register', (req, res) => res.render('register'));

//Register Handler
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //CHECK REQUIRED FIELDS
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
      }
//CHECK Passwords match
  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }
//CHECK passoword lenght
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
}else{
    // validation passed
    User.findOne({ email: email }).then(user => {
      if (user) {
        //user exists
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        //HASH PASSWORD
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // set password to hashed password
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});


// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;