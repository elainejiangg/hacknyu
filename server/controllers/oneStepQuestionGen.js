const axios = require('axios');
require('dotenv').config({ path: '../.env' });

async function generatePhishingContent(selectedFeatures, unselectedFeatures) {
    const apiKey = process.env.OPENAI_API_KEY;
    const prompt = 
    `Generate a phishing email as a JSON object with the following structure:
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
    return JSON.parse(phishingEmail);
}

exports.generatePhishingContent;

// Example usage:
// const selectedFeatures = ["subject", "attachment"];
// const unselectedFeatures = ["sender"];
// generatePhishingEmail(selectedFeatures, unselectedFeatures)
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

