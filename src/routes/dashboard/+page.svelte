<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
	<div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
		<!-- Welcome Header -->
		<div class="bg-slate-800/50 backdrop-blur-sm overflow-hidden shadow-2xl rounded-2xl border border-slate-700/50">
			<div class="px-6 py-8">
				<div class="text-center">
					<div class="mx-auto h-16 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
						<svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
						</svg>
					</div>
					<h1 class="text-3xl font-bold text-white mb-4">
						Welcome to your Dashboard!
					</h1>
					<p class="text-lg text-gray-300 mb-8">
						Hello, {data.session?.user?.name || data.session?.user?.email}!
					</p>
				</div>

				<!-- Quick Actions -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
					<!-- Profile Management Card -->
					<div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-200">
						<h3 class="text-xl font-semibold mb-2">Profile Management</h3>
						<p class="text-purple-100 mb-4">Update your personal information and preferences.</p>
						<a 
							href="/dashboard/profile" 
							class="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 font-medium border border-white/20"
						>
							Manage Profile
							<svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
							</svg>
						</a>
					</div>

					<!-- Account Security Card -->
					<div class="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-200">
						<h3 class="text-xl font-semibold mb-2">Account Security</h3>
						<p class="text-emerald-100 mb-4">Your account is secure and protected.</p>
						<div class="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg font-medium border border-white/20">
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
						class="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
					>
						<svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
						</svg>
						View Profile
					</a>
					
					<button 
						onclick={() => signOut()}
						class="inline-flex justify-center items-center px-6 py-3 border border-slate-600 text-base font-medium rounded-xl text-gray-300 bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-200 backdrop-blur-sm"
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
			<div class="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-700/50">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
							<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
							</svg>
						</div>
					</div>
					<div class="ml-4">
						<p class="text-sm font-medium text-gray-300">Account Status</p>
						<p class="text-sm text-gray-400">Active</p>
					</div>
				</div>
			</div>

			<div class="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-700/50">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
							<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
						</div>
					</div>
					<div class="ml-4">
						<p class="text-sm font-medium text-gray-300">Email Verified</p>
						<p class="text-sm text-gray-400">Confirmed</p>
					</div>
				</div>
			</div>

			<div class="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-700/50">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
							<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
							</svg>
						</div>
					</div>
					<div class="ml-4">
						<p class="text-sm font-medium text-gray-300">Security</p>
						<p class="text-sm text-gray-400">Protected</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
