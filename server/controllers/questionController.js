const {  } = require('../models');
const { Sequelize } = require('sequelize');
// const axios = require('axios');
require('dotenv').config({ path: '../.env' });

console.log("OpenAI API Key:", process.env.OPENAI_API_KEY);

exports.generateQuestion = async (req, res) => {

    const userId = req.session.passport.user;

    const category = await getRandomCategoryForUser(userId);
    const categoryId = category['category_id'];

    const features = await getRandomFeaturesForCategory(categoryId);
    const selectedFeatureNames = features['selected_feature_names'];
    const nonSelectedFeatureNames = features['non_selected_feature_names'];


}

async function getRandomFeaturesForCategory(categoryId) {
    try {
        // Fetch all features under the given category_id
        const allFeatures = await Feature.findAll({
            where: { category_id: categoryId }
        });

        if (allFeatures.length === 0) {
            return {
                selected_feature_ids: [],
                selected_feature_names: [],
                non_selected_feature_ids: [],
                non_selected_feature_names: []
            }; // Return empty lists if no features exist
        }

        // Randomly determine how many features to select (between 1 and all available)
        const numToSelect = Math.floor(Math.random() * allFeatures.length) + 1; 

        // Shuffle the features array randomly
        const shuffledFeatures = allFeatures.sort(() => Math.random() - 0.5);

        // Select the first `numToSelect` features from the shuffled array
        const selectedFeatures = shuffledFeatures.slice(0, numToSelect);
        const nonSelectedFeatures = shuffledFeatures.slice(numToSelect);

        return {
            selected_feature_ids: selectedFeatures.map(feature => feature.id),
            selected_feature_names: selectedFeatures.map(feature => feature.name),
            non_selected_feature_ids: nonSelectedFeatures.map(feature => feature.id),
            non_selected_feature_names: nonSelectedFeatures.map(feature => feature.name)
        };
    } catch (error) {
        console.error('Error fetching random features:', error);
        throw error;
    }
}



async function getRandomFeaturesForCategory(categoryId) {
    try {
        // Get the total number of features available under the given category_id
        const totalFeatures = await Feature.count({
            where: { category_id: categoryId }
        });

        if (totalFeatures === 0) {
            return null; // No features available in this category
        }

        // Randomly decide how many features to select (between 1 and totalFeatures)
        const numToSelect = Math.floor(Math.random() * totalFeatures) + 1; 

        // Fetch random features using ORDER BY RAND() and LIMIT numToSelect
        const features = await Feature.findAll({
            where: { category_id: categoryId },
            order: Sequelize.literal('RAND()'),
            limit: numToSelect
        });

        return features.map(feature => ({
            feature_id: feature.id,
            feature_name: feature.name
        }));
    } catch (error) {
        console.error('Error fetching random features:', error);
        throw error;
    }
}

async function generatePhishingEmail(selectedFeatureNames, nonSelectedFeatureNames) {
    try {
        // Construct the prompt to OpenAI
        const prompt = `
        Generate a realistic phishing email that tries to deceive the recipient. 
        - The email should contain the following features that can be used to detect it as a phishing attempt: ${selectedFeatureNames.join(', ')}.
        - The email should NOT contain the following features, which should not be useful for detecting phishing: ${nonSelectedFeatureNames.join(', ')}.
        - The email must have a main body that makes sense, trying to trick the user into clicking a link or providing sensitive information.

        Example format:
        ---
        Subject: [Phishing Email Subject]
        
        Dear [Victim's Name],
        
        [Main body of the email, incorporating selected phishing indicators.]

        Best regards,
        [Fake Sender's Name]
        ---
        `;

        // Call OpenAI API
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [{ role: "system", content: prompt }],
                max_tokens: 300
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        // Extract generated email text
        const phishingEmail = response.data.choices[0].message.content.trim();
        return phishingEmail;

    } catch (error) {
        console.error("Error generating phishing email:", error.response ? error.response.data : error.message);
        throw error;
    }
}

// module.exports = generatePhishingEmail;
