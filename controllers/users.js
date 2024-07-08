const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.render('users/index.ejs', { users });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render('users/show.ejs', { user });
  } catch (err) {
    console.log(err);
    res.redirect('/users');
  }
});

module.exports = router;