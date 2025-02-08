const express = require('express');
const passport = require('passport')
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const { isLoggedIn } = require('../middlewares/authMiddleware');

const router = express.Router();

// Register a new user
router.post('/register', registerUser)

// Login an existing user
router.post('/login', loginUser)

// Logout a user
router.post('/logout', isLoggedIn, logoutUser)

module.exports = router;
