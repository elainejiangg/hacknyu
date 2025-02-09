const { QuestionPart, UserCategory } = require('../models'); // Adjust the path as needed

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
      return res.status(200).json({ message: 'Question part flagged successfully', questionPart: questionPart });

    } catch (error) {
      console.error('Error flagging question part:', error);
      return res.status(500).json({
        message: 'Error flagging question part',
        error: error.message,
      });
    }
  };


// there should be middleware for submitting the response
exports.updateCategoryExp = async (req, res) => {
    const { accuracy, categoryId, userId } = req; // Assuming accuracy, categoryId, and userId are passed in the request body
    console.log("In updateCategoryExp: ", accuracy, categoryId, userId)

    try {
      // Fetch the current UserCategory entry for the user and the category
      const userCategory = await UserCategory.findOne({
        where: { user_id: userId, category_id: categoryId },
      });

      if (!userCategory) {
        return res.status(404).json({ message: 'User not found in the specified category' });
      }

      // Calculate the new exp based on the accuracy score
      // Assuming accuracy is a decimal between 0 and 1
      const expIncrease = Math.round(accuracy * 10);

      // Increment the user's exp by the calculated increase
      userCategory.exp += expIncrease;

      // Save the updated UserCategory record
      await userCategory.save();

      // Return success response
      return res.status(200).json({
        message: 'User experience updated successfully',
        newExp: userCategory.exp,
      });

    } catch (error) {
      console.error('Error updating exp:', error);
      return res.status(500).json({
        message: 'Error updating exp',
        error: error.message,
      });
    }
  };
