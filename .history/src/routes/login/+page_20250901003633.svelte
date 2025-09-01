<div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gray-50">
	<div class="w-full max-w-md space-y-8">
		<!-- Header -->
		<div class="text-center">
			<h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
			<p class="mt-2 text-sm text-gray-600">
				Don't have an account?
				<a
					href="/register"
					class="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
				>
					Sign up
				</a>
			</p>
		</div>

		<!-- Login Form Card -->
		<div class="bg-white py-8 px-6 shadow-lg rounded-lg border border-gray-200">
			<!--
        **FIX #1: Added method="POST" and the correct action attribute.
        This tells the form to send the data to the Auth.js credentials handler.
      -->
			<form class="space-y-6" method="POST" action="/auth/callback/credentials">
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
						autocomplete="current-password"
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
						Log In
					</button>
				</div>
			</form>
		</div>

		<!-- Additional Links -->
		<div class="text-center">
			<p class="text-xs text-gray-500">
				<!--
          **FIX #2: Changed href="#" to a valid path.
          This will remove the a11y warning in your terminal.
        -->
				<a href="/forgot-password" class="text-indigo-600 hover:text-indigo-500"
					>Forgot your password?</a
				>
			</p>
		</div>
	</div>
</div>