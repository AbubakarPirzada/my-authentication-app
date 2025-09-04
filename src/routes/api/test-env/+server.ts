import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    // Test if we can import environment variables
    const { GEMINI_API_KEY } = await import('$env/static/private');
    
    return new Response(
      JSON.stringify({ 
        success: true,
        apiKeyExists: !!GEMINI_API_KEY,
        apiKeyLength: GEMINI_API_KEY?.length || 0,
        apiKeyStart: GEMINI_API_KEY?.substring(0, 10) || 'none',
        message: 'Environment variables loaded successfully'
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Environment test error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? error.stack : undefined
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
