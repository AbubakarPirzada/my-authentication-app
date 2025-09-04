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
<header class="bg-slate-900/95 backdrop-blur-sm shadow-lg border-b border-slate-700/50">
	<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<!-- App Title -->
			<div class="flex items-center">
				<a href="/" class="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all duration-200">
					🔐 Auth App
				</a>
			</div>
			
			<!-- Navigation Links -->
			<div class="flex items-center space-x-4">
				<!-- Public Navigation (always visible) -->
				<div class="hidden md:flex items-center space-x-4">
					<a 
						href="/about" 
						class="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
					>
						About
					</a>
					<a 
						href="/faq" 
						class="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
					>
						FAQ
					</a>
					<a 
						href="/contact" 
						class="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
					>
						Contact
					</a>
				</div>
				
				{#if data.session?.user}
					<!-- Authenticated User Navigation -->
					<div class="flex items-center space-x-4">
						<span class="text-sm text-gray-300">
							Welcome, {data.session.user.name || data.session.user.email}!
						</span>
						
						<a 
							href="/dashboard" 
							class="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
						>
							Dashboard
						</a>
						
						<a 
							href="/dashboard/profile" 
							class="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
						>
							Profile
						</a>
						
						<!-- AI Chat Link -->
						<a 
							href="/chat" 
							class="text-emerald-300 hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 border border-emerald-500/30 bg-emerald-500/10"
						>
							🤖 AI Chat
						</a>
						
						<!-- Chat Dashboard Link -->
						<a 
							href="/chat/dashboard" 
							class="text-blue-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 border border-blue-500/30 bg-blue-500/10"
						>
							📊 Chat Stats
						</a>
						
						<!-- Admin-only navigation -->
						{#if data.session.user?.role === 'admin'}
							<a 
								href="/admin" 
								class="text-red-300 hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 border border-red-500/30 bg-red-500/10"
							>
								Admin Panel
							</a>
						{/if}
						
						<button 
							onclick={() => signOut()}
							class="bg-slate-700 hover:bg-slate-600 text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
						>
							Sign Out
						</button>
					</div>
				{:else}
					<!-- Guest Navigation -->
					<div class="flex items-center space-x-4">
						<a 
							href="/register" 
							class="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
						>
							Register
						</a>
						<a 
							href="/login" 
							class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
						>
							Login
						</a>
					</div>
				{/if}
			</div>
		</div>
	</nav>
	
	<!-- Mobile Navigation Menu (hidden by default) -->
	<div class="md:hidden bg-slate-800/50 border-b border-slate-700/50 px-4 py-2">
		<div class="flex flex-wrap justify-center gap-4">
			<a 
				href="/about" 
				class="text-gray-300 hover:text-purple-400 text-sm font-medium transition-colors duration-200"
			>
				About
			</a>
			<a 
				href="/faq" 
				class="text-gray-300 hover:text-purple-400 text-sm font-medium transition-colors duration-200"
			>
				FAQ
			</a>
			<a 
				href="/contact" 
				class="text-gray-300 hover:text-purple-400 text-sm font-medium transition-colors duration-200"
			>
				Contact
			</a>
		</div>
	</div>
</header>

<!-- Main Content Area -->
<main class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
	
		{@render children()}
	 
</main>
