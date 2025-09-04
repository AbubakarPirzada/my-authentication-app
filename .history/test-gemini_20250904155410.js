// Test script to debug Google AI API
import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from 'dotenv';

// Load environment variables
config();

async function testGemini() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    console.log('API Key status:', {
      exists: !!apiKey,
      length: apiKey?.length || 0,
      startsWith: apiKey?.substring(0, 10) || 'none'
    });

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY not found');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Test with simple message
    const testMessages = [
      {
        role: 'user',
        parts: [{ text: 'Hello, how are you?' }]
      }
    ];

    console.log('Testing with messages:', JSON.stringify(testMessages, null, 2));

    const result = await model.generateContent({
      contents: testMessages
    });

    console.log('Success! Response:', result.response.text());
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
      cause: error.cause
    });
    console.error('Full error:', error);
  }
}

testGemini();
