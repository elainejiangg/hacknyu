const express = require('express');
const {  } = require('../controllers/authController');
const { isLoggedIn } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/login', )

// Retrieve papers associated with keyword for user
// router.get('/:userId/feed', isLoggedIn, getUserPapers)

// // Delete paper from feed
// router.post('/:userId/feed/exclude', isLoggedIn, excludePaperFromFeed)

// // Get tracked keywords
// router.get('/:userId/keywords', isLoggedIn, getKeywords)

// // Add new keyword
// router.post('/:userId/keywords', isLoggedIn, addKeyword)

// // Delete a keyword
// router.delete('/:userId/keywords/:keywordId', isLoggedIn, deleteKeyword)

module.exports = router;
