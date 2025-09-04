<script>
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>About Us - Auth App</title>
  <meta name="description" content="Learn more about our secure authentication platform and our mission to provide reliable user management solutions." />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
  <!-- Hero Section -->
  <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <div class="mx-auto h-20 w-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
          <svg class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 class="text-4xl md:text-6xl font-bold mb-6">About Our Platform</h1>
        <p class="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
          Building secure, scalable authentication solutions for modern applications
        </p>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <!-- Mission Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
      <div>
        <h2 class="text-3xl font-bold text-white mb-6">Our Mission</h2>
        <p class="text-lg text-gray-300 mb-4">
          We are dedicated to providing secure, user-friendly authentication solutions that protect your data while delivering seamless user experiences.
        </p>
        <p class="text-lg text-gray-300 mb-4">
          Our platform combines cutting-edge security practices with intuitive design, ensuring that both users and administrators can manage authentication with confidence.
        </p>
        <p class="text-lg text-gray-300">
          Built with modern technologies like SvelteKit, Drizzle ORM, and PostgreSQL, our solution is designed for scalability and performance.
        </p>
      </div>
      <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-8">
        <h3 class="text-xl font-semibold text-white mb-4">Key Features</h3>
        <ul class="space-y-3">
          <li class="flex items-center">
            <svg class="h-5 w-5 text-emerald-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-300">Secure password authentication</span>
          </li>
          <li class="flex items-center">
            <svg class="h-5 w-5 text-emerald-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-300">Role-based access control</span>
          </li>
          <li class="flex items-center">
            <svg class="h-5 w-5 text-emerald-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-300">Admin user management</span>
          </li>
          <li class="flex items-center">
            <svg class="h-5 w-5 text-emerald-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-300">Database management with Drizzle Studio</span>
          </li>
          <li class="flex items-center">
            <svg class="h-5 w-5 text-emerald-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-300">Modern, responsive design</span>
          </li>
          <li class="flex items-center">
            <svg class="h-5 w-5 text-emerald-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-300">Type-safe development with TypeScript</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Technology Stack -->
    <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-8 mb-16">
      <h2 class="text-3xl font-bold text-white mb-8 text-center">Built With Modern Technology</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center shadow-lg">
            <span class="text-2xl font-bold text-white">S</span>
          </div>
          <h3 class="font-semibold text-white">SvelteKit</h3>
          <p class="text-sm text-gray-300">Full-stack framework</p>
        </div>
        <div class="text-center">
          <div class="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center shadow-lg">
            <span class="text-2xl font-bold text-white">D</span>
          </div>
          <h3 class="font-semibold text-white">Drizzle ORM</h3>
          <p class="text-sm text-gray-300">Type-safe database</p>
        </div>
        <div class="text-center">
          <div class="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center shadow-lg">
            <span class="text-2xl font-bold text-white">P</span>
          </div>
          <h3 class="font-semibold text-white">PostgreSQL</h3>
          <p class="text-sm text-gray-300">Reliable database</p>
        </div>
        <div class="text-center">
          <div class="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center shadow-lg">
            <span class="text-2xl font-bold text-white">A</span>
          </div>
          <h3 class="font-semibold text-white">Auth.js</h3>
          <p class="text-sm text-gray-300">Authentication library</p>
        </div>
      </div>
    </div>

    <!-- Security Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
      <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-8">
        <div class="flex items-center mb-6">
          <div class="bg-gradient-to-r from-red-500 to-pink-500 rounded-full p-3 mr-4">
            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white">Security First</h3>
        </div>
        <p class="text-gray-300 mb-4">
          We implement industry-standard security practices including password hashing with bcrypt, JWT session management, and role-based access control.
        </p>
        <ul class="text-sm text-gray-300 space-y-2">
          <li>• Secure password hashing</li>
          <li>• JWT token authentication</li>
          <li>• Role-based permissions</li>
          <li>• Session management</li>
        </ul>
      </div>
      <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-8">
        <div class="flex items-center mb-6">
          <div class="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-3 mr-4">
            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white">Performance</h3>
        </div>
        <p class="text-gray-300 mb-4">
          Built for speed and scalability with modern web technologies and optimized database queries.
        </p>
        <ul class="text-sm text-gray-300 space-y-2">
          <li>• Fast SvelteKit performance</li>
          <li>• Efficient database queries</li>
          <li>• Responsive design</li>
          <li>• Optimized for all devices</li>
        </ul>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-12 shadow-2xl">
      <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
      <p class="text-xl mb-8 opacity-90">
        Join our platform today and experience secure, reliable authentication.
      </p>
      <div class="space-x-4">
        <a 
          href="/register" 
          class="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-purple-600 font-medium rounded-xl transition-all duration-200 backdrop-blur-sm"
        >
          Sign Up Now
        </a>
        <a 
          href="/contact" 
          class="inline-flex items-center px-8 py-3 bg-white text-purple-600 hover:bg-gray-100 font-medium rounded-xl transition-all duration-200 shadow-lg"
        >
          Contact Us
        </a>
      </div>
    </div>
  </div>
</div>
