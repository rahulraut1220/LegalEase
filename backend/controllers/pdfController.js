const fs = require('fs');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Document = require('../models/Document');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.uploadAndAnalyzePDF = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const dataBuffer = fs.readFileSync(file.path);
    const pdfData = await pdfParse(dataBuffer);
    const extractedText = pdfData.text;

    console.log("📄 Extracted Text:\n", extractedText); // Log to verify the text

    // Validate the extracted text before passing it to Gemini
    if (!extractedText || extractedText.length === 0) {
      return res.status(400).json({ error: 'No text extracted from the PDF' });
    }

    const prompt = `Analyze this legal document and provide a concise summary in the following format:

1. **Key Points**: List the main points and provisions
2. **Important Terms**: Highlight key legal terms and their meanings
3. **Structure**: Brief overview of document organization
4. **Potential Issues**: Any concerns or ambiguities
5. **Recommendations**: Suggested actions or next steps

Keep each section brief and easy to understand. Use bullet points where appropriate.

Document text: ${extractedText.slice(0, 8000)}`;

    // Prepare the input for the Gemini API
    const input = {
      contents: [
        {
          text: prompt
        }
      ]
    };

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Generate content using the extracted text and strong prompt
    const result = await model.generateContent(input.contents);

    // Access the first candidate's text
    const responseText = await result.response.text(); // Invoke the text function

    // Store document in database
    const document = new Document({
      userId: req.user._id,
      originalName: file.originalname,
      filePath: file.path,
      analysisResult: responseText
    });
    await document.save();

    // Clean up uploaded file
    fs.unlinkSync(file.path);

    res.status(200).json({ 
      success: true,
      analysis: responseText,
      document: {
        _id: document._id,
        originalName: document.originalName,
        createdAt: document.createdAt
      }
    });

  } catch (error) {
    console.error('Error in uploadAndAnalyzePDF:', error);
    res.status(500).json({ error: 'Failed to analyze document' });
  }
};

exports.getDocumentHistory = async (req, res) => {
  try {
    console.log('Fetching document history for user:', req.user._id);
    
    // Fetch documents associated with the logged-in user
    const documents = await Document.find({ userId: req.user._id })
      .sort({ createdAt: -1 })  // Sort by creation date (newest first)
      .select('originalName createdAt analysisResult'); // Only select necessary fields

    console.log(`Found ${documents.length} documents`);
    
    res.json(documents);  // Send back the documents
  } catch (error) {
    console.error('Error in getDocumentHistory:', error);
    res.status(500).json({ message: 'Failed to fetch document history' });
  }
};
