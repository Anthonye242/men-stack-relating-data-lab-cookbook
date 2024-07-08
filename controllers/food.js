const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user.js');

router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.render('foods/index.ejs', { pantry: user.pantry });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

router.get('/new', (req, res) => {
  res.render('foods/new.ejs');
});

router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.pantry.push(req.body);
    await user.save();
    res.redirect(`/users/${req.params.userId}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

router.delete('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.pantry.id(req.params.itemId).deleteOne();
    await user.save();
    res.redirect(`/users/${req.params.userId}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

router.get('/:itemId/edit', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const food = user.pantry.id(req.params.itemId);
    res.render('foods/edit.ejs', { food });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

router.put('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const food = user.pantry.id(req.params.itemId);
    food.set(req.body);
    await user.save();
    res.redirect(`/users/${req.params.userId}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

module.exports = router;