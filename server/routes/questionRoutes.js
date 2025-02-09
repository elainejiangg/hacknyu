const express = require("express");
const {
  createQuestionWithParts,
  getQuestionParts,
  getAllCategoryExps,
  updateCategoryExp,
} = require("../controllers/questionController");
const { isLoggedIn } = require("../middlewares/authMiddleware");
const {
  getRandomCategoryForUser,
  getRandomFeaturesForCategory,
  generatePhishingContent,
} = require("../middlewares/questionMiddleware");
const router = express.Router();

router.get(
  "/generate-question",
  isLoggedIn,
  async (req, res, next) => {
    try {
      await getRandomCategoryForUser(req, res, next);
    } catch (error) {
      next(error);
    }
  },
  async (req, res, next) => {
    try {
      await getRandomFeaturesForCategory(req, res, next);
    } catch (error) {
      next(error);
    }
  },
  generatePhishingContent,
  createQuestionWithParts
);

// Get all question parts (in order) associated with a question
router.get('/:questionId/questionParts', getQuestionParts)

// Get all category exps for a user to display on their dashboard
router.get("/exp", isLoggedIn, getAllCategoryExps);

// Update category exp after a user answers a question
router.put("/:categoryId", isLoggedIn, updateCategoryExp);

// router.get('/submit-answer', isLoggedIn, submitAnswer)

module.exports = router;
