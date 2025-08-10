// Import dependencies
require("dotenv").config(); // Load environment variables
const { GoogleGenerativeAI } = require("@google/generative-ai");
// Chatbot controller function
const genAI = new GoogleGenerativeAI(process.env.CHAT_API_KEY);

const chatWithBot = async (req, res) => {
  const userMessage = req.body.message;
//   console.log(userMessage);

  if (!userMessage) {
    return res.status(400).send({ error: "Message is required" });
  }

  try {
      const generationConfig = {
          candidateCount: 1,
          stopSequences: ["x"],
          maxOutputTokens: 10,
          temperature: 1.0,
        }
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" },generationConfig);
    const prompt = userMessage;
    const result = await model.generateContent(prompt);
    // console.log(result.response.text());
    const botMessage = result.response.text();
    return res.send({ message: botMessage });
  } catch (error) {
    console.error("Error in chatbot communication:", error.message);

    return res
      .status(500)
      .send({ error: "Internal server error. Please try again later." });
  }
};

// Export the controller function
module.exports = { chatWithBot };
