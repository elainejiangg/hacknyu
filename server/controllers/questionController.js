const { UserCategory, Category, QuestionPart, Feature } = require('../models');
// const axios = require('axios');
require("dotenv").config({ path: "../.env" });

exports.createQuestionWithParts = async (req, res, next) => {
    try {
        const questionId = req.questionId
        const questionContent = req.questionContent

        let order = 1;

      // Function to create QuestionPart for a given content and feature name
      const createQuestionPart = async (content, order) => {
        return await QuestionPart.create({
          question_id: questionId,
          is_suspicious: content.suspicious,
          reason: content.reason,
          user_answered_suspicious: false,
          order: order,
        });
      };

      // Loop through each key in phishingContent, excluding 'type'
      for (const [key, value] of Object.entries(questionContent)) {
        if (key === 'type') continue; // Skip 'type' field

        if (Array.isArray(value)) {
          // If it's an array (e.g., body), treat each sentence as a separate part
          if (key === 'body') {
            for (const sentence of value) {
              await createQuestionPart(sentence, order);
              order += 1;
            }
          }
        } else if (value && typeof value === 'object') {
          // If it's an object (e.g., subject, sender, attachment), create a question part
          await createQuestionPart(value, order);
          order += 1;
        }
      }

      res.status(200).json({ message: 'Phishing content stored successfully in different question parts' });

    } catch (error) {
      console.error('Error creating question with parts:', error);
      return res.status(500).json({
        message: 'Error creating question with parts',
        error: error.message,
      });
    }
  };


  exports.getQuestionParts = async (req, res, next) => {
    const { questionId } = req.params;  // Get the questionId from request parameters

    try {
      // Fetch all question parts associated with the question_id and order by 'order'
      const questionParts = await QuestionPart.findAll({
        where: { question_id: questionId },
        order: [['order', 'ASC']],             // Order by the 'order' field in ascending order
      });

      if (questionParts.length === 0) {
        return res.status(404).json({ message: 'No question parts found for this question' });
      }

      // Send the list of question parts as a response
      return res.status(200).json({ questionParts });

    } catch (error) {
      console.error('Error fetching question parts:', error);
      return res.status(500).json({
        message: 'Error fetching question parts',
        error: error.message,
      });
    }
  };


exports.getAllCategoryExps = async (req, res) => {
  const userId = req.userId;

  try {
    let userCategories = await UserCategory.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
    });

    // If no categories exist, create default ones
    if (userCategories.length === 0) {
      const defaultCategories = [
        { id: 1, name: "Website" },
        { id: 2, name: "Text" },
        { id: 3, name: "Email" },
      ];

      // Create UserCategory entries for each default category
      const createPromises = defaultCategories.map((cat) =>
        UserCategory.create({
          user_id: userId,
          category_id: cat.id,
          exp: 0,
        })
      );

      await Promise.all(createPromises);

      // Fetch the newly created categories
      userCategories = await UserCategory.findAll({
        where: { user_id: userId },
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["id", "name"],
          },
        ],
      });
    }

    const categoryExps = userCategories.map((userCategory) => ({
      categoryId: userCategory.category.id,
      categoryName: userCategory.category.name,
      exp: userCategory.exp,
    }));

    res.status(200).json(categoryExps);
  } catch (error) {
    console.error("Error getting all exps:", error);
    res.status(500).json({ message: "Error getting all exps" });
  }
};


// there should be middleware for submitting the response
exports.updateCategoryExp = async (req, res) => {
  const userId = req.userId;
  const { categoryId } = req.params;
  // middleware runs before this
  // req.accuracy

  try {
  } catch (error) {
    console.error("Error updating exp:", error);
    res.status(500).json({ message: "Error updating exp" });
  }
};
