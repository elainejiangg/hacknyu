const express = require("express");
const { flagQuestionPart, updateCategoryExp } = require("../controllers/answerController");
const { isLoggedIn } = require("../middlewares/authMiddleware");
const { calculateQuestionScore, getQuestionCategoryId } = require("../middlewares/answerMiddleware")
const router = express.Router();

// User can flag specific question parts as suspicious
router.put('/:questionPartId/add-flag', isLoggedIn, flagQuestionPart)

// This should execute after a user clicks the submit button
router.put('/:questionId/score', isLoggedIn, calculateQuestionScore, getQuestionCategoryId, updateCategoryExp)

module.exports = router;
