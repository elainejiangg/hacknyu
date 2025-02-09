const { UserCategory, Category, Question } = require('../models');
// const axios = require('axios');
require('dotenv').config({ path: '../.env' });

// exports.generateQuestion = async (req, res) => {

//     // Access data from the middleware
//     const features = req.features;

//     try {
//         const selectedFeatureNames = features.selected_feature_names;
//         const nonSelectedFeatureNames = features.non_selected_feature_names;

//         // Send the response back with the selected features
//         res.status(200).json({
//           category,
//           selectedFeatureNames,
//           nonSelectedFeatureNames
//         });
//       } catch (error) {
//         console.error('Error generating question:', error);
//         res.status(500).json({ message: 'Error generating question' });
//       }
// }

exports.createQuestionWithParts = async (req, res, next) => {
    try {
        const userId = req.userId;
        const categoryId = req.selectedCategoryId;
        const userCategory = await UserCategory.findOne({ where: { user_id: userId, category_id: categoryId } })
        const userCategoryId = userCategory.id;
        const phishingContent = req.phishingContent;

        // Create a new Question entry
        const question = await Question.create({
            user_category_junction_id: userCategoryId
        });

        const questionId = question.id;

        // Create question parts
        for (const [key, value] of Object.entries(phishingContent)) {
            if (key === 'body' && Array.isArray(value)) {
                for (const sentence of value) {
                    const bodyFeature = awaitFeature.findOne({
                        where: {name: 'Message Body'},
                    });

                    if (!bodyFeature) {
                        return res.status(404).json({ message: 'Body feature not found' });
                    }
                }

                await questionPart.create({
                    question_id: questionId,
                    feature_id: bodyFeature.id,
                    is_suspicious: sentence.suspicious,
                    user_answered_suspicious: null,
                })
            } else if (value && typeof value === 'object' && value.text !== undefined) {
                const featureName = key.charAt(0).toUpperCase() + key.slice(1);

                const featureRecord = await featureName.findOne({
                    where: { name: featureName },
                })

                if (!featureRecord) {
                    return res.status(404).json({ message: `Feature ${featureName} not found` });
                }

                await questionPart.create({
                    question_id: questionId,
                    feature_id: featureRecord.id,
                    is_suspicious: value.suspicious,
                    user_answered_suspicious: null,
                })
            }
        }

        res.status(200).json({ message: 'Phishing content stored successfully in different question parts' })

    } catch (error) {
        console.error('Error creating question with parts:', error);
        res.status(500).json({ message: 'Error creating question with parts' });
      }
}


exports.getAllCategoryExps = async (req, res) => {
    const userId = req.userId;

    try {
        const userCategories = await UserCategory.findAll({
            where: { user_id: userId },
            include: [{
                model: Category,
                as: 'category',
                attributes: ['id', 'name']  // Fetching category details
            }]
        });

        // If no categories are found, return an appropriate message
        if (userCategories.length === 0) {
            return res.status(404).json({ message: 'No categories found for this user' });
        }

        // Prepare the result object containing category names and their corresponding exp values
        const categoryExps = userCategories.map(userCategory => ({
            categoryId: userCategory.category.id,
            categoryName: userCategory.category.name,
            exp: userCategory.exp
        }));

        // Return the results as a JSON response
        res.status(200).json(categoryExps);

    } catch (error) {
        console.error('Error getting all exps:', error);
        res.status(500).json({ message: 'Error getting all exps' });
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
        console.error('Error updating exp:', error);
        res.status(500).json({ message: 'Error updating exp' });
    }
}
