<script lang="ts">
  import { page } from '$app/stores';
  import type { PageData } from './$types';
  
  $: data = $page.data as PageData;
  $: stats = data.stats;
  $: recentUsers = data.recentUsers || [];
</script>

<div class="min-h-screen bg-gray-50 py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-bold text-gray-900">System Statistics</h1>
          <a 
            href="/admin" 
            class="text-sm text-indigo-600 hover:text-indigo-500"
          >
            ← Back to Admin Dashboard
          </a>
        </div>

        <!-- Main Statistics Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Total Users -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                  <dd class="text-3xl font-bold text-blue-600">{stats.totalUsers}</dd>
                </dl>
              </div>
            </div>
          </div>

          <!-- Admin Users -->
          <div class="bg-red-50 border border-red-200 rounded-lg p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Administrators</dt>
                  <dd class="text-3xl font-bold text-red-600">{stats.adminUsers}</dd>
                  <dd class="text-sm text-red-500">{stats.adminPercentage}% of total</dd>
                </dl>
              </div>
            </div>
          </div>

          <!-- Regular Users -->
          <div class="bg-green-50 border border-green-200 rounded-lg p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Regular Users</dt>
                  <dd class="text-3xl font-bold text-green-600">{stats.regularUsers}</dd>
                  <dd class="text-sm text-green-500">{(100 - parseFloat(stats.adminPercentage)).toFixed(1)}% of total</dd>
                </dl>
              </div>
            </div>
          </div>

          <!-- Verified Users -->
          <div class="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Verified Users</dt>
                  <dd class="text-3xl font-bold text-purple-600">{stats.verifiedUsers}</dd>
                  <dd class="text-sm text-purple-500">{stats.verifiedPercentage}% verified</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Statistics -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- User Status Breakdown -->
          <div class="bg-gray-50 rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">User Status Breakdown</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                  <span class="text-sm font-medium text-gray-700">Verified Users</span>
                </div>
                <span class="text-sm font-semibold text-gray-900">{stats.verifiedUsers}</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                  <span class="text-sm font-medium text-gray-700">Unverified Users</span>
                </div>
                <span class="text-sm font-semibold text-gray-900">{stats.unverifiedUsers}</span>
              </div>
            </div>
          </div>

          <!-- Recent Users -->
          <div class="bg-gray-50 rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Recently Registered Users</h3>
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
              
              {#if recentUsers.length === 0}
                <div class="text-center py-4">
                  <p class="text-sm text-gray-500">No users found</p>
                </div>
              {/if}
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="mt-8 flex flex-wrap gap-3">
          <a 
            href="/admin/users"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View All Users
          </a>
          <a 
            href="/admin/users/new"
            class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create New User
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
