<div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<!-- Header -->
		<div class="text-center">
			<div class="mx-auto h-12 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
				<svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
				</svg>
			</div>
			<h2 class="text-3xl font-bold tracking-tight text-white">Reset your password</h2>
			<p class="mt-2 text-sm text-gray-300">
				Remember your password?
				<a
					href="/login"
					class="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200"
				>
					Sign in
				</a>
			</p>
		</div>

		<!-- Password Reset Form Card -->
		<div class="bg-slate-800/50 backdrop-blur-sm py-8 px-6 shadow-2xl rounded-2xl border border-slate-700/50">
			<div class="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl backdrop-blur-sm">
				<div class="flex">
					<div class="flex-shrink-0">
						<svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
						</svg>
					</div>
					<div class="ml-3">
						<h3 class="text-sm font-medium text-blue-300">Password Reset Feature</h3>
						<div class="mt-2 text-sm text-blue-200">
							<p>This feature is coming soon! For now, please contact support if you need to reset your password.</p>
						</div>
					</div>
				</div>
			</div>

			<form method="POST" action="?/reset" class="space-y-6">
				<!-- Email Field -->
				<div>
					<label for="email" class="block text-sm font-medium text-gray-300 mb-2">
						Email address
					</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
							</svg>
						</div>
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							required
							disabled
							class="block w-full pl-10 pr-3 py-3 bg-slate-700/30 border border-slate-600 rounded-xl text-gray-400 placeholder-gray-500 cursor-not-allowed backdrop-blur-sm"
							placeholder="Enter your email address"
						/>
					</div>
				</div>

				<!-- Submit Button -->
				<div>
					<button
						type="submit"
						disabled
						class="group relative flex w-full justify-center items-center rounded-xl bg-slate-600/50 px-6 py-3 text-sm font-semibold text-gray-400 cursor-not-allowed backdrop-blur-sm border border-slate-600"
					>
						<svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						Send Reset Email (Coming Soon)
					</button>
				</div>
			</form>
		</div>

		<!-- Back to Login -->
		<div class="text-center">
			<a 
				href="/login" 
				class="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200"
			>
				<svg class="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
				</svg>
				Back to Sign In
			</a>
		</div>
	</div>
</div>
