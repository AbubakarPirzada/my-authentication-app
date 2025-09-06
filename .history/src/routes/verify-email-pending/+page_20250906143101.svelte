<div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<!-- Header -->
		<div class="text-center">
			<div class="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6">
				<svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
				</svg>
			</div>
			<h2 class="text-3xl font-bold tracking-tight text-white">Check your email</h2>
			<p class="mt-2 text-lg text-gray-300">
				We've sent you a verification link
			</p>
		</div>

		<!-- Main Content Card -->
		<div class="bg-slate-800/50 backdrop-blur-sm py-8 px-6 shadow-2xl rounded-2xl border border-slate-700/50">
			<div class="text-center space-y-6">
				<!-- Success Icon -->
				<div class="mx-auto h-12 w-12 bg-emerald-500/10 rounded-full flex items-center justify-center">
					<svg class="h-6 w-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
					</svg>
				</div>

				<!-- Main Message -->
				<div class="space-y-3">
					<h3 class="text-xl font-semibold text-white">Registration successful!</h3>
					<p class="text-gray-300 text-sm">
						We've sent a verification email to your inbox. Please click the link in the email to verify your account and complete the registration process.
					</p>
				</div>

				<!-- Instructions -->
				<div class="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
					<div class="flex items-start space-x-3">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5 text-blue-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<div class="text-left">
							<h4 class="text-sm font-medium text-blue-300 mb-2">Next steps:</h4>
							<ul class="text-sm text-blue-200 space-y-1">
								<li>• Check your email inbox (and spam folder)</li>
								<li>• Click the verification link</li>
								<li>• Return here to sign in</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- Important Notes -->
				<div class="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
					<div class="flex items-start space-x-3">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5 text-amber-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
							</svg>
						</div>
						<div class="text-left">
							<h4 class="text-sm font-medium text-amber-300 mb-2">Important:</h4>
							<ul class="text-sm text-amber-200 space-y-1">
								<li>• The verification link expires in 24 hours</li>
								<li>• You can't sign in until your email is verified</li>
								<li>• Didn't receive the email? Check your spam folder</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- Action Buttons -->
				<div class="space-y-3">
					<a 
						href="/login" 
						class="w-full flex justify-center items-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white hover:from-purple-700 hover:to-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
					>
						<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
						</svg>
						Go to Sign In
					</a>

					<a 
						href="/register" 
						class="w-full flex justify-center items-center rounded-xl bg-slate-700/50 border border-slate-600 px-6 py-3 text-sm font-medium text-gray-300 hover:bg-slate-600/50 hover:border-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 transition-all duration-200"
					>
						<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3" />
						</svg>
						Register Different Email
					</a>
				</div>
			</div>
		</div>

		<!-- Help Text -->
		<div class="text-center">
			<p class="text-xs text-gray-400">
				Need help? 
				<a href="/contact" class="text-purple-400 hover:text-purple-300 transition-colors duration-200">Contact Support</a>
			</p>
		</div>
	</div>
</div>
