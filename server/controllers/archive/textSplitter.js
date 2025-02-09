const axios = require('axios');
require('dotenv').config({ path: '../.env' });

async function splitAndAnalyzePhishingContent(text) {
    try {
        // Step 1: Split the text into sentences
        const splitPrompt = `
        Given the following text, remove sender, subject, and attachment, then split it into a list of distinct sentences. Ensure that key structural elements like the **Subject, Sender, and Attachments** are treated as separate sentences. Preserve the logical flow of the text, and separate based on meaning rather than just punctuation.

        Now, process the following text and return a structured list:
        ${text}
        `;

        const splitResponse = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [{ role: "user", content: splitPrompt }],
                max_tokens: 1000
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        let sentences;
        try {
            sentences = JSON.parse(splitResponse.data.choices[0].message.content.trim());
        } catch (e) {
            console.error("Failed to parse sentence list, falling back to manual splitting.");
            sentences = splitResponse.data.choices[0].message.content.trim().split("\n").map(sentence => sentence.trim()).filter(sentence => sentence);
        }

        console.log("Sentences:", sentences);

        // Step 2: Analyze each sentence for phishing suspicion
        const analysisPrompt = `
        Given the following sentences from an email or message, classify each one as **"Suspicious"** or **"Not Suspicious"**. Suspicious content includes:
        - Urgent or manipulative language
        - Requests for personal information or immediate action
        - Unusual sender or attachment descriptions
        - Fake links or security warnings

        Return the result as a JSON list of booleans, where **true** means the sentence is suspicious, and **false** means it is not.

        ### Example Input:
        [
          "Subject: Urgent: Security Update Required to Continue Service",
          "From: TechSupport@myservice.zone.com",
          "Dear esteemed customer,",
          "We hope this message finds you well.",
          "Please download and follow the instructions in 'Security_Update.pdf'.",
          "Failure to complete this update might lock you out from accessing our services.",
          "Thank you,",
          "Tech Support - MyService"
        ]

        ### Expected Output:
        [true, true, false, false, true, true, false, false]

        Now, analyze the following sentences:
        ${JSON.stringify(sentences)}
        `;

        const analysisResponse = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [{ role: "user", content: analysisPrompt }],
                max_tokens: 500
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        let suspicionScores;
        try {
            suspicionScores = JSON.parse(analysisResponse.data.choices[0].message.content.trim());
        } catch (e) {
            console.error("Failed to parse suspicion scores, falling back to manual parsing.");
            suspicionScores = analysisResponse.data.choices[0].message.content.trim().split("\n").map(line => line.toLowerCase().includes("true"));
        }

        console.log("Suspicion Scores:", suspicionScores);
        return { sentences, suspicionScores };

    } catch (error) {
        console.error("Error processing phishing content:", error.response ? error.response.data : error.message);
        throw error;
    }
}

// Example usage:
(async () => {
    const emailText = `
**Sender:** Security_Team@YourBanknetweok.com 

**Subject:** LAST REMINDER: Important Update Required for Your Account Security

Dear Customer,

We hope this email finds you well. We are writing to you regarding an urgent matter about your bank account security at Our Bank.

Recent attempts of unauthorized access to multiple accounts have been detected in our system. Though we have taken every necessary precaution to safeguard your details, we believe it is better to be safe than sorry.

As such, we have developed a new security update specifically designed to protect your personal information and boost your account's resilience against external threats. This update has been approved by our security specialists, and it's pertinent for all users to install it at their earliest convenience.  

Attached to this email is a document named "Security_Update_Beta.exe". This executable file contains the setup for the required update. Please ensure to run this update on the same device you use for online banking, to ensure maximum protection of your sensitive data.

We understand the trust you put in us and your security matters are our top concern. Any delay in applying this update might result in vulnerability to your account, so we encourage you to open the document attached and follow the step-by-step guidance provided.

We greatly appreciate your immediate attention to this matter. If you encounter any issues during the installation process, do not hesitate to reply to this email. Our customer service team is available around the clock and at your service for any questions you might have.

Thank you for trusting Our Bank. Together, we can ensure a safer banking experience for you.

Best Regards,
Your Bank Security Team

Attachment: Security_Update_Beta.exe
    `;

    try {
        const { sentences, suspicionScores } = await splitAndAnalyzePhishingContent(emailText);
        console.log("Final Output:");
        console.log(sentences.map((sentence, idx) => `[${suspicionScores[idx] ? "❌ Suspicious" : "✅ Not Suspicious"}] ${sentence}`).join("\n"));
    } catch (error) {
        console.error("Failed to process text.");
    }
})();
