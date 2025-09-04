import { GoogleGenerativeAI } from '@google/generative-ai';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    // Import environment variables inside the function
    const { GEMINI_API_KEY } = await import('$env/static/private');
    
    console.log('Testing Gemini API key...');
    console.log('API Key status:', {
      exists: !!GEMINI_API_KEY,
      length: GEMINI_API_KEY?.length || 0,
      startsWith: GEMINI_API_KEY?.substring(0, 10) || 'none'
    });

    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your-gemini-api-key-here') {
      return new Response(
        JSON.stringify({ 
          error: 'API key not configured',
          status: 'not_configured'
        }),
        { 
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Test the API key
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: 'Hello, respond with just "API working"' }] }]
    });

    const response = await result.response;
    const text = response.text();

    return new Response(
      JSON.stringify({ 
        success: true,
        response: text,
        status: 'working'
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Gemini test error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        status: 'error',
        details: error instanceof Error ? error.stack : undefined
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
