<script lang="ts">
  import { onMount } from 'svelte';
  import ChatStats from '$lib/components/ChatStats.svelte';
  import ChatSessionManager from '$lib/components/ChatSessionManager.svelte';
  
  let sessions: any[] = [];
  let sessionsLoading = false;
  
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
  
  onMount(() => {
    loadSessions();
  });
</script>

<svelte:head>
  <title>Chat Dashboard - Auth App</title>
  <meta name="description" content="View your AI chat statistics and manage your chat sessions." />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
  <!-- Header -->
  <div class="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <a 
            href="/chat" 
            class="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors duration-200"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span class="font-medium">Back to Chat</span>
          </a>
          
          <div class="h-6 w-px bg-slate-600"></div>
          
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-semibold text-white">Chat Dashboard</h1>
              <p class="text-sm text-gray-400">Statistics & Session Management</p>
            </div>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <a 
            href="/chat" 
            class="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Start New Chat</span>
          </a>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Main Content -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Statistics -->
      <div class="lg:col-span-1">
        <ChatStats />
      </div>
      
      <!-- Session Management -->
      <div class="lg:col-span-2">
        <ChatSessionManager 
          {sessions}
          currentSessionId={null}
          isLoading={sessionsLoading}
        />
      </div>
    </div>
    
    <!-- Additional Info -->
    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Features Card -->
      <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
        <h3 class="text-lg font-semibold text-white mb-4">Chat Features</h3>
        <div class="space-y-3">
          <div class="flex items-center space-x-3">
            <div class="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <span class="text-gray-300">Persistent chat history</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <span class="text-gray-300">Session management</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <span class="text-gray-300">Usage analytics</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <span class="text-gray-300">Secure & private</span>
          </div>
        </div>
      </div>
      
      <!-- Tips Card -->
      <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
        <h3 class="text-lg font-semibold text-white mb-4">Usage Tips</h3>
        <div class="space-y-3 text-sm text-gray-300">
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
            <p>Create separate sessions for different topics to keep conversations organized</p>
          </div>
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
            <p>Use descriptive titles for your chat sessions to easily find them later</p>
          </div>
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
            <p>All your conversations are automatically saved and can be accessed anytime</p>
          </div>
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
            <p>Monitor your usage statistics to track your AI interaction patterns</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
