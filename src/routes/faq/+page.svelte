<script lang="ts">
  import { page } from '$app/stores';
  
  // FAQ data
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Register' button in the navigation menu. Fill in your email address and create a secure password. Your account will be created with 'user' role by default."
    },
    {
      question: "What is the difference between user and admin roles?",
      answer: "Users have access to the dashboard and profile management features. Admins have additional privileges including access to the admin panel, user management, and the ability to promote/demote other users."
    },
    {
      question: "How can I become an admin?",
      answer: "Only existing admins can promote users to admin status. Contact an administrator or use the create-admin script if you're setting up the system for the first time."
    },
    {
      question: "Is my password secure?",
      answer: "Yes! We use bcrypt hashing with a high salt round (12) to securely store your password. Your plain text password is never stored in our database."
    },
    {
      question: "What if I forget my password?",
      answer: "Currently, password reset functionality is not implemented. Please contact an administrator to reset your password. Future updates will include a forgot password feature."
    },
    {
      question: "Can I change my profile information?",
      answer: "Yes! Once logged in, go to your Dashboard and click on 'Profile' to update your name and other profile information."
    },
    {
      question: "How do I access the admin panel?",
      answer: "If you have admin privileges, you'll see an 'Admin Panel' button in the navigation menu when logged in. Only users with admin role can access this feature."
    },
    {
      question: "What can admins do in the admin panel?",
      answer: "Admins can view all users, see user statistics, promote users to admin status, demote admins to users, and delete user accounts. They have full user management capabilities."
    },
    {
      question: "Is my data safe?",
      answer: "Yes! We implement industry-standard security practices including secure password hashing, JWT session management, role-based access control, and use PostgreSQL for reliable data storage."
    },
    {
      question: "What technologies power this platform?",
      answer: "Our platform is built with SvelteKit for the frontend and backend, Drizzle ORM for type-safe database operations, PostgreSQL for data storage, Auth.js for authentication, and TypeScript for type safety."
    },
    {
      question: "Can I view the database directly?",
      answer: "Admins can use Drizzle Studio (accessible via npm run db:studio) to view and manage the database with a web-based interface. This is more user-friendly than traditional database tools."
    },
    {
      question: "How do I log out?",
      answer: "Click the 'Sign Out' button in the navigation menu when you're logged in. This will end your session and redirect you to the home page."
    },
    {
      question: "Can multiple people use admin accounts?",
      answer: "Yes, you can have multiple admin users. Each admin has the same privileges and can manage other users, including promoting new admins or demoting existing ones."
    },
    {
      question: "What happens if I delete a user account?",
      answer: "Deleting a user account permanently removes all their data from the system. This action cannot be undone, so please use this feature carefully."
    },
    {
      question: "Is there a mobile app?",
      answer: "Currently, we only offer a web-based platform. However, our responsive design works great on mobile devices and tablets through your web browser."
    }
  ];
  
  let openIndex: number | null = null;
  
  function toggleFAQ(index: number) {
    openIndex = openIndex === index ? null : index;
  }
</script>

<svelte:head>
  <title>Frequently Asked Questions - Auth App</title>
  <meta name="description" content="Find answers to common questions about our authentication platform, user management, and security features." />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
  <!-- Hero Section -->
  <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <div class="mx-auto h-20 w-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
          <svg class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 class="text-4xl md:text-6xl font-bold mb-6">Frequently Asked Questions</h1>
        <p class="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
          Get answers to common questions about our authentication platform
        </p>
      </div>
    </div>
  </div>

  <!-- FAQs Content -->
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <!-- Quick Links -->
    <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-6 mb-12">
      <h2 class="text-2xl font-bold text-white mb-4">Quick Navigation</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="#getting-started" class="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">Getting Started</a>
        <a href="#account-management" class="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">Account Management</a>
        <a href="#admin-features" class="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">Admin Features</a>
        <a href="#security" class="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">Security</a>
        <a href="#technical" class="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">Technical</a>
        <a href="/contact" class="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">Still have questions?</a>
      </div>
    </div>

    <!-- FAQ Items -->
    <div class="space-y-4">
      {#each faqs as faq, index}
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700/50">
          <button 
            class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset rounded-xl transition-all duration-200"
            on:click={() => toggleFAQ(index)}
          >
            <h3 class="text-lg font-medium text-white pr-4">{faq.question}</h3>
            <svg 
              class="h-5 w-5 text-gray-400 transform transition-transform duration-200 {openIndex === index ? 'rotate-180' : ''}"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {#if openIndex === index}
            <div class="px-6 pb-4">
              <p class="text-gray-300 leading-relaxed">{faq.answer}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Help Section -->
    <div class="mt-16 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-12 shadow-2xl">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white/20 backdrop-blur-sm rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <svg class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 class="text-3xl font-bold mb-4">Still Have Questions?</h2>
        <p class="text-xl mb-8 opacity-90">
          Can't find what you're looking for? We're here to help!
        </p>
        <div class="space-x-4">
          <a 
            href="/contact" 
            class="inline-flex items-center px-8 py-3 bg-white text-purple-600 hover:bg-gray-100 font-medium rounded-xl transition-all duration-200 shadow-lg"
          >
            Contact Support
          </a>
          <a 
            href="/about" 
            class="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-purple-600 font-medium rounded-xl transition-all duration-200 backdrop-blur-sm"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>

    <!-- Quick Tips -->
    <div class="mt-16">
      <h2 class="text-2xl font-bold text-white mb-8 text-center">Quick Tips</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700/50 p-6">
          <div class="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-3 w-12 h-12 mb-4 flex items-center justify-center">
            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Use Strong Passwords</h3>
          <p class="text-gray-300 text-sm">Create passwords with at least 6 characters including numbers and special characters.</p>
        </div>
        
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700/50 p-6">
          <div class="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-3 w-12 h-12 mb-4 flex items-center justify-center">
            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Keep Profile Updated</h3>
          <p class="text-gray-300 text-sm">Regularly update your profile information to ensure account security and better experience.</p>
        </div>
        
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700/50 p-6">
          <div class="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 w-12 h-12 mb-4 flex items-center justify-center">
            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Remember to Logout</h3>
          <p class="text-gray-300 text-sm">Always sign out when using shared or public computers to protect your account.</p>
        </div>
      </div>
    </div>
  </div>
</div>
