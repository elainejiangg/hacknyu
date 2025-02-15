# Phabulous Phishes

**Phabulous Phishes** is a fun and interactive game designed to help users improve their ability to recognize phishing content. It uses a gamified system where players practice identifying suspicious elements in emails, text messages, and websites (with ads to be added in the future). 

The game tracks players' **experience points (exp)** in different categories and features, dynamically adjusting the content they see based on their exp. The less experience a player has in a category, the more likely they are to see content related to it, ensuring they get the practice they need. However, to keep the experience varied and engaging, the questions are still presented randomly, so everything gets a chance to be practiced.

## Table of Contents

- [Inspiration](#inspiration)
- [What it does](#what-it-does)
- [How we built it](#how-we-built-it)
- [Accomplishments we're proud of](#accomplishments-we're-proud-of)
- [What we learned](#what-we-learned)
- [What's next for Phabulous Phishes](#whats-next-for-phabulous-phishes)

## Inspiration

The inspiration for *Phabulous Phishes* comes from the growing need for effective phishing education. While phishing awareness is increasing, distinguishing subtle phishing signs can be a challenge for many users. We wanted to create an educational platform that makes learning about phishing accessible, engaging, and fun. By turning it into a game, we can help users build real-world skills while enjoying the process.

## What it does

*Phabulous Phishes* is an educational game where users practice identifying phishing attempts. The content is divided into three main categories:
- **Emails**
- **Text messages**
- **Websites** (ads coming soon)

Each category includes elements that are commonly found in phishing content, such as suspicious sender addresses, unusual email subjects, deceptive URLs, and alarming text in the body of messages. 

Players gain **experience points (exp)** as they answer questions correctly. The game uses an algorithm to track their experience with different categories and features. The less experience the player has in a category, the more likely they are to be served that content. This ensures that users practice areas where they need the most improvement, while still giving all categories and features a fair chance to appear.

Players do not have a formal leveling system yet (this is a planned feature for the future), but their experience points guide the type of questions they receive, helping them grow their skills over time.

## How we built it

We used the following technologies to build *Phabulous Phishes*:
- **Frontend:** Built with **Next.js** and **Tailwind CSS** for a responsive, modern UI.
- **Backend:** Powered by **Node.js** and **PostgreSQL**, with **Sequelize** as the ORM.
- **AI:** We used **OpenAI** to generate phishing content. The content is structured into parts (e.g., sender, subject, body, URL) and labeled as suspicious or not.

The game includes an algorithm that generates phishing content dynamically based on the player’s experience, ensuring they are always challenged in areas where they need improvement.

## Accomplishments we're proud of

- **Dynamic content generation based on experience:** We are particularly proud of the algorithm we developed that adjusts the content based on the player’s experience. This personalized approach makes the game both fun and effective.
- **Fish-themed UI:** The playful fish theme adds a fun, relatable element to the game. Users progress through levels by escaping the hook, making the experience light-hearted while reinforcing the educational aspect.
- **AI-driven phishing content:** The use of OpenAI to generate structured phishing content is a unique feature, as it allows players to get feedback on their performance and track progress as they learn.

## What we learned

- **AI-driven content generation:** We focused on prompt engineering to generate structured phishing scenarios (email, SMS text, website) that aligned with our educational goals. The challenge was ensuring these scenarios could be parsed correctly and integrated into the frontend for a smooth user experience.
- **Backend integration:** A major challenge was integrating OpenAI's responses into the backend, ensuring that everything ran in order. Debugging asynchronous API calls with multiple middleware proved to be difficult, as the interactions between the different layers of the backend were complex and required careful synchronization.
- **Gamification in education:** We learned how to balance fun and learning by creating a personalized content delivery system based on user experience.

## What's next for Phabulous Phishes

- **New categories:** We plan to introduce additional categories, such as **social media posts** and **ads**, to expand the game’s coverage of phishing scenarios.
- **Multiplayer mode:** We're considering adding a multiplayer feature where players can compete or cooperate to identify phishing content faster.
- **Enterprise training modules:** We plan to integrate *Phabulous Phishes* into enterprise-level training, helping companies educate employees on recognizing phishing attempts.
- **AI model improvement:** We aim to further train and fine-tune our AI model to generate even more realistic and diverse phishing content.
- **Leveling system:** We are planning to implement a full-fledged leveling system, where players can unlock new difficulty levels and challenges as they progress.

## Contributing

We welcome contributions to *Phabulous Phishes*! If you’d like to contribute, feel free to open an issue or submit a pull request. Please ensure that your code follows our code style guidelines and that all tests pass.

---

**Phabulous Phishes** is constantly evolving, and we’re excited to see how it can help users improve their cybersecurity skills while having fun. Thank you for checking it out!
