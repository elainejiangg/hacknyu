const { QuestionPart, Feature } = require('../models'); // Adjust the path as needed

// I'm imagining that in the frontend, there will be some place to store the question Id and each of the placeholders
// will be marked with a question part Id
exports.flagQuestionPart = async (req, res) => {
    try {
      const { questionPartId } = req.params; // assuming questionPartId is passed in the URL params

      // Find the QuestionPart by its ID
      const questionPart = await QuestionPart.findOne({
        where: { id: questionPartId },
      });

      if (!questionPart) {
        return res.status(404).json({ message: 'Question part not found' });
      }

      // Update the user_answered_suspicious field to true
      questionPart.user_answered_suspicious = true;

      // Save the updated QuestionPart
      await questionPart.save();

      // Return a success response
      return res.status(200).json({ message: 'Question part flagged successfully' });

    } catch (error) {
      console.error('Error flagging question part:', error);
      return res.status(500).json({
        message: 'Error flagging question part',
        error: error.message,
      });
    }
  };




async function submitAnswer(userAnswer, userCategoryJunctionId) {
    // Step 1: Update the `QuestionPart` table with the user answers
    for (const categoryName in userAnswer) {
        if (userAnswer.hasOwnProperty(categoryName)) {
            await updateUserAnsweredSuspicious(categoryName, userAnswer);
        }
    }

    // Step 2: Calculate accuracy
    const accuracy = await calculateAccuracy(userCategoryJunctionId);

    // Step 3: Update the user's experience
    await updateUserCategoryExp(userCategoryJunctionId, accuracy);
}

async function updateUserAnsweredSuspicious(categoryName, userAnswer) {
    // Iterate over each feature in userAnswer and update the corresponding QuestionPart
    for (const featureName in userAnswer) {
        if (userAnswer.hasOwnProperty(featureName)) {
            // Get the feature based on its name
            const feature = await Feature.findOne({ where: { name: featureName } });

            if (feature) {
                await QuestionPart.update(
                    { user_answered_suspicious: userAnswer[featureName] },
                    { where: { feature_id: feature.id } }
                );
            }
        }
    }
}

async function calculateAccuracy(userCategoryJunctionId) {
    const result = await QuestionPart.findAll({
        attributes: [
            [sequelize.fn('SUM', sequelize.literal('user_answered_suspicious = is_suspicious')), 'correctCount'],
            [sequelize.fn('COUNT', sequelize.col('id')), 'totalCount'],
        ],
        include: [{
            model: UserCategory,
            where: { id: userCategoryJunctionId },
            required: true
        }]
    });

    const correctCount = parseInt(result[0].get('correctCount'), 10);
    const totalCount = parseInt(result[0].get('totalCount'), 10);

    if (totalCount === 0) return 0; // Prevent division by zero
    return correctCount / totalCount; // Accuracy as a fraction
}

async function updateUserCategoryExp(userCategoryJunctionId, accuracy) {
    const userCategory = await UserCategory.findOne({ where: { id: userCategoryJunctionId } });

    if (userCategory) {
        userCategory.exp += accuracy;
        await userCategory.save();
    }
}

exports.submitAnswer;

// async function submitAnswer(userAnswer, userCategoryJunctionId) {
//     // expect input userAnswer = {featureName: <bool>, featureName: <bool>, ...}

//     for categoryName in userAnswer:
//         MUTATE TABLE QuestionPart FIELD user_answered_suspicious TO userAnswer[categoryName]


//     const accuracy =
//     SELECT SUM(user_answered_suspicious===is_suspicious) / COUNT(*) AS accuracy
//     FROM UserCategory
//     WHERE id = userCategoryJunctionId

//     MUTATE TABLE userCategory exp TO exp + accuracy


// }
