import { GoogleGenerativeAI } from '@google/generative-ai';
import { 
  getOrCreateActiveSession, 
  saveChatMessage, 
  getChatMessages, 
  convertToAIMessages,
  getChatSession
} from '$lib/server/db/chat';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    // Import environment variables inside the function
    const { GEMINI_API_KEY } = await import('$env/static/private');
    
    // Debug: Log API key status (without exposing the actual key)
    console.log('GEMINI_API_KEY status:', {
      exists: !!GEMINI_API_KEY,
      length: GEMINI_API_KEY?.length || 0,
      startsWith: GEMINI_API_KEY?.substring(0, 10) || 'none'
    });

    // Check if GEMINI_API_KEY is configured
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your-gemini-api-key-here') {
      console.log('API key not configured properly');
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

    // Authenticate user
    console.log('Authenticating user...');
    const session = await locals.auth();
    console.log('Session status:', {
      exists: !!session,
      hasUser: !!session?.user,
      userId: session?.user?.id || 'none'
    });
    
    if (!session?.user?.id) {
      console.log('Authentication failed - no user ID');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const { messages, sessionId } = await request.json();

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

    // Get or create chat session
    console.log('Creating/getting chat session...');
    let chatSession;
    if (sessionId) {
      // Try to get existing session
      const existingSession = await getChatSession(sessionId, session.user.id);
      chatSession = existingSession || await getOrCreateActiveSession(session.user.id);
    } else {
      // Create new session
      chatSession = await getOrCreateActiveSession(session.user.id);
    }
    console.log('Chat session:', {
      id: chatSession.id,
      userId: chatSession.userId,
      title: chatSession.title
    });

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'user') {
      // Save user message to database
      await saveChatMessage(
        chatSession.id,
        'user',
        lastMessage.content
      );
    }

    // Load previous messages from database if this is a new session
    let allMessages = messages;
    if (messages.length === 1) {
      const dbMessages = await getChatMessages(chatSession.id);
      const previousMessages = convertToAIMessages(dbMessages);
      allMessages = [...previousMessages, ...messages];
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
    const geminiMessages = allMessages.map(msg => ({
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

    // Save AI response to database
    await saveChatMessage(
      chatSession.id,
      'assistant',
      aiResponseText
    );

    // Return simple JSON response
    return new Response(
      JSON.stringify({ 
        response: aiResponseText,
        sessionId: chatSession.id
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Chat API error:', error);
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