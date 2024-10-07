const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

router.post('/login', authController.login);

router.get('/logout', authController.logout);

module.exports = router;