<script lang="ts">
  import { page } from '$app/stores';
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';
  
  $: data = $page.data as PageData;
  $: form = $page.form;
  $: users = data.users || [];
  $: created = $page.url.searchParams.get('created') === 'success';
</script>

<div class="min-h-screen bg-gray-50 py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-bold text-gray-900">User Management</h1>
          <a 
            href="/admin" 
            class="text-sm text-indigo-600 hover:text-indigo-500"
          >
            ← Back to Admin Dashboard
          </a>
        </div>

        {#if created}
          <div class="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p class="text-green-800">User created successfully!</p>
          </div>
        {/if}

        {#if form?.success}
          <div class="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p class="text-green-800">{form.message}</p>
          </div>
        {/if}

        {#if form?.error}
          <div class="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p class="text-red-800">{form.error}</p>
          </div>
        {/if}

        <!-- User Statistics -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div class="text-2xl font-bold text-blue-600">{users.length}</div>
            <div class="text-sm text-blue-800">Total Users</div>
          </div>
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <div class="text-2xl font-bold text-green-600">
              {users.filter(user => user.role === 'admin').length}
            </div>
            <div class="text-sm text-green-800">Administrators</div>
          </div>
          <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div class="text-2xl font-bold text-purple-600">
              {users.filter(user => user.role === 'user').length}
            </div>
            <div class="text-sm text-purple-800">Regular Users</div>
          </div>
        </div>

        <!-- Users Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each users as user}
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                          <span class="text-sm font-medium text-white">
                            {(user.name || user.email || '?').charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {user.name || 'No name'}
                        </div>
                        <div class="text-sm text-gray-500">
                          ID: {user.id.slice(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}">
                      {user.role}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {user.emailVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                      {user.emailVerified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex items-center space-x-3">
                      <a 
                        href="/admin/users/{user.id}"
                        class="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </a>
                      <form method="POST" action="?/deleteUser" use:enhance class="inline">
                        <input type="hidden" name="userId" value={user.id} />
                        <button 
                          type="submit"
                          on:click={(e) => {
                            if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
                              e.preventDefault();
                            }
                          }}
                          class="text-red-600 hover:text-red-900 font-medium"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
          
          {#if users.length === 0}
            <div class="text-center py-12">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">No users found</h3>
              <p class="mt-1 text-sm text-gray-500">Get started by registering your first user.</p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
