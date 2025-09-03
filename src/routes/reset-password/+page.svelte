<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	
	let { data, form }: { data: PageData; form: ActionData } = $props();

	let countdown = $state(3);
	let redirectTimer: NodeJS.Timeout;
	let showPassword = $state(false);
	let showConfirmPassword = $state(false);

	// Auto-redirect to login after successful password reset
	onMount(() => {
		if ((form as any)?.success && (form as any)?.resetComplete) {
			// Start countdown
			const countdownInterval = setInterval(() => {
				countdown--;
				if (countdown <= 0) {
					clearInterval(countdownInterval);
				}
			}, 1000);

			// Redirect to login after 3 seconds
			redirectTimer = setTimeout(() => {
				goto('/login?message=Password reset successful. Please sign in with your new password.');
			}, 3000);

			// Cleanup function
			return () => {
				clearInterval(countdownInterval);
				clearTimeout(redirectTimer);
			};
		}
	});
</script>

<svelte:head>
	<title>Reset Password - My Authentication App</title>
</svelte:head>

<div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gray-50">
	<div class="w-full max-w-md space-y-8">
		<!-- Header -->
		<div class="text-center">
			<h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">Set New Password</h2>
			<p class="mt-2 text-sm text-gray-600">
				Enter your new password below
			</p>
		</div>

		<!-- Form Card -->
		<div class="bg-white py-8 px-6 shadow-lg rounded-lg border border-gray-200">
			<!-- Success Message for Password Reset Complete -->
			{#if (form as any)?.success && (form as any)?.resetComplete}
				<div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-medium text-green-800">Password Reset Successful!</h3>
							<div class="mt-2 text-sm text-green-700">
								<p>{(form as any)?.message}</p>
								{#if (form as any)?.userWasLoggedIn}
									<p class="mt-2 font-medium text-orange-700">Please refresh the page or navigate to login to sign in with your new password.</p>
								{/if}
								<p class="mt-2 font-medium">Redirecting to login in {countdown} seconds...</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Login Button -->
				<div class="text-center">
					<a 
						href="/login" 
						class="inline-flex justify-center items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
					>
						Sign In Now
					</a>
				</div>

			<!-- Error Message -->
			{:else if data.error || form?.error}
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
								<p>{data.error || form?.error}</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Back to Forgot Password Link -->
				<div class="text-center">
					<a 
						href="/forgot-password" 
						class="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
					>
						<svg class="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
						</svg>
						Request New Reset Link
					</a>
				</div>
			{:else if data.valid}
				<!-- Success Info -->
				<div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-medium text-green-800">Valid Reset Token</h3>
							<div class="mt-2 text-sm text-green-700">
								<p>You can now set a new password for <strong>{data.email}</strong></p>
							</div>
						</div>
					</div>
				</div>

				<!-- Password Reset Form -->
				<form method="POST" action="?/reset" class="space-y-6" use:enhance>
					<input type="hidden" name="token" value={(form as any)?.token || data.token} />

					<!-- New Password Field -->
					<div>
						<label for="password" class="block text-sm font-medium text-gray-700 mb-2">
							New Password
						</label>
						<div class="relative">
							<input
								id="password"
								name="password"
								type={showPassword ? 'text' : 'password'}
								autocomplete="new-password"
								required
								class="block w-full rounded-md border-gray-300 px-3 py-2 pr-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								placeholder="Enter your new password"
								minlength="6"
							/>
							<button
								type="button"
								class="absolute inset-y-0 right-0 flex items-center pr-3"
								onclick={() => showPassword = !showPassword}
							>
								{#if showPassword}
									<svg class="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L5.636 5.636m4.242 4.242L19.121 19.121" />
									</svg>
								{:else}
									<svg class="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
									</svg>
								{/if}
							</button>
						</div>
						<p class="mt-1 text-xs text-gray-500">Must be at least 6 characters long</p>
					</div>

					<!-- Confirm Password Field -->
					<div>
						<label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
							Confirm New Password
						</label>
						<div class="relative">
							<input
								id="confirmPassword"
								name="confirmPassword"
								type={showConfirmPassword ? 'text' : 'password'}
								autocomplete="new-password"
								required
								class="block w-full rounded-md border-gray-300 px-3 py-2 pr-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								placeholder="Confirm your new password"
								minlength="6"
							/>
							<button
								type="button"
								class="absolute inset-y-0 right-0 flex items-center pr-3"
								onclick={() => showConfirmPassword = !showConfirmPassword}
							>
								{#if showConfirmPassword}
									<svg class="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L5.636 5.636m4.242 4.242L19.121 19.121" />
									</svg>
								{:else}
									<svg class="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
									</svg>
								{/if}
							</button>
						</div>
					</div>

					<!-- Submit Button -->
					<div>
						<button
							type="submit"
							class="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
						>
							Reset Password
						</button>
					</div>
				</form>
			{/if}
		</div>

		<!-- Back to Login -->
		<div class="text-center">
			<a 
				href="/login" 
				class="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
			>
				<svg class="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
				</svg>
				Back to Sign In
			</a>
		</div>
	</div>
</div>
