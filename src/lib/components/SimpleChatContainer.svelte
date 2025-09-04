<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import ChatMessage from './ChatMessage.svelte';
  import ChatInput from './ChatInput.svelte';
  import ChatSessionManager from './ChatSessionManager.svelte';
  
  export let initialMessages: any[] = [];
  export let showSessionManager: boolean = true;
  
  let messagesContainer: HTMLDivElement;
  let isAtBottom = true;
  let currentSessionId: string | null = null;
  let sessions: any[] = [];
  let sessionsLoading = false;
  let messages: any[] = [...initialMessages];
  let isLoading = false;
  let error: string | null = null;
  
  // Auto-scroll to bottom when new messages arrive
  function scrollToBottom() {
    if (messagesContainer && isAtBottom) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }
  
  // Handle scroll events to detect if user is at bottom
  function handleScroll() {
    if (!messagesContainer) return;
    
    const { scrollTop, scrollHeight, clientHeight } = messagesContainer;
    isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
  }
  
  // Handle quick actions
  function handleQuickAction(event: CustomEvent) {
    const { action } = event.detail;
    
    let message = '';
    switch (action) {
      case 'help':
        message = 'What features does this platform offer?';
        break;
      case 'security':
        message = 'How secure is this authentication system?';
        break;
      case 'features':
        message = 'Tell me about the main features of this application.';
        break;
      case 'support':
        message = 'I need help with my account. Can you assist me?';
        break;
    }
    
    if (message) {
      handleSendMessage(message);
    }
  }
  
  // Handle sending messages
  function handleSend(event: CustomEvent) {
    const { message } = event.detail;
    handleSendMessage(message);
  }
  
  // Send message to API
  async function handleSendMessage(content: string) {
    if (!content.trim() || isLoading) return;
    
    // Add user message to messages
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim()
    };
    
    messages = [...messages, userMessage];
    isLoading = true;
    error = null;
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: messages,
          sessionId: currentSessionId
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      // Get the JSON response
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Add assistant message with the response
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'Sorry, I couldn\'t generate a response.'
      };
      
      messages = [...messages, assistantMessage];
      
      // Update current session ID if provided
      if (data.sessionId) {
        currentSessionId = data.sessionId;
      }
      
    } catch (err) {
      console.error('Chat error:', err);
      error = err instanceof Error ? err.message : 'An error occurred';
    } finally {
      isLoading = false;
    }
  }
  
  // Load chat sessions
  async function loadSessions() {
    sessionsLoading = true;
    try {
      const response = await fetch('/api/chat/sessions');
      if (response.ok) {
        const data = await response.json();
        sessions = data.sessions || [];
      }
    } catch (error) {
      console.error('Error loading sessions:', error);
    } finally {
      sessionsLoading = false;
    }
  }
  
  // Handle session selection
  async function handleSessionSelect(event: CustomEvent) {
    const { sessionId } = event.detail;
    currentSessionId = sessionId;
    
    // Load messages for this session
    try {
      const response = await fetch(`/api/chat/sessions/${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        messages = data.messages || [];
      }
    } catch (error) {
      console.error('Error loading session messages:', error);
    }
  }
  
  // Handle creating new session
  async function handleCreateSession(event: CustomEvent) {
    const { title } = event.detail;
    try {
      const response = await fetch('/api/chat/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });
      
      if (response.ok) {
        const data = await response.json();
        sessions = [data.session, ...sessions];
        currentSessionId = data.session.id;
        messages = [];
      }
    } catch (error) {
      console.error('Error creating session:', error);
    }
  }
  
  // Handle deleting session
  async function handleDeleteSession(event: CustomEvent) {
    const { sessionId } = event.detail;
    try {
      const response = await fetch('/api/chat/sessions', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      });
      
      if (response.ok) {
        sessions = sessions.filter(s => s.id !== sessionId);
        if (currentSessionId === sessionId) {
          currentSessionId = null;
          messages = [];
        }
      }
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  }
  
  // Handle renaming session
  async function handleRenameSession(event: CustomEvent) {
    const { sessionId, title } = event.detail;
    try {
      const response = await fetch(`/api/chat/sessions/${sessionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });
      
      if (response.ok) {
        sessions = sessions.map(s => 
          s.id === sessionId ? { ...s, title } : s
        );
      }
    } catch (error) {
      console.error('Error renaming session:', error);
    }
  }
  
  onMount(() => {
    scrollToBottom();
    loadSessions();
  });
  
  afterUpdate(() => {
    scrollToBottom();
  });
</script>

<div class="flex h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
  <!-- Session Manager Sidebar -->
  {#if showSessionManager}
    <div class="w-80 flex-shrink-0 border-r border-slate-700/50 p-4">
      <ChatSessionManager 
        {sessions}
        {currentSessionId}
        isLoading={sessionsLoading}
        on:session-select={handleSessionSelect}
        on:create-session={handleCreateSession}
        on:delete-session={handleDeleteSession}
        on:rename-session={handleRenameSession}
      />
    </div>
  {/if}
  
  <!-- Main Chat Area -->
  <div class="flex-1 flex flex-col">
    <!-- Chat Header -->
    <div class="flex-shrink-0 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-white">AI Assistant</h2>
            <p class="text-sm text-gray-400">Powered by Gemini AI</p>
          </div>
        </div>
        
        <div class="flex items-center space-x-2">
          {#if isLoading}
            <div class="flex items-center space-x-2 text-emerald-400">
              <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span class="text-sm">Online</span>
            </div>
          {:else}
            <div class="flex items-center space-x-2 text-gray-400">
              <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span class="text-sm">Ready</span>
            </div>
          {/if}
        </div>
      </div>
    </div>
  
    <!-- Messages Container -->
    <div 
      bind:this={messagesContainer}
      on:scroll={handleScroll}
      class="flex-1 overflow-y-auto p-4 space-y-4 chat-messages"
    >
      {#if messages.length === 0}
        <!-- Welcome Message -->
        <div class="text-center py-12">
          <div class="max-w-md mx-auto">
            <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Welcome to AI Assistant</h3>
            <p class="text-gray-400 text-sm mb-4">
              I'm here to help you with questions about the platform, security, features, and technical support.
            </p>
            <div class="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <p class="text-blue-300 text-xs">
                <strong>💡 Tip:</strong> If you see an error, make sure your GEMINI_API_KEY is configured in the .env file.
              </p>
            </div>
          </div>
        </div>
      {:else}
        {#each messages as message (message.id)}
          <ChatMessage {message} />
        {/each}
      {/if}
      
      {#if error}
        <div class="flex justify-center">
          <div class="bg-red-500/10 border border-red-500/20 rounded-xl p-4 max-w-md">
            <div class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div class="flex-1">
                <p class="text-red-300 text-sm font-medium mb-1">Chat Error</p>
                <p class="text-red-400 text-sm">{error}</p>
                {#if error.includes('AI service not configured')}
                  <div class="mt-3 p-2 bg-red-500/5 rounded-lg">
                    <p class="text-red-300 text-xs">
                      <strong>Setup Required:</strong> Please configure your GEMINI_API_KEY in the .env file. 
                      See GEMINI_API_SETUP.md for detailed instructions.
                    </p>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  
    <!-- Chat Input -->
    <div class="flex-shrink-0 p-4">
      <ChatInput 
        disabled={isLoading}
        on:send={handleSend}
        on:quick-action={handleQuickAction}
      />
    </div>
  </div>
</div>
