<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Header Navbar -->
<header class="bg-gray-100 shadow-sm">
	<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<!-- App Title -->
			<div class="flex items-center">
				<h1 class="text-xl font-semibold text-gray-900">Auth App</h1>
			</div>
			
			<!-- Navigation Links -->
			<div class="flex space-x-4">
				<a 
					href="/register" 
					class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
				>
					Register
				</a>
				<a 
					href="/login" 
					class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
				>
					Login
				</a>
			</div>
		</div>
	</nav>
</header>

<!-- Main Content Area -->
<main class="min-h-screen bg-white">
	
		{@render children()}
	 
</main>
