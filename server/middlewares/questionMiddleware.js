const { UserCategory, Category, Feature } = require('../models');
const axios = require('axios');
require('dotenv').config({ path: '../.env' });

// category chosen should be weighted by user exp in each category and some amount of randomness
exports.getRandomCategoryForUser = async(req, res, next) => {
    try {
        console.log('i am in getrandomcategoryforuser')
        const userCategories = await UserCategory.findAll({
            where: {user_id: req.userId},
            include: [{
                model: Category,
                as: 'category',
                attributes: ['id', 'name']
            }]
        })

        if (userCategories.length === 0) {
            return res.status(404).json({ error: 'No categories associated with this user. User not registered properly.' });
        }

        // calculate a weighted score for each of the user categories based on exp
        const categoryScores = userCategories.map((userCategory) => {
            const exp = userCategory.exp;  // User's experience in this category
            const category = userCategory.category;

            // Random factor: The factor will be between 0.5 and 1.5 to introduce some randomness
            const randomness = Math.random() + 0.5;  // Randomness between 0.5 and 1.5

            // Calculate the weighted score based on the inverse of experience and randomness
            const score = (1 / (exp + 1)) * randomness;  // Lower exp = higher score

            return { category_id: category.id, score };
          });
        console.log('category scores: ', categoryScores)

        // find the max score to normalize the weights
        const maxScore = Math.max(...categoryScores.map(score => score.score));

        // Normalize the scores so they sum up to 1 (like probabilities)
        const normalizedScores = categoryScores.map((categoryScore) => {
            const normalizedScore = categoryScore.score / maxScore;
            return { category_id: categoryScore.category_id, normalizedScore };
        });
        console.log('normalized scores: ', normalizedScores)

        // Choose the next category based on the normalized score (weighted random choice)
        const totalScore = normalizedScores.reduce((sum, score) => sum + score.normalizedScore, 0);

        const randomSelection = Math.random() * totalScore;

        let accumulatedScore = 0;
        for (const category of normalizedScores) {
        accumulatedScore += category.normalizedScore;
        if (accumulatedScore >= randomSelection) {
            // Attach the selected category to the request object
            req.selectedCategoryId = category.category_id;
            // return res.status(200).json({ category: category })
            console.log('req.selectedCategoryId: ', req.selectedCategoryId)
            next();
            }
        }

    } catch (error) {
        console.error('Error fetching next category for user:', error);
        throw error;
    }
}


exports.getRandomFeaturesForCategory = async (req, res, next) => {
    try {
      console.log('i am in getrandomfeatures')
      const categoryId = req.selectedCategoryId;  // Category ID is already set by previous middleware

      // Fetch all features under the given category_id
      const allFeatures = await Feature.findAll({
        where: { category_id: categoryId }
      });

      if (allFeatures.length === 0) {
        req.features = {
          selected_feature_ids: [],
          selected_feature_names: [],
          non_selected_feature_ids: [],
          non_selected_feature_names: []
        };
        return res.status(404).json({ message: "No features were found." })  // Move to the next middleware or route handler
      }

      // Randomly determine how many features to select (between 1 and all available)
      const numToSelect = Math.floor(Math.random() * allFeatures.length) + 1;

      // Shuffle the features array randomly
      const shuffledFeatures = allFeatures.sort(() => Math.random() - 0.5);

      // Select the first `numToSelect` features from the shuffled array
      const selectedFeatures = shuffledFeatures.slice(0, numToSelect);
      const nonSelectedFeatures = shuffledFeatures.slice(numToSelect);

      req.features = {
        selected_feature_ids: selectedFeatures.map(feature => feature.id),
        selected_feature_names: selectedFeatures.map(feature => feature.name),
        non_selected_feature_ids: nonSelectedFeatures.map(feature => feature.id),
        non_selected_feature_names: nonSelectedFeatures.map(feature => feature.name)
      };
      console.log('req.features: ', req.features)

      next();  // Pass control to the next middleware or route handler
    } catch (error) {
      console.error('Error fetching random features:', error);
      return res.status(500).json({ message: 'Error fetching features' });
    }
  };


// actually generate the content
exports.generatePhishingContent = async (req, res, next) => {
  const category = await Category.findOne({ where: {id: req.selectedCategoryId} });
  const categoryName = category.name;
  const selectedFeatures = req.features.selected_feature_names;
  const unselectedFeatures = req.features.non_selected_feature_names;
  const apiKey = process.env.OPENAI_API_KEY;
  const prompt = await getPrompt(categoryName, selectedFeatures, unselectedFeatures);
  console.log('i generated a prompt')
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7
      })
  });

  if (!response.ok) {
      throw new Error("Failed to generate phishing email");
  }

  const data = await response.json();
  const phishingEmail = data.choices[0].message.content;
  return res.status(200).json(JSON.parse(phishingEmail));
}


async function getPrompt(categoryName, selectedFeatures, unselectedFeatures) {
  if (categoryName === "Email") {
      return `Generate a phishing email as a JSON object with the following structure:
{
"subject": { "text": "<email subject>", "suspicious": <true/false>, "reason": "<why it is suspicious if true>" },
"sender": { "text": "<email sender>", "suspicious": <true/false>, "reason": "<why it is suspicious if true>" },
"attachment": { "text": "<attachment details>", "suspicious": <true/false>, "reason": "<why it is suspicious if true>" },
"body": [
  { "text": "<sentence 1>", "suspicious": <true/false>, "reason": "<why it is suspicious if true>" },
  { "text": "<sentence 2>", "suspicious": <true/false>, "reason": "<why it is suspicious if true>" },
  ...
]
}
Ensure that the features in ${JSON.stringify(selectedFeatures)} are highly suspicious and provide explanations for why they are suspicious. Those in ${JSON.stringify(unselectedFeatures)} should be completely normal. The email should sound natural while aligning with these requirements.`;
  }

  else if (categoryName === "Text (SMS)") {
return `Generate a phishing text message as a JSON object with the following structure:
{
"sender": { "text": "<phone number or email address>", "suspicious": <true/false>, "reason": "<why it is suspicious if true>" },
"body": [
  { "text": "<sentence 1>", "suspicious": <true/false>, "reason": "<why it is suspicious if true>" },
  { "text": "<sentence 2>", "suspicious": <true/false>, "reason": "<why it is suspicious if true>" },
  ...
]
}
Ensure that the features in ${JSON.stringify(selectedFeatures)} are highly suspicious and provide explanations for why they are suspicious. Those in ${JSON.stringify(unselectedFeatures)} should be completely normal. The email should sound natural while aligning with these requirements.`;
  }

  else if (categoryName === "Website") {
return `Generate a phishing website as a JSON object with the following structure:
{
"url": { "text": "<website URL>", "suspicious": <true/false>, "reason": "<why it is suspicious if true>" },
"site_name": { "text": "<site name>", "suspicious": <true/false>, "reason": "<why it is suspicious if true>" }
}
Ensure that the features in ${JSON.stringify(selectedFeatures)} are highly suspicious and provide explanations for why they are suspicious. Those in ${JSON.stringify(unselectedFeatures)} should be completely normal. The email should sound natural while aligning with these requirements.`;
  }

  else {
      return "";
  }

}


// Example usage:
// const categoryName = "text"
// const selectedFeatures = ["subject", "attachment"];
// const unselectedFeatures = ["sender"];
// generatePhishingEmail(categoryName, selectedFeatures, unselectedFeatures)
//     .then(email => console.log(JSON.stringify(email, null, 2)))
//     .catch(err => console.error(err));





// async function generatePhishingEmail(selectedFeatures, unselectedFeatures) {
//     const apiKey = process.env.OPENAI_API_KEY;
//     const prompt = `Generate a phishing email as a JSON object with the following structure:
// {
//   "subject": { "text": "<email subject>", "suspicious": <true/false> },
//   "sender": { "text": "<email sender>", "suspicious": <true/false> },
//   "attachment": { "text": "<attachment details>", "suspicious": <true/false> },
//   "body": [
//     { "text": "<sentence 1>", "suspicious": <true/false> },
//     { "text": "<sentence 2>", "suspicious": <true/false> },
//     ...
//   ]
// }
// Ensure that the features in ${JSON.stringify(selectedFeatures)} are highly suspicious and those in ${JSON.stringify(unselectedFeatures)} are completely normal. The email should sound natural while aligning with these requirements.`;

//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${apiKey}`
//         },
//         body: JSON.stringify({
//             model: "gpt-4",
//             messages: [{ role: "user", content: prompt }],
//             temperature: 0.7
//         })
//     });

//     if (!response.ok) {
//         throw new Error("Failed to generate phishing email");
//     }

//     const data = await response.json();
//     const phishingEmail = data.choices[0].message.content;
//     return JSON.parse(phishingEmail);
// }

// // Example usage:
// const selectedFeatures = ["subject", "attachment"];
// const unselectedFeatures = ["sender"];
// generatePhishingEmail(selectedFeatures, unselectedFeatures)
//     .then(email => console.log(JSON.stringify(email, null, 2)))
//     .catch(err => console.error(err));
