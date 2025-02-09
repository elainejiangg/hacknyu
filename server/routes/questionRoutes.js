const express = require('express');
const {  } = require('../controllers/questionController');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { getRandomCategoryForUser, getRandomFeaturesForCategory } = require('../middlewares/questionMiddleware')
const router = express.Router();

router.get('/generate-question', isLoggedIn, getRandomCategoryForUser, getRandomFeaturesForCategory)

// router.get('/submit-answer', isLoggedIn, submitAnswer)

module.exports = router;
