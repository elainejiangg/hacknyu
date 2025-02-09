const express = require('express');
const {  } = require('../controllers/questionController');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { getRandomCategoryForUser, getRandomFeaturesForCategory, generatePhishingContent } = require('../middlewares/questionMiddleware')
const router = express.Router();

router.get('/generate-question', isLoggedIn, getRandomCategoryForUser, getRandomFeaturesForCategory, generatePhishingContent)

// router.get('/submit-answer', isLoggedIn, submitAnswer)

module.exports = router;
