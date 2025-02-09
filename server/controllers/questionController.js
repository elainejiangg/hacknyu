const {  } = require('../models');
const { Sequelize } = require('sequelize');
// const axios = require('axios');
require('dotenv').config({ path: '../.env' });

console.log("OpenAI API Key:", process.env.OPENAI_API_KEY);

exports.generateQuestion = async (req, res) => {

    // Access data from the middleware
    const features = req.features;

    try {
        const selectedFeatureNames = features.selected_feature_names;
        const nonSelectedFeatureNames = features.non_selected_feature_names;

        // Send the response back with the selected features
        res.status(200).json({
          category,
          selectedFeatureNames,
          nonSelectedFeatureNames
        });
      } catch (error) {
        console.error('Error generating question:', error);
        res.status(500).json({ message: 'Error generating question' });
      }
}


// exports.generatePhishingEmail(selectedFeatureNames, nonSelectedFeatureNames) {
//     try {
//         // Construct the prompt to OpenAI
//         const prompt = `
//         Generate a realistic phishing email that tries to deceive the recipient.
//         - The email should contain the following features that can be used to detect it as a phishing attempt: ${selectedFeatureNames.join(', ')}.
//         - The email should NOT contain the following features, which should not be useful for detecting phishing: ${nonSelectedFeatureNames.join(', ')}.
//         - The email must have a main body that makes sense, trying to trick the user into clicking a link or providing sensitive information.

//         Example format:
//         ---
//         Subject: [Phishing Email Subject]

//         Dear [Victim's Name],

//         [Main body of the email, incorporating selected phishing indicators.]

//         Best regards,
//         [Fake Sender's Name]
//         ---
//         `;

//         // Call OpenAI API
//         const response = await axios.post(
//             "https://api.openai.com/v1/chat/completions",
//             {
//                 model: "gpt-4",
//                 messages: [{ role: "system", content: prompt }],
//                 max_tokens: 300
//             },
//             {
//                 headers: {
//                     "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
//                     "Content-Type": "application/json"
//                 }
//             }
//         );

//         // Extract generated email text
//         const phishingEmail = response.data.choices[0].message.content.trim();
//         return phishingEmail;

//     } catch (error) {
//         console.error("Error generating phishing email:", error.response ? error.response.data : error.message);
//         throw error;
//     }
// }
