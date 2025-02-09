const { QuestionPart, Question, UserCategory } = require("../models");
require("dotenv").config({ path: "../.env" });

exports.calculateQuestionScore = async (req, res, next) => {
    const { questionId } = req.params;

    try {
      // Fetch all question parts associated with the questionId
      const questionParts = await QuestionPart.findAll({
        where: { question_id: questionId },
      });

      if (questionParts.length === 0) {
        return res.status(404).json({ message: 'No question parts found for this question' });
      }

      // Initialize counters for correct, incorrect, and total
      let correct = 0;
      let incorrect = 0;

      // Iterate through the question parts to compare is_suspicious and user_answered_suspicious
      questionParts.forEach(part => {
        if (part.is_suspicious === part.user_answered_suspicious) {
          correct += 1; // Increment correct if they match
        } else {
          incorrect += 1; // Increment incorrect if they don't match
        }
      });

      // Calculate accuracy score: (correct - incorrect) / total question parts
      const totalParts = questionParts.length;
      const accuracy = (correct - incorrect) / totalParts;

      req.accuracy = accuracy;
      console.log("Accuracy: ", accuracy)
      next() // call next middleware to update exp

    } catch (error) {
      console.error('Error calculating question score:', error);
      return res.status(500).json({
        message: 'Error calculating question score',
        error: error.message,
      });
    }
  };


exports.getQuestionCategoryId = async (req, res, next) => {
    const { questionId } = req.params;
    try {
      // Find the Question entry by its ID
      const question = await Question.findOne({
        where: { id: questionId },
        include: [{
          model: UserCategory,
          as: 'userCategory',  // Assuming 'userCategory' is the association alias in the Question model
          attributes: ['category_id'],  // Fetch the 'category_id' from UserCategory
        }]
      });

      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }

      console.log("question: ", question)

      // Access the category_id from the associated UserCategory
      const categoryId = question.userCategory.category_id;

      // Return the category_id
      req.categoryId = categoryId;
      console.log("Category Id: ", categoryId)
      next()

    } catch (error) {
      console.error('Error fetching question category Id:', error);
      return res.status(500).json({
        message: 'Error fetching question category Id',
        error: error.message,
      });
    }
  };
