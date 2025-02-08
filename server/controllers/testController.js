require('dotenv').config({ path: '../.env' });
console.log("OpenAI API Key:", process.env.OPENAI_API_KEY);

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

selectedFeatureNames = ['greetings', 'introduction', 'problem/message'];
nonSelectedFeatureNames = ['call-to-action', 'links/resources', 'contact'];
phishingEmail = generatePhishingEmail(selectedFeatureNames, nonSelectedFeatureNames)
console.log(phishingEmail);