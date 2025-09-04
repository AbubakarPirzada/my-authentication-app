<script lang="ts">
  import type { Message } from 'ai';
  
  export let message: Message;
  export let isLoading: boolean = false;
  
  $: isUser = message.role === 'user';
  $: isAssistant = message.role === 'assistant';
</script>

<div class="flex {isUser ? 'justify-end' : 'justify-start'} mb-6">
  <div class="flex max-w-[80%] {isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3">
    <!-- Avatar -->
    <div class="flex-shrink-0">
      {#if isUser}
        <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      {:else if isAssistant}
        <div class="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      {/if}
    </div>
    
    <!-- Message Content -->
    <div class="flex flex-col {isUser ? 'items-end' : 'items-start'}">
      <!-- Message Bubble -->
      <div class="
        px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm
        {isUser 
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
          : 'bg-slate-800/50 border border-slate-700/50 text-gray-100'
        }
        {isLoading ? 'animate-pulse' : ''}
      ">
        {#if isLoading && isAssistant}
          <div class="flex items-center space-x-2">
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
            <span class="text-sm text-gray-400">AI is thinking...</span>
          </div>
        {:else}
          <div class="prose prose-invert max-w-none">
            {@html message.content}
          </div>
        {/if}
      </div>
      
      <!-- Timestamp -->
      <div class="mt-1 text-xs text-gray-400 px-2">
        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  </div>
</div>
