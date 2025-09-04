<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  
  export let sessions: any[] = [];
  export let currentSessionId: string | null = null;
  export let isLoading: boolean = false;
  
  const dispatch = createEventDispatcher();
  
  let showNewSessionForm = false;
  let newSessionTitle = '';
  
  function handleSessionSelect(sessionId: string) {
    dispatch('session-select', { sessionId });
  }
  
  function handleNewSession() {
    showNewSessionForm = true;
  }
  
  function handleCreateSession() {
    if (newSessionTitle.trim()) {
      dispatch('create-session', { title: newSessionTitle.trim() });
      newSessionTitle = '';
      showNewSessionForm = false;
    }
  }
  
  function handleDeleteSession(sessionId: string, event: Event) {
    event.stopPropagation();
    dispatch('delete-session', { sessionId });
  }
  
  function handleRenameSession(sessionId: string, event: Event) {
    event.stopPropagation();
    const newTitle = prompt('Enter new title:');
    if (newTitle && newTitle.trim()) {
      dispatch('rename-session', { sessionId, title: newTitle.trim() });
    }
  }
  
  function cancelNewSession() {
    showNewSessionForm = false;
    newSessionTitle = '';
  }
</script>

<div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4">
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-semibold text-white">Chat Sessions</h3>
    <button
      on:click={handleNewSession}
      class="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-sm"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      <span>New Chat</span>
    </button>
  </div>
  
  <!-- New Session Form -->
  {#if showNewSessionForm}
    <div class="mb-4 p-3 bg-slate-700/50 rounded-lg">
      <input
        bind:value={newSessionTitle}
        placeholder="Enter chat title..."
        class="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
        on:keydown={(e) => e.key === 'Enter' && handleCreateSession()}
        on:keydown={(e) => e.key === 'Escape' && cancelNewSession()}
      />
      <div class="flex space-x-2 mt-2">
        <button
          on:click={handleCreateSession}
          class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm transition-colors duration-200"
        >
          Create
        </button>
        <button
          on:click={cancelNewSession}
          class="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  {/if}
  
  <!-- Sessions List -->
  <div class="space-y-2 max-h-96 overflow-y-auto">
    {#if isLoading}
      <div class="flex items-center justify-center py-8">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
      </div>
    {:else if sessions.length === 0}
      <div class="text-center py-8 text-gray-400">
        <svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p class="text-sm">No chat sessions yet</p>
        <p class="text-xs text-gray-500">Start a new conversation!</p>
      </div>
    {:else}
      {#each sessions as session (session.id)}
        <div
          class="group relative p-3 rounded-lg cursor-pointer transition-all duration-200 {currentSessionId === session.id 
            ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30' 
            : 'bg-slate-700/30 hover:bg-slate-700/50 border border-transparent hover:border-slate-600/50'}"
          on:click={() => handleSessionSelect(session.id)}
          on:keydown={(e) => e.key === 'Enter' && handleSessionSelect(session.id)}
          role="button"
          tabindex="0"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-medium text-white truncate">
                {session.title}
              </h4>
              <p class="text-xs text-gray-400 mt-1">
                {new Date(session.updatedAt).toLocaleDateString()}
              </p>
            </div>
            
            <!-- Session Actions -->
            <div class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                on:click={(e) => handleRenameSession(session.id, e)}
                class="p-1 text-gray-400 hover:text-white transition-colors duration-200"
                title="Rename session"
              >
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                on:click={(e) => handleDeleteSession(session.id, e)}
                class="p-1 text-gray-400 hover:text-red-400 transition-colors duration-200"
                title="Delete session"
              >
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>
