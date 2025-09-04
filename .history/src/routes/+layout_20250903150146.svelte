<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { signOut } from '@auth/sveltekit/client';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Header Navbar -->
<header class="bg-white shadow-sm border-b border-gray-200">
	<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<!-- App Title -->
			<div class="flex items-center">
				<a href="/" class="text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors duration-200">
					🔐 Auth App
				</a>
			</div>
			
			<!-- Navigation Links -->
			<div class="flex items-center space-x-4">
				<!-- Public Navigation (always visible) -->
				<div class="hidden md:flex items-center space-x-4">
					<a 
						href="/about" 
						class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
					>
						About
					</a>
					<a 
						href="/faq" 
						class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
					>
						FAQ
					</a>
					<a 
						href="/contact" 
						class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
					>
						Contact
					</a>
				</div>
				
				{#if data.session?.user}
					<!-- Authenticated User Navigation -->
					<div class="flex items-center space-x-4">
						<span class="text-sm text-gray-700">
							Welcome, {data.session.user.name || data.session.user.email}!
						</span>
						
						<a 
							href="/dashboard" 
							class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
						>
							Dashboard
						</a>
						
						<a 
							href="/dashboard/profile" 
							class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
						>
							Profile
						</a>
						
						<!-- Admin-only navigation -->
						{#if data.session.user?.role === 'admin'}
							<a 
								href="/admin" 
								class="text-red-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 border border-red-300 bg-red-50 rounded-lg"
							>
								🛡️ Admin Panel
							</a>
						{/if}
						
						<button 
							onclick={() => signOut()}
							class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
						>
							Sign Out
						</button>
					</div>
				{:else}
					<!-- Guest Navigation -->
					<div class="flex items-center space-x-4">
						<a 
							href="/register" 
							class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
						>
							Register
						</a>
						<a 
							href="/login" 
							class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
						>
							Login
						</a>
					</div>
				{/if}
			</div>
		</div>
	</nav>
	
	<!-- Mobile Navigation Menu (hidden by default) -->
	<div class="md:hidden bg-white border-b border-gray-200 px-4 py-2">
		<div class="flex flex-wrap justify-center gap-4">
			<a 
				href="/about" 
				class="text-gray-700 hover:text-indigo-600 text-sm font-medium transition-colors duration-200"
			>
				About
			</a>
			<a 
				href="/faq" 
				class="text-gray-700 hover:text-indigo-600 text-sm font-medium transition-colors duration-200"
			>
				FAQ
			</a>
			<a 
				href="/contact" 
				class="text-gray-700 hover:text-indigo-600 text-sm font-medium transition-colors duration-200"
			>
				Contact
			</a>
		</div>
	</div>
</header>

<!-- Main Content Area -->
<main class="min-h-screen bg-white">
	
		{@render children()}
	 
</main>
