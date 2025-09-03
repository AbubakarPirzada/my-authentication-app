<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	
	let isSubmitting = $state(false);
</script>

<div class="min-h-screen bg-gray-50 py-12">
	<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-gray-900">Profile Settings</h1>
			<p class="mt-2 text-gray-600">Manage your account information and preferences.</p>
		</div>

		<!-- Profile Form -->
		<div class="bg-white shadow rounded-lg">
			<div class="px-6 py-8">
				<!-- Success Message -->
				{#if form?.success}
					<div class="mb-6 p-4 rounded-md bg-green-50 border border-green-200">
						<div class="flex">
							<div class="flex-shrink-0">
								<svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
								</svg>
							</div>
							<div class="ml-3">
								<p class="text-sm font-medium text-green-800">{form.message}</p>
							</div>
						</div>
					</div>
				{/if}

				<!-- Error Message -->
				{#if form?.error}
					<div class="mb-6 p-4 rounded-md bg-red-50 border border-red-200">
						<div class="flex">
							<div class="flex-shrink-0">
								<svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
								</svg>
							</div>
							<div class="ml-3">
								<p class="text-sm font-medium text-red-800">{form.error}</p>
							</div>
						</div>
					</div>
				{/if}

				<form 
					method="POST" 
					action="?/updateProfile"
					use:enhance={() => {
						isSubmitting = true;
						return async ({ update }) => {
							isSubmitting = false;
							await update();
						};
					}}
					class="space-y-6"
				>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<!-- Name Field -->
						<div class="md:col-span-2">
							<label for="name" class="block text-sm font-medium text-gray-700 mb-2">
								Full Name
							</label>
							<input
								id="name"
								name="name"
								type="text"
								required
								value={data.user.name || ''}
								class="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
								placeholder="Enter your full name"
							/>
						</div>

						<!-- Email Field (Read-only) -->
						<div class="md:col-span-2">
							<label for="email" class="block text-sm font-medium text-gray-700 mb-2">
								Email Address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								readonly
								value={data.user.email}
								class="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-500 bg-gray-50 cursor-not-allowed sm:text-sm"
							/>
							<p class="mt-1 text-xs text-gray-500">Email cannot be changed. Contact support if you need to update your email.</p>
						</div>
					</div>

					<!-- Account Information -->
					<div class="border-t border-gray-200 pt-6">
						<h3 class="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
							<div>
								<span class="font-medium text-gray-700">Account ID:</span>
								<span class="ml-2 text-gray-600 font-mono text-xs">{data.user.id}</span>
							</div>
							<div>
								<span class="font-medium text-gray-700">Email Status:</span>
								<span class="ml-2">
									{#if data.user.emailVerified}
										<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
											<svg class="mr-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
											</svg>
											Verified
										</span>
									{:else}
										<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
											<svg class="mr-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
											</svg>
											Unverified
										</span>
									{/if}
								</span>
							</div>
						</div>
					</div>

					<!-- Save Button -->
					<div class="flex justify-end pt-6 border-t border-gray-200">
						<button
							type="submit"
							disabled={isSubmitting}
							class="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
						>
							{#if isSubmitting}
								<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Saving...
							{:else}
								<svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								Save Changes
							{/if}
						</button>
					</div>
				</form>
			</div>
		</div>

		<!-- Password Management Section -->
		<div class="bg-white shadow rounded-lg mt-8">
			<div class="px-6 py-8">
				<div class="border-b border-gray-200 pb-6">
					<h3 class="text-lg font-medium text-gray-900 mb-2">Password & Security</h3>
					<p class="text-sm text-gray-600">Manage your account password and security settings.</p>
				</div>

				<!-- Change Password Success Message -->
				{#if (form as any)?.passwordResetSent}
					<div class="mt-6 p-4 rounded-md bg-green-50 border border-green-200">
						<div class="flex">
							<div class="flex-shrink-0">
								<svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
								</svg>
							</div>
							<div class="ml-3">
								<h3 class="text-sm font-medium text-green-800">Password Reset Email Sent!</h3>
								<div class="mt-2 text-sm text-green-700">
									<p>We've sent a password reset link to <strong>{data.user.email}</strong>. Please check your email and follow the instructions to change your password.</p>
									<p class="mt-2 font-medium">You will need to log in again once you complete the password change.</p>
								</div>
							</div>
						</div>
					</div>
				{/if}

				<!-- Change Password Error Message -->
				{#if (form as any)?.passwordResetError}
					<div class="mt-6 p-4 rounded-md bg-red-50 border border-red-200">
						<div class="flex">
							<div class="flex-shrink-0">
								<svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
								</svg>
							</div>
							<div class="ml-3">
								<h3 class="text-sm font-medium text-red-800">Error</h3>
								<div class="mt-2 text-sm text-red-700">
									<p>{(form as any).passwordResetError}</p>
								</div>
							</div>
						</div>
					</div>
				{/if}

				<div class="mt-6">
					<div class="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
						<div class="flex">
							<div class="flex-shrink-0">
								<svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
								</svg>
							</div>
							<div class="ml-3">
								<h3 class="text-sm font-medium text-blue-800">How Password Change Works</h3>
								<div class="mt-2 text-sm text-blue-700">
									<p>To change your password, we'll send a secure reset link to your email address. After setting your new password, please log in again with your new credentials.</p>
								</div>
							</div>
						</div>
					</div>

					<form method="POST" action="?/requestPasswordReset" use:enhance class="space-y-4">
						<div class="flex items-center justify-between p-4 bg-gray-50 rounded-md">
							<div>
								<h4 class="text-sm font-medium text-gray-900">Current Password</h4>
								<p class="text-sm text-gray-600">Last updated: Never shown for security</p>
							</div>
							<button
								type="submit"
								class="inline-flex items-center px-4 py-2 border border-indigo-300 rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
							>
								<svg class="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2m0 0V7a2 2 0 012-2h4a2 2 0 012 2v2m-6 6h4" />
								</svg>
								Change Password
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>

		<!-- Navigation -->
		<div class="mt-8 flex justify-center">
			<a 
				href="/dashboard" 
				class="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
			>
				<svg class="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
				</svg>
				Back to Dashboard
			</a>
		</div>
	</div>
</div>
