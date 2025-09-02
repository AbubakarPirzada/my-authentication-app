<script>
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>About Us - Auth App</title>
  <meta name="description" content="Learn more about our secure authentication platform and our mission to provide reliable user management solutions." />
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Hero Section -->
  <div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
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
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <p class="text-lg text-gray-600 mb-4">
          We are dedicated to providing secure, user-friendly authentication solutions that protect your data while delivering seamless user experiences.
        </p>
        <p class="text-lg text-gray-600 mb-4">
          Our platform combines cutting-edge security practices with intuitive design, ensuring that both users and administrators can manage authentication with confidence.
        </p>
        <p class="text-lg text-gray-600">
          Built with modern technologies like SvelteKit, Drizzle ORM, and PostgreSQL, our solution is designed for scalability and performance.
        </p>
      </div>
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
        <ul class="space-y-3">
          <li class="flex items-center">
            <svg class="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-700">Secure password authentication</span>
          </li>
          <li class="flex items-center">
            <svg class="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-700">Role-based access control</span>
          </li>
          <li class="flex items-center">
            <svg class="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-700">Admin user management</span>
          </li>
          <li class="flex items-center">
            <svg class="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-700">Database management with Drizzle Studio</span>
          </li>
          <li class="flex items-center">
            <svg class="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-700">Modern, responsive design</span>
          </li>
          <li class="flex items-center">
            <svg class="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-700">Type-safe development with TypeScript</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Technology Stack -->
    <div class="bg-white rounded-lg shadow-lg p-8 mb-16">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Built With Modern Technology</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
            <span class="text-2xl font-bold text-orange-600">S</span>
          </div>
          <h3 class="font-semibold text-gray-900">SvelteKit</h3>
          <p class="text-sm text-gray-600">Full-stack framework</p>
        </div>
        <div class="text-center">
          <div class="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
            <span class="text-2xl font-bold text-green-600">D</span>
          </div>
          <h3 class="font-semibold text-gray-900">Drizzle ORM</h3>
          <p class="text-sm text-gray-600">Type-safe database</p>
        </div>
        <div class="text-center">
          <div class="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
            <span class="text-2xl font-bold text-blue-600">P</span>
          </div>
          <h3 class="font-semibold text-gray-900">PostgreSQL</h3>
          <p class="text-sm text-gray-600">Reliable database</p>
        </div>
        <div class="text-center">
          <div class="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
            <span class="text-2xl font-bold text-purple-600">A</span>
          </div>
          <h3 class="font-semibold text-gray-900">Auth.js</h3>
          <p class="text-sm text-gray-600">Authentication library</p>
        </div>
      </div>
    </div>

    <!-- Security Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <div class="flex items-center mb-6">
          <div class="bg-red-100 rounded-full p-3 mr-4">
            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900">Security First</h3>
        </div>
        <p class="text-gray-600 mb-4">
          We implement industry-standard security practices including password hashing with bcrypt, JWT session management, and role-based access control.
        </p>
        <ul class="text-sm text-gray-600 space-y-2">
          <li>• Secure password hashing</li>
          <li>• JWT token authentication</li>
          <li>• Role-based permissions</li>
          <li>• Session management</li>
        </ul>
      </div>
      <div class="bg-white rounded-lg shadow-lg p-8">
        <div class="flex items-center mb-6">
          <div class="bg-green-100 rounded-full p-3 mr-4">
            <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900">Performance</h3>
        </div>
        <p class="text-gray-600 mb-4">
          Built for speed and scalability with modern web technologies and optimized database queries.
        </p>
        <ul class="text-sm text-gray-600 space-y-2">
          <li>• Fast SvelteKit performance</li>
          <li>• Efficient database queries</li>
          <li>• Responsive design</li>
          <li>• Optimized for all devices</li>
        </ul>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-12">
      <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
      <p class="text-xl mb-8 opacity-90">
        Join our platform today and experience secure, reliable authentication.
      </p>
      <div class="space-x-4">
        <a 
          href="/register" 
          class="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-medium rounded-lg transition-colors duration-200"
        >
          Sign Up Now
        </a>
        <a 
          href="/contact" 
          class="inline-flex items-center px-8 py-3 bg-white text-indigo-600 hover:bg-gray-100 font-medium rounded-lg transition-colors duration-200"
        >
          Contact Us
        </a>
      </div>
    </div>
  </div>
</div>
