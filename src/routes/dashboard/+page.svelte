<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="min-h-screen bg-gray-50">
	<div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
		<!-- Welcome Header -->
		<div class="bg-white overflow-hidden shadow rounded-lg">
			<div class="px-6 py-8">
				<div class="text-center">
					<h1 class="text-3xl font-bold text-gray-900 mb-4">
						Welcome to your Dashboard!
					</h1>
					<p class="text-lg text-gray-600 mb-8">
						Hello, {data.session?.user?.name || data.session?.user?.email}!
					</p>
				</div>

				<!-- Quick Actions -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
					<!-- Profile Management Card -->
					<div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
						<h3 class="text-xl font-semibold mb-2">Profile Management</h3>
						<p class="text-indigo-100 mb-4">Update your personal information and preferences.</p>
						<a 
							href="/dashboard/profile" 
							class="inline-flex items-center px-4 py-2 bg-white text-indigo-600 rounded-md hover:bg-gray-50 transition-colors duration-200 font-medium"
						>
							Manage Profile
							<svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
							</svg>
						</a>
					</div>

					<!-- Account Security Card -->
					<div class="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-white">
						<h3 class="text-xl font-semibold mb-2">Account Security</h3>
						<p class="text-green-100 mb-4">Your account is secure and protected.</p>
						<div class="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 text-white rounded-md font-medium">
							<svg class="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
							Secured
						</div>
					</div>
				</div>

				<!-- Action Buttons -->
				<div class="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
					<a 
						href="/dashboard/profile" 
						class="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
					>
						<svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
						</svg>
						View Profile
					</a>
					
					<button 
						onclick={() => signOut()}
						class="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
					>
						<svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
						</svg>
						Sign Out
					</button>
				</div>
			</div>
		</div>

		<!-- Quick Stats -->
		<div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="bg-white p-6 rounded-lg shadow">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
							<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
							</svg>
						</div>
					</div>
					<div class="ml-4">
						<p class="text-sm font-medium text-gray-900">Account Status</p>
						<p class="text-sm text-gray-500">Active</p>
					</div>
				</div>
			</div>

			<div class="bg-white p-6 rounded-lg shadow">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
							<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
						</div>
					</div>
					<div class="ml-4">
						<p class="text-sm font-medium text-gray-900">Email Verified</p>
						<p class="text-sm text-gray-500">Confirmed</p>
					</div>
				</div>
			</div>

			<div class="bg-white p-6 rounded-lg shadow">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
							<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
							</svg>
						</div>
					</div>
					<div class="ml-4">
						<p class="text-sm font-medium text-gray-900">Security</p>
						<p class="text-sm text-gray-500">Protected</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
