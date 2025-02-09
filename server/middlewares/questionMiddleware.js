const {
  UserCategory,
  Category,
  Feature,
  Question,
  QuestionPart,
} = require("../models");
const axios = require("axios");
require("dotenv").config({ path: "../.env" });

// category chosen should be weighted by user exp in each category and some amount of randomness
exports.getRandomCategoryForUser = async (req, res, next) => {
  try {
    console.log("i am in getrandomcategoryforuser");
    const userCategories = await UserCategory.findAll({
      where: { user_id: req.userId },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
    });

    if (userCategories.length === 0) {
      return res.status(404).json({
        error:
          "No categories associated with this user. User not registered properly.",
      });
    }

    // calculate a weighted score for each of the user categories based on exp
    const categoryScores = userCategories.map((userCategory) => {
      const exp = userCategory.exp; // User's experience in this category
      const category = userCategory.category;

      // Random factor: The factor will be between 0.5 and 1.5 to introduce some randomness
      const randomness = Math.random() + 0.5; // Randomness between 0.5 and 1.5

      // Calculate the weighted score based on the inverse of experience and randomness
      const score = (1 / (exp + 1)) * randomness; // Lower exp = higher score

      return { category_id: category.id, score };
    });
    console.log("category scores: ", categoryScores);

    // find the max score to normalize the weights
    const maxScore = Math.max(...categoryScores.map((score) => score.score));

    // Normalize the scores so they sum up to 1 (like probabilities)
    const normalizedScores = categoryScores.map((categoryScore) => {
      const normalizedScore = categoryScore.score / maxScore;
      return { category_id: categoryScore.category_id, normalizedScore };
    });
    console.log("normalized scores: ", normalizedScores);

    // Choose the next category based on the normalized score (weighted random choice)
    const totalScore = normalizedScores.reduce(
      (sum, score) => sum + score.normalizedScore,
      0
    );

    const randomSelection = Math.random() * totalScore;

    let accumulatedScore = 0;
    for (const category of normalizedScores) {
      accumulatedScore += category.normalizedScore;
      if (accumulatedScore >= randomSelection) {
        // Attach the selected category to the request object
        req.selectedCategoryId = category.category_id;
        // return res.status(200).json({ category: category })
        console.log("req.selectedCategoryId: ", req.selectedCategoryId);
        return next();
      }
    }
  } catch (error) {
    console.error("Error fetching next category for user:", error);
    return next(error);
  }
};

exports.getRandomFeaturesForCategory = async (req, res, next) => {
  console.log("i am in getRandomFeaturesForCategory");
  try {
    console.log("Selected Category ID:", req.selectedCategoryId);

    // Fetch all features under the given category_id
    const features = await Feature.findAll({
      where: {
        category_id: req.selectedCategoryId,
      },
    });

    console.log("Found features:", features);

    if (!features || features.length === 0) {
      return res.status(404).json({
        message: "No features were found.",
        debug: {
          categoryId: req.selectedCategoryId,
          featuresCount: features ? features.length : 0,
        },
      });
    }

    // Randomly determine how many features to select (between 1 and all available)
    const numToSelect = Math.floor(Math.random() * features.length) + 1;
    console.log("Num features selected: ", numToSelect)

    // Shuffle the features array randomly
    const shuffledFeatures = features.sort(() => Math.random() - 0.5);

    // Select the first `numToSelect` features from the shuffled array
    const selectedFeatures = shuffledFeatures.slice(0, numToSelect);
    const nonSelectedFeatures = shuffledFeatures.slice(numToSelect);

    req.features = {
      selected_feature_ids: selectedFeatures.map((feature) => feature.id),
      selected_feature_names: selectedFeatures.map((feature) => feature.name),
      non_selected_feature_ids: nonSelectedFeatures.map(
        (feature) => feature.id
      ),
      non_selected_feature_names: nonSelectedFeatures.map(
        (feature) => feature.name
      ),
    };
    console.log("req.features in getRandomFeaturesForCategory: ", req.features);

    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    console.error("Error fetching random features:", error);
    next(error);
  }
};

// actually generate the content
exports.generatePhishingContent = async (req, res, next) => {
  try {
    // Check for API key first
    const apiKey = process.env.OPENAI_API_KEY;
    console.log("API Key exists and starts with:", apiKey?.substring(0, 7));

    if (!apiKey) {
      console.error("OpenAI API key is missing!");
      return res.status(500).json({
        message: "Server configuration error - API key missing",
        error: "OPENAI_API_KEY not found in environment variables",
      });
    }

    // Fetch category by id
    const category = await Category.findOne({
      where: { id: req.selectedCategoryId },
    });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const categoryName = category.name;
    console.log("Category found:", categoryName);

    // Extract selected and unselected features
    console.log("req.features in generatePhishingContent: ", req.features);
    console.log(
      "req.features.selected_feature_names: ",
      req.features.selected_feature_names
    );
    console.log(
      "req.features.non_selected_feature_names: ",
      req.features.non_selected_feature_names
    );
    const selectedFeatures = req.features.selected_feature_names;
    const unselectedFeatures = req.features.non_selected_feature_names;

    // generate prompt for OpenAI to request multiple features
    const prompt = await getPrompt(categoryName, selectedFeatures, unselectedFeatures)

    // Send request to OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API Error:", errorData);
      return res.status(500).json({
        message: "Failed to generate phishing content",
        error: errorData,
      });
    }

    // Parse the response from OpenAI with error handling
    const data = await response.json();
    let parsedContent;
    try {
      const phishingContent = data.choices[0].message.content.trim();
      console.log("Raw GPT response:", phishingContent);
      parsedContent = JSON.parse(phishingContent);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.log("Received content:", data.choices[0].message.content);
      return res.status(500).json({
        message: "Failed to parse GPT response",
        error: parseError.message,
        rawContent: data.choices[0].message.content,
      });
    }

    console.log("Generated content:", parsedContent);

    // Get user category
    const userId = req.userId;
    const categoryId = req.selectedCategoryId;
    const userCategory = await UserCategory.findOne({
      where: { user_id: userId, category_id: categoryId },
    });

    // Create the question
    const question = await Question.create({
      user_category_junction_id: userCategory.id,
      question_content: parsedContent,
    });

    console.log("Question: ", question)

    req.questionId = question.id;
    req.questionContent = question.question_content;
    console.log('I am here')
    next();

  } catch (error) {
    console.error("Error generating phishing content:", error);
    return res.status(500).json({
      message: "Error in phishing content generation",
      error: error.message,
    });
  }
};

async function getPrompt(categoryName, selectedFeatures, unselectedFeatures) {
  if (categoryName === "Email") {
    return `Generate a phishing email as a JSON object with the following structure:
{
"type": "Email",
"subject": { "text": "<email subject>", "suspicious": <true/false>, "reason": "<why it is suspicious if true>" },
"sender": { "text": "<email sender>", "suspicious": <true/false>, "reason": "<why it is suspicious if true>" },
"attachment": { "text": "<attachment details>", "suspicious": <true/false>, "reason": "<why it is suspicious if true>" },
"body": [
  { "text": "<sentence 1>", "suspicious": <true/false>, "reason": "<why it is suspicious if true>" },
  { "text": "<sentence 2>", "suspicious": <true/false>, "reason": "<why it is suspicious if true>" },
  ...
]
}
Ensure that the features in ${JSON.stringify(
      selectedFeatures
    )} are highly suspicious and provide explanations for why they are suspicious. Those in ${JSON.stringify(
      unselectedFeatures
    )} should be completely normal. The email should sound natural while aligning with these requirements.`;
  } else if (categoryName === "Text (SMS)") {
    return `Generate a phishing text message as a JSON object with the following structure:
{
"type": "Text (SMS)",
"sender": { "text": "<phone number or email address>", "suspicious": <true/false>, "reason": "<why it is suspicious if true>" },
"body": [
  { "text": "<sentence 1>", "suspicious": <true/false>, "reason": "<why it is suspicious if true>" },
  { "text": "<sentence 2>", "suspicious": <true/false>, "reason": "<why it is suspicious if true>" },
  ...
]
}
Ensure that the features in ${JSON.stringify(
      selectedFeatures
    )} are highly suspicious and provide explanations for why they are suspicious. Those in ${JSON.stringify(
      unselectedFeatures
    )} should be completely normal. The email should sound natural while aligning with these requirements.`;
  } else if (categoryName === "Website") {
    return `Generate a phishing website as a JSON object with the following structure:
{
"type": "Website",
"url": { "text": "<website URL>", "suspicious": <true/false>, "reason": "<why it is suspicious if true>" },
"site_name": { "text": "<site name>", "suspicious": <true/false>, "reason": "<why it is suspicious if true>" }
}
Ensure that the features in ${JSON.stringify(
      selectedFeatures
    )} are highly suspicious and provide explanations for why they are suspicious. Those in ${JSON.stringify(
      unselectedFeatures
    )} should be completely normal. The email should sound natural while aligning with these requirements.`;
  } else {
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


// const prompt = `Generate a phishing ${categoryName} message with at least 3 different suspicious elements.
//     Return ONLY a JSON object with this exact structure, no additional text:
//     {
//       "content": "your phishing message here",
//       "features": [
//         {
//           "content": "first suspicious part from the message",
//           "reason": "explanation of why this part is suspicious",
//           "is_suspicious": true
//         },
//         {
//           "content": "second suspicious part from the message",
//           "reason": "explanation of why this part is suspicious",
//           "is_suspicious": true
//         },
//         {
//           "content": "third suspicious part from the message",
//           "reason": "explanation of why this part is suspicious",
//           "is_suspicious": true
//         }
//       ]
//     }

//     Ensure that the features in ${JSON.stringify(
//       selectedFeatures
//     )} are highly suspicious and provide explanations for why they are suspicious.
//     Those in ${JSON.stringify(unselectedFeatures)} should be completely normal.
//     The message should sound natural while aligning with these requirements.

//     Each feature should identify a different suspicious element (like urgency, generic greeting, poor grammar, suspicious links, etc).
//     The response must be valid JSON. Do not include any text outside the JSON object.`;
