<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	export let form: ActionData;
</script>

<div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gray-50">
	<div class="w-full max-w-md space-y-8">
		<!-- Header -->
		<div class="text-center">
			<h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">Reset your password</h2>
			<p class="mt-2 text-sm text-gray-600">
				Remember your password?
				<a
					href="/login"
					class="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
				>
					Sign in
				</a>
			</p>
		</div>

		<!-- Password Reset Form Card -->
		<div class="bg-white py-8 px-6 shadow-lg rounded-lg border border-gray-200">
			<!-- Success Message -->
			{#if form?.success}
				<div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-medium text-green-800">Email Sent!</h3>
							<div class="mt-2 text-sm text-green-700">
								<p>{form.message}</p>
							</div>
						</div>
					</div>
				</div>
			{:else}
				<!-- Instructions -->
				<div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-medium text-blue-800">Password Reset</h3>
							<div class="mt-2 text-sm text-blue-700">
								<p>Enter your email address and we'll send you a link to reset your password.</p>
							</div>
						</div>
					</div>
				</div>
			{/if}

			<!-- Error Message -->
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

			<form method="POST" action="?/reset" class="space-y-6" use:enhance>
				<!-- Email Field -->
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700 mb-2">
						Email address
					</label>
					<input
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						required
						value={form?.email || ''}
						class="block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						placeholder="Enter your email address"
					/>
				</div>

				<!-- Submit Button -->
				<div>
					<button
						type="submit"
						class="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
					>
						Send Reset Email
					</button>
				</div>
			</form>
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
