// utils/geminiService.js
const axios = require('axios');

const analyzeWithGemini = async (documentText) => {
  try {
    const prompt = `You are an AI assistant. Analyze the following document thoroughly and provide the following insights:
1. Summary of the document
2. Key points or arguments
3. Any potential legal, ethical, or technical issues (if applicable)
4. Suggestions or improvements if relevant

Document:
"""${documentText}"""`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return response.data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Gemini response does not contain expected data.');
    }
  } catch (error) {
    console.error('Gemini API error:', error.response?.data || error.message);
    throw new Error('Failed to analyze document with Gemini.');
  }
};

module.exports = { analyzeWithGemini };
