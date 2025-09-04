import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Simple API endpoint working',
        timestamp: new Date().toISOString()
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Simple test error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
