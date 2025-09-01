<div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<!-- Header -->
		<div class="text-center">
			<h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">Your Profile</h2>
			<p class="mt-2 text-sm text-gray-600">
				Manage your account information
			</p>
		</div>

		<!-- Profile Form Card -->
		<div class="bg-white py-8 px-6 shadow-lg rounded-lg border border-gray-200">
			<form class="space-y-6">
				<!-- Email Field (Disabled) -->
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700 mb-2">
						Email Address
					</label>
					<input
						id="email"
						name="email"
						type="email"
						disabled
						class="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-500 placeholder-gray-400 bg-gray-50 cursor-not-allowed sm:text-sm"
						placeholder="user@example.com"
					/>
				</div>

				<!-- Full Name Field -->
				<div>
					<label for="fullName" class="block text-sm font-medium text-gray-700 mb-2">
						Full Name
					</label>
					<input
						id="fullName"
						name="fullName"
						type="text"
						autocomplete="name"
						class="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						placeholder="John Doe"
					/>
				</div>

				<!-- Submit Button -->
				<div>
					<button
						type="submit"
						class="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200"
					>
						Update Profile
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
