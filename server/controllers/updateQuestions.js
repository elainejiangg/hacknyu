const { Question, QuestionPart, Feature } = require('../models'); // Adjust the path as needed

/**
 * Inserts a Question and related QuestionParts based on the given phishing email analysis.
 * @param {number} userCategoryJunctionId - The ID linking the question to a user category.
 * @param {object} emailData - The JSON object containing email components.
 * @returns {Promise} - Resolves when the operation is complete.
 */
async function createQuestionWithParts(userCategoryJunctionId, emailData) {
    try {
        // Create a new Question entry
        const question = await Question.create({
            user_category_junction_id: userCategoryJunctionId
        });

        const questionId = question.id;

        // Extract email features
        const emailParts = [
            { type: 'subject', data: emailData.subject },
            { type: 'sender', data: emailData.sender },
            { type: 'attachment', data: emailData.attachment },
            ...emailData.body.map((part, index) => ({
                type: `body_${index + 1}`,
                data: part
            }))
        ];

        const questionPartsData = [];

        for (const part of emailParts) {
            // Assuming feature_id is predefined for each type in the Feature table.
            const feature = await Feature.findOne({ where: { name: part.type } });

            if (!feature) {
                console.warn(`Feature not found for type: ${part.type}`);
                continue; // Skip if feature not found
            }

            questionPartsData.push({
                question_id: questionId,
                feature_id: feature.id,
                is_suspicious: part.data.suspicious,
                user_answered_suspicious: false // Default to false; user will update later
            });
        }

        // Bulk insert QuestionPart entries
        await QuestionPart.bulkCreate(questionPartsData);

        console.log('Question and related QuestionParts created successfully.');
        return question;
    } catch (error) {
        console.error('Error creating Question and QuestionParts:', error);
        throw error;
    }
}

module.exports = { createQuestionWithParts };
