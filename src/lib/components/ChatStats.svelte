<script lang="ts">
  import { onMount } from 'svelte';
  
  let stats: any = null;
  let loading = true;
  
  async function loadStats() {
    try {
      const response = await fetch('/api/chat/stats');
      if (response.ok) {
        const data = await response.json();
        stats = data.stats;
      }
    } catch (error) {
      console.error('Error loading chat stats:', error);
    } finally {
      loading = false;
    }
  }
  
  onMount(() => {
    loadStats();
  });
</script>

<div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4">
  <h3 class="text-lg font-semibold text-white mb-4">Chat Statistics</h3>
  
  {#if loading}
    <div class="flex items-center justify-center py-8">
      <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
    </div>
  {:else if stats}
    <div class="grid grid-cols-2 gap-4">
      <!-- Total Sessions -->
      <div class="bg-slate-700/30 rounded-lg p-3">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-white">{stats.totalSessions}</p>
            <p class="text-xs text-gray-400">Total Sessions</p>
          </div>
        </div>
      </div>
      
      <!-- Total Messages -->
      <div class="bg-slate-700/30 rounded-lg p-3">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-white">{stats.totalMessages}</p>
            <p class="text-xs text-gray-400">Total Messages</p>
          </div>
        </div>
      </div>
      
      <!-- Total Tokens -->
      <div class="bg-slate-700/30 rounded-lg p-3">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-white">{stats.totalTokens.toLocaleString()}</p>
            <p class="text-xs text-gray-400">Total Tokens</p>
          </div>
        </div>
      </div>
      
      <!-- Average Duration -->
      <div class="bg-slate-700/30 rounded-lg p-3">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-white">{Math.round(stats.averageSessionDuration / 60)}m</p>
            <p class="text-xs text-gray-400">Avg Duration</p>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div class="text-center py-8 text-gray-400">
      <p class="text-sm">No statistics available</p>
    </div>
  {/if}
</div>
