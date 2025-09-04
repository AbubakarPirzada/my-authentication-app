<script lang="ts">
  import { page } from '$app/stores';
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';
  
  $: data = $page.data as PageData;
  $: form = $page.form;
  $: regularUsers = data.regularUsers || [];
  $: adminCount = data.adminCount || 0;
</script>

<div class="min-h-screen bg-gray-50 py-12">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-bold text-gray-900">System Settings</h1>
          <a 
            href="/admin" 
            class="text-sm text-indigo-600 hover:text-indigo-500"
          >
            ← Back to Admin Dashboard
          </a>
        </div>

        {#if form?.success}
          <div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-green-800">Success</h3>
                <div class="mt-2 text-sm text-green-700">
                  <p>{form.message}</p>
                </div>
              </div>
            </div>
          </div>
        {/if}

        {#if form?.error}
          <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">Error</h3>
                <div class="mt-2 text-sm text-red-700">
                  <p>{form.error}</p>
                </div>
              </div>
            </div>
          </div>
        {/if}

        <!-- Current Admin Count -->
        <div class="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-blue-800">Current Administrator Count</h3>
              <p class="text-sm text-blue-700">There are currently <strong>{adminCount}</strong> administrator{adminCount === 1 ? '' : 's'} in the system.</p>
            </div>
          </div>
        </div>

        <!-- User Role Management -->
        <div class="space-y-8">
          <!-- Promote User Section -->
          <div class="border-b border-gray-200 pb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Promote User to Administrator</h2>
            
            {#if regularUsers.length > 0}
              <form method="POST" action="?/promoteUser" use:enhance>
                <div class="space-y-4">
                  <div>
                    <label for="promoteUser" class="block text-sm font-medium text-gray-700">
                      Select User to Promote
                    </label>
                    <div class="mt-1">
                      <select 
                        id="promoteUser" 
                        name="userId" 
                        required
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="">Choose a user...</option>
                        {#each regularUsers as user}
                          <option value={user.id}>
                            {user.name ? `${user.name} (${user.email})` : user.email}
                            {user.emailVerified ? '' : ' - Unverified'}
                          </option>
                        {/each}
                      </select>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">
                      Select a regular user to promote to administrator role
                    </p>
                  </div>

                  <div class="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <h3 class="text-sm font-medium text-yellow-800">Important</h3>
                        <div class="mt-2 text-sm text-yellow-700">
                          <p>Promoting a user to administrator will give them full access to the admin panel, including the ability to manage other users and system settings.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button 
                      type="submit"
                      class="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Promote to Administrator
                    </button>
                  </div>
                </div>
              </form>
            {:else}
              <div class="text-center py-8">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No Regular Users Found</h3>
                <p class="mt-1 text-sm text-gray-500">All users are already administrators or there are no users to promote.</p>
              </div>
            {/if}
          </div>

          <!-- Quick Links Section -->
          <div>
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a 
                href="/admin/users"
                class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div class="flex items-center">
                  <svg class="h-6 w-6 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <div>
                    <p class="text-sm font-medium text-gray-900">Manage Users</p>
                    <p class="text-xs text-gray-500">View and edit all users</p>
                  </div>
                </div>
              </a>

              <a 
                href="/admin/users/new"
                class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div class="flex items-center">
                  <svg class="h-6 w-6 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <div>
                    <p class="text-sm font-medium text-gray-900">Create User</p>
                    <p class="text-xs text-gray-500">Add a new user account</p>
                  </div>
                </div>
              </a>

              <a 
                href="/admin/stats"
                class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div class="flex items-center">
                  <svg class="h-6 w-6 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <div>
                    <p class="text-sm font-medium text-gray-900">View Statistics</p>
                    <p class="text-xs text-gray-500">System usage metrics</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
