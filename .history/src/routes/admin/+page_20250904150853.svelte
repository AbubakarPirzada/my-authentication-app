<script lang="ts">
  import { page } from '$app/stores';
  import type { PageData } from './$types';
  
  $: data = $page.data as PageData;
  $: session = data.session;
  $: stats = data.stats;
  $: recentUsers = data.recentUsers || [];
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-slate-800/50 backdrop-blur-sm overflow-hidden shadow-2xl rounded-2xl border border-slate-700/50">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex items-center mb-6">
          <div class="h-12 w-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p class="text-gray-300">Welcome, {session?.user?.name || session?.user?.email}!</p>
            <p class="text-sm text-emerald-400 font-medium">Role: Administrator</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- User Management Card -->
          <div class="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6 hover:bg-slate-700/70 transition-all duration-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-400 truncate">User Management</dt>
                  <dd class="text-lg font-medium text-white">
                    {stats?.totalUsers || 0} Total Users
                  </dd>
                </dl>
              </div>
            </div>
            <div class="mt-4">
              <a href="/admin/users" class="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200">
                View all users →
              </a>
            </div>
          </div>

          <!-- System Stats Card -->
          <div class="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6 hover:bg-slate-700/70 transition-all duration-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-400 truncate">System Statistics</dt>
                  <dd class="text-lg font-medium text-white">View Stats</dd>
                </dl>
              </div>
            </div>
            <div class="mt-4">
              <a href="/admin/stats" class="text-sm text-emerald-400 hover:text-emerald-300 transition-colors duration-200">
                View statistics →
              </a>
            </div>
          </div>

          <!-- Settings Card -->
          <div class="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6 hover:bg-slate-700/70 transition-all duration-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-400 truncate">System Settings</dt>
                  <dd class="text-lg font-medium text-white">Configure</dd>
                </dl>
              </div>
            </div>
            <div class="mt-4">
              <a href="/admin/settings" class="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200">
                Manage settings →
              </a>
            </div>
          </div>
        </div>

        <!-- Recent Users -->
        {#if recentUsers.length > 0}
        <div class="mt-8">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Recent Users</h2>
          <div class="bg-gray-50 rounded-lg p-6">
            <div class="space-y-3">
              {#each recentUsers as user}
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                      <span class="text-xs font-medium text-white">
                        {(user.name || user.email || '?').charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">
                        {user.name || 'No name'}
                      </p>
                      <p class="text-xs text-gray-500">{user.email}</p>
                      {#if user.createdAt}
                        <p class="text-xs text-gray-400">
                          Joined {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      {/if}
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}">
                      {user.role}
                    </span>
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {user.emailVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                      {user.emailVerified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                </div>
              {/each}
            </div>
            <div class="mt-4">
              <a href="/admin/users" class="text-sm text-indigo-600 hover:text-indigo-500">
                View all users →
              </a>
            </div>
          </div>
        </div>
        {/if}

        <!-- Quick Actions -->
        <div class="mt-8">
          <h2 class="text-lg font-medium text-white mb-4">Quick Actions</h2>
          <div class="flex flex-wrap gap-3">
            <a 
              href="/admin/users/new"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New User
            </a>
            <button class="inline-flex items-center px-4 py-2 border border-slate-600 text-sm font-medium rounded-xl text-gray-300 bg-slate-700/50 hover:bg-slate-600/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 backdrop-blur-sm">
              Export User Data
            </button>
            <button class="inline-flex items-center px-4 py-2 border border-slate-600 text-sm font-medium rounded-xl text-gray-300 bg-slate-700/50 hover:bg-slate-600/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 backdrop-blur-sm">
              System Backup
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
