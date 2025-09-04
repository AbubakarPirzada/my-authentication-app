import { GoogleGenerativeAI } from '@google/generative-ai';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    // Import environment variables inside the function
    const { GEMINI_API_KEY } = await import('$env/static/private');
    
    console.log('GEMINI_API_KEY status:', {
      exists: !!GEMINI_API_KEY,
      length: GEMINI_API_KEY?.length || 0,
      startsWith: GEMINI_API_KEY?.substring(0, 10) || 'none'
    });

    // Check if GEMINI_API_KEY is configured
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your-gemini-api-key-here') {
      return new Response(
        JSON.stringify({ 
          error: 'AI service not configured. Please set up your GEMINI_API_KEY in the .env file.',
          details: 'Contact your administrator to configure the AI service.'
        }),
        { 
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Initialize the Google AI provider
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    const { messages } = await request.json();

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid messages format' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Prepare messages for Gemini
    const systemMessage = `You are a helpful AI assistant for an authentication platform. 
    You can help users with:
    - General questions about the platform
    - Technical support and troubleshooting
    - Account management guidance
    - Security best practices
    - Feature explanations
    
    Be professional, helpful, and concise in your responses. 
    If you don't know something specific about the platform, say so and suggest contacting support.`;

    // Convert messages to Gemini format
    const geminiMessages = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Add system message as first user message
    geminiMessages.unshift({
      role: 'user',
      parts: [{ text: systemMessage }]
    });

    console.log('Calling Gemini API...');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Generate response
    console.log('Generating content with', geminiMessages.length, 'messages');
    console.log('Gemini messages structure:', JSON.stringify(geminiMessages, null, 2));
    
    const result = await model.generateContent({
      contents: geminiMessages
    });

    console.log('Got response from Gemini');
    const response = await result.response;
    const aiResponseText = response.text();
    console.log('AI response length:', aiResponseText.length);

    // Return simple JSON response
    return new Response(
      JSON.stringify({ 
        response: aiResponseText,
        sessionId: 'test-session'
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Test Chat API error:', error);
    console.error('Detailed AI Error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
      cause: error instanceof Error ? error.cause : undefined
    });
    
    // Log the full error object for debugging
    if (error && typeof error === 'object') {
      console.error('Full error object:', JSON.stringify(error, null, 2));
    }
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error',
        type: error instanceof Error ? error.name : 'UnknownError'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
