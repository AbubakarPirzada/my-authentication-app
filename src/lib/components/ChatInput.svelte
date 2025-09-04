<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let disabled: boolean = false;
  export let placeholder: string = 'Type your message...';
  
  const dispatch = createEventDispatcher();
  
  let message = '';
  let textareaElement: HTMLTextAreaElement;
  
  function handleSubmit() {
    if (message.trim() && !disabled) {
      dispatch('send', { message: message.trim() });
      message = '';
      // Reset textarea height
      if (textareaElement) {
        textareaElement.style.height = 'auto';
      }
    }
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }
  
  function adjustTextareaHeight() {
    if (textareaElement) {
      textareaElement.style.height = 'auto';
      textareaElement.style.height = Math.min(textareaElement.scrollHeight, 120) + 'px';
    }
  }
  
  $: if (message) {
    adjustTextareaHeight();
  }
</script>

<div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4">
  <form on:submit|preventDefault={handleSubmit} class="flex items-end space-x-3">
    <!-- Text Input -->
    <div class="flex-1 relative">
      <textarea
        bind:this={textareaElement}
        bind:value={message}
        on:keydown={handleKeydown}
        on:input={adjustTextareaHeight}
        {disabled}
        {placeholder}
        class="
          w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl
          text-white placeholder-gray-400 resize-none
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          backdrop-blur-sm transition-all duration-200
        "
        rows="1"
        maxlength="2000"
      ></textarea>
      
      <!-- Character Count -->
      <div class="absolute bottom-2 right-2 text-xs text-gray-400">
        {message.length}/2000
      </div>
    </div>
    
    <!-- Send Button -->
    <button
      type="submit"
      {disabled}
      class="
        flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600
        text-white rounded-xl flex items-center justify-center
        hover:from-purple-700 hover:to-pink-700
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200 shadow-lg
      "
    >
      {#if disabled}
        <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      {:else}
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      {/if}
    </button>
  </form>
  
  <!-- Quick Actions -->
  <div class="mt-3 flex flex-wrap gap-2">
    <button
      type="button"
      on:click={() => dispatch('quick-action', { action: 'help' })}
      class="px-3 py-1 text-xs bg-slate-700/50 text-gray-300 rounded-lg hover:bg-slate-600/50 transition-colors duration-200"
    >
      Need Help?
    </button>
    <button
      type="button"
      on:click={() => dispatch('quick-action', { action: 'features' })}
      class="px-3 py-1 text-xs bg-slate-700/50 text-gray-300 rounded-lg hover:bg-slate-600/50 transition-colors duration-200"
    >
      Platform Features
    </button>
    <button
      type="button"
      on:click={() => dispatch('quick-action', { action: 'security' })}
      class="px-3 py-1 text-xs bg-slate-700/50 text-gray-300 rounded-lg hover:bg-slate-600/50 transition-colors duration-200"
    >
      Security Tips
    </button>
  </div>
</div>
