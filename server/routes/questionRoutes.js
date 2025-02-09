const express = require("express");
const {
  createQuestionWithParts,
  getAllCategoryExps,
  updateCategoryExp,
} = require("../controllers/questionController");
const { isLoggedIn } = require("../middlewares/authMiddleware");
const {
  getRandomCategoryForUser,
  generatePhishingContent,
  getRandomFeaturesForCategory,
} = require("../middlewares/questionMiddleware");
const router = express.Router();

router.get(
  "/generate-question",
  isLoggedIn,
  getRandomCategoryForUser,
  generatePhishingContent,
  getRandomFeaturesForCategory
);

// Get all category exps for a user to display on their dashboard
router.get("/exp", isLoggedIn, getAllCategoryExps);

// Update category exp after a user answers a question
router.put("/:categoryId", isLoggedIn, updateCategoryExp);

// router.get('/submit-answer', isLoggedIn, submitAnswer)

module.exports = router;
