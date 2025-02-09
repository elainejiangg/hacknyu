const axios = require('axios');
require('dotenv').config({ path: '../.env' });

async function generatePhishingContent(categoryName, selectedFeatureNames, nonSelectedFeatureNames) {
    try {
        // Construct a fully optimized prompt ensuring feature presence and attachment inclusion
        const prompt = await getprompt(categoryName, selectedFeatureNames, nonSelectedFeatureNames);
        console.log(prompt);

        // Call OpenAI API
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [{ role: "system", content: prompt }],
                max_tokens: 500
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
        console.error("Error generating phishing content:", error.response ? error.response.data : error.message);
        throw error;
    }
}

// exports.generatePhishingEmail;


async function getprompt(categoryName, selectedFeatureNames, nonSelectedFeatureNames) {
    if (categoryName === "email") {
        return `
        Generate a **realistic and deceptive phishing email** that smoothly integrates **both suspicious and normal elements**.

        **Requirements:**
        - The email **must include one or multiple attachment in the end. Represent ths by writing out the document name(S) in the end**.
        - The email **must contain all features from**:  
        **Suspicious features:** ${selectedFeatureNames.join(', ')}  
        **Normal features:** ${nonSelectedFeatureNames.join(', ')}
        - Each sentence in the email body must be **either highly suspicious or completely normal**, depending on the feature it represents.
        - **DO NOT** use structured headers like "Message" or "Contact". The email must flow naturally.
        - **Make the attachment sound highly important**, using a **filename that seems trustworthy yet potentially dangerous** (e.g., \"Security_Update.pdf\" or \"Account_Review.exe\").
        - If the **attachment is/are suspicious**, describe it in a way that makes it seem **critical but slightly alarming**.
        - The **sender should sound legitimate but have subtle red flags**, such as an unusual email format or slight inconsistencies.

        ---
        **Guidelines for Suspicious Features (${selectedFeatureNames.join(', ')}):**
        ${selectedFeatureNames.map(feature => `- If the feature is **"${feature}"**, make it sound **urgent, manipulative, or deceptive**. It should pressure the recipient into quick action.`).join('\n')}

        ---
        **Guidelines for Normal Features (${nonSelectedFeatureNames.join(', ')}):**
        ${nonSelectedFeatureNames.map(feature => `- If the feature is **"${feature}"**, make it sound **entirely professional, standard, and trustworthy**. This adds credibility to the email.`).join('\n')}

        ---
        **Final Email:**  
        Generate a **cohesive, flowing phishing email** based on the requirements above.
        The email **must contain an attachment and refer to it in a convincing way**.
        `;
    } else if (categoryName === "text") {
        return `
        Generate a realistic and deceptive phishing text message that smoothly integrates both suspicious and normal elements.

        ### Requirements:
        - The message **must not contain any attachments**, but it should **urge the recipient to click a link** or **take an action quickly**.
        - The text message **must contain all features from**:  
        **Suspicious features:** \${selectedFeatureNames.join(', ')}  
        **Normal features:** \${nonSelectedFeatureNames.join(', ')}
        - Each sentence in the message must be **either highly suspicious or completely normal**, depending on the feature it represents.
        - **DO NOT** use any structured labels like "Message" or "From:". The text should feel **casual and natural**, similar to how companies or individuals send alerts.
        - If the **message includes a link**, it should **sound critical yet slightly alarming**. The link **must look slightly off**, like a convincing typo (e.g., \`my-bank-security.com\` instead of \`mybank.com\`).
        - The **sender should sound legitimate** but contain subtle red flags, such as an **unusual phone number, slight grammatical errors, or an overly generic tone**.

        ---

        ### Guidelines for Suspicious Features (\${selectedFeatureNames.join(', ')}):
        \${selectedFeatureNames.map(feature => \`- If the feature is **"\${feature}"**, make it sound **urgent, manipulative, or deceptive**. It should pressure the recipient into quick action.\`).join('\\n')}

        ---

        ### Guidelines for Normal Features (\${nonSelectedFeatureNames.join(', ')}):
        \${nonSelectedFeatureNames.map(feature => \`- If the feature is **"\${feature}"**, make it sound **entirely professional, standard, and trustworthy**. This adds credibility to the message.\`).join('\\n')}

        ---

        ### Final Text Message:
        Generate a **cohesive, flowing phishing text message** based on the requirements above.  
        The message **must feel convincing and natural while maintaining a balance between suspicion and legitimacy**. It should **encourage the recipient to take urgent action**, such as clicking a link, verifying their identity, or calling a number.
        `;

    } else return "";
}


// (async () => {
//     const selectedFeatureNames = ['sender'];
//     const nonSelectedFeatureNames = ['subject', 'attachment'];
//     const categoryName = "email"

//     try {
//         const phishingEmail = await generatePhishingContent(categoryName, selectedFeatureNames, nonSelectedFeatureNames);
//         console.log(phishingEmail); // ✅ Now prints the actual generated text
//     } catch (error) {
//         console.error("Failed to generate phishing email.");
//     }
// })();