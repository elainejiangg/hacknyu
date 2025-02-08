const express = require('express');
const {  } = require('../controllers/questionController');
const { isLoggedIn } = require('../middlewares/authMiddleware');

router.get('/generate-question', isLoggedIn, generateQuestion)

router.get('/submit-answer', isLoggedIn, submitAnswer)