<script>
  import { page } from '$app/stores';
  import { enhance } from '$app/forms';
  
  $: data = $page.data;
  $: form = $page.form;
  $: user = data.user;
</script>

<div class="min-h-screen bg-gray-50 py-12">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-bold text-gray-900">Edit User</h1>
          <a 
            href="/admin/users" 
            class="text-sm text-indigo-600 hover:text-indigo-500"
          >
            ← Back to Users
          </a>
        </div>

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

        <!-- User Information -->
        <div class="mb-8">
          <div class="flex items-center space-x-4 mb-6">
            <div class="h-20 w-20 rounded-full bg-indigo-500 flex items-center justify-center">
              <span class="text-2xl font-medium text-white">
                {(user.name || user.email || '?').charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900">{user.name || 'No name'}</h2>
              <p class="text-gray-600">{user.email}</p>
              <p class="text-sm text-gray-500">ID: {user.id}</p>
            </div>
          </div>
        </div>

        <!-- Role Management -->
        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Role Management</h3>
          
          <form method="POST" action="?/updateRole" use:enhance class="mb-6">
            <div class="space-y-4">
              <div>
                <label for="role" class="block text-sm font-medium text-gray-700">
                  User Role
                </label>
                <select 
                  id="role" 
                  name="role" 
                  value={user.role}
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="user">User</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              
              <div class="flex items-center space-x-3">
                <button 
                  type="submit"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update Role
                </button>
                
                <div class="text-sm text-gray-500">
                  Current role: 
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
          </form>

          <!-- Warning for Admin Role -->
          {#if user.role === 'admin'}
            <div class="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-yellow-800">Administrator Account</h3>
                  <div class="mt-2 text-sm text-yellow-700">
                    <p>This user has administrative privileges and can access the admin panel.</p>
                  </div>
                </div>
              </div>
            </div>
          {/if}
        </div>

        <!-- Danger Zone -->
        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-lg font-medium text-red-900 mb-4">Danger Zone</h3>
          
          <div class="bg-red-50 border border-red-200 rounded-md p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">Delete User Account</h3>
                <div class="mt-2 text-sm text-red-700">
                  <p>Permanently delete this user account. This action cannot be undone.</p>
                </div>
                <div class="mt-4">
                  <form method="POST" action="?/deleteUser" use:enhance>
                    <button 
                      type="submit"
                      on:click={(e) => {
                        if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
                          e.preventDefault();
                        }
                      }}
                      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete User
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
