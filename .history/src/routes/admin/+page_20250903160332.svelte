<script lang="ts">
  import { page } from '$app/stores';
  import type { PageData } from './$types';
  
  $: data = $page.data as PageData;
  $: session = data.session;
  $: stats = data.stats;
  $: recentUsers = data.recentUsers || [];
</script>

<div class="min-h-screen bg-gray-50 py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
        
        <div class="mb-6">
          <p class="text-gray-600">Welcome, {session?.user?.name || session?.user?.email}!</p>
          <p class="text-sm text-green-600 font-medium">Role: Administrator</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- User Management Card -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">User Management</dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {stats?.totalUsers || 0} Total Users
                  </dd>
                </dl>
              </div>
            </div>
            <div class="mt-4">
              <a href="/admin/users" class="text-sm text-blue-600 hover:text-blue-500">
                View all users →
              </a>
            </div>
          </div>

          <!-- System Stats Card -->
          <div class="bg-green-50 border border-green-200 rounded-lg p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">System Statistics</dt>
                  <dd class="text-lg font-medium text-gray-900">View Stats</dd>
                </dl>
              </div>
            </div>
            <div class="mt-4">
              <a href="/admin/stats" class="text-sm text-green-600 hover:text-green-500">
                View statistics →
              </a>
            </div>
          </div>

          <!-- Settings Card -->
          <div class="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">System Settings</dt>
                  <dd class="text-lg font-medium text-gray-900">Configure</dd>
                </dl>
              </div>
            </div>
            <div class="mt-4">
              <a href="/admin/settings" class="text-sm text-purple-600 hover:text-purple-500">
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
          <h2 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div class="flex flex-wrap gap-3">
            <a 
              href="/admin/users/new"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New User
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
