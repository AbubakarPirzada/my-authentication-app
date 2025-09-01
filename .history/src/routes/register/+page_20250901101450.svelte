<script lang="ts">
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<!-- Header -->
		<div class="text-center">
			<h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
			<p class="mt-2 text-sm text-gray-600">
				Already have an account?
				<a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
					Sign in
				</a>
			</p>
		</div>

		<!-- Registration Form Card -->
		<div class="bg-white py-8 px-6 shadow-lg rounded-lg border border-gray-200">
			<!-- Error Message -->
			{#if form?.error}
				<div class="mb-4 p-3 rounded-md bg-red-50 border border-red-200">
					<p class="text-sm text-red-600">{form.error}</p>
				</div>
			{/if}

			<form method="POST" action="?/register" class="space-y-6">
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
						class="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						placeholder="Enter your email"
					/>
				</div>

				<!-- Password Field -->
				<div>
					<label for="password" class="block text-sm font-medium text-gray-700 mb-2">
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="new-password"
						required
						class="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						placeholder="Enter your password"
					/>
				</div>

				<!-- Submit Button -->
				<div>
					<button
						type="submit"
						class="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200"
					>
						Sign Up
					</button>
				</div>
			</form>
		</div>

		<!-- Additional Links -->
		<div class="text-center">
			<p class="text-xs text-gray-500">
				By signing up, you agree to our
				<a href="/terms" class="text-indigo-600 hover:text-indigo-500">Terms of Service</a>
				and
				<a href="/privacy" class="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
			</p>
		</div>
	</div>
</div>
