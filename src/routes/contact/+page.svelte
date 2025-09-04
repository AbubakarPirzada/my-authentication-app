<script>
  import { page } from '$app/stores';
  
  let formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  let isSubmitting = false;
  let submitMessage = '';
  
  function handleSubmit() {
    isSubmitting = true;
    
    // Simulate form submission
    setTimeout(() => {
      isSubmitting = false;
      submitMessage = 'Thank you for your message! We\'ll get back to you soon.';
      formData = { name: '', email: '', subject: '', message: '' };
      
      // Clear message after 5 seconds
      setTimeout(() => {
        submitMessage = '';
      }, 5000);
    }, 1000);
  }
</script>

<svelte:head>
  <title>Contact Us - Auth App</title>
  <meta name="description" content="Get in touch with our team. Contact us for support, questions, or feedback about our authentication platform." />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
  <!-- Hero Section -->
  <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <div class="mx-auto h-20 w-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
          <svg class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 class="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
        <p class="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
          We're here to help! Get in touch with our team
        </p>
      </div>
    </div>
  </div>

  <!-- Contact Content -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Contact Information -->
      <div class="space-y-8">
        <div>
          <h2 class="text-3xl font-bold text-white mb-6">Get In Touch</h2>
          <p class="text-lg text-gray-300 mb-8">
            Have questions about our platform? Need support? Want to provide feedback? 
            We'd love to hear from you! Reach out using any of the methods below.
          </p>
        </div>

        <!-- Contact Methods -->
        <div class="space-y-6">
          <!-- Phone -->
          <div class="flex items-start space-x-4">
            <div class="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-3 flex-shrink-0">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-white">Phone Support</h3>
              <p class="text-gray-300 mb-2">Call us for immediate assistance</p>
              <a href="tel:0300-000000" class="text-emerald-400 hover:text-emerald-300 font-medium text-lg transition-colors duration-200">
                0300-000000
              </a>
              <p class="text-sm text-gray-400 mt-1">Available Monday - Friday, 9 AM - 6 PM</p>
            </div>
          </div>

          <!-- Email -->
          <div class="flex items-start space-x-4">
            <div class="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-3 flex-shrink-0">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-white">Email Support</h3>
              <p class="text-gray-300 mb-2">Send us an email anytime</p>
              <a href="mailto:vanar@bigimmersive.com" class="text-blue-400 hover:text-blue-300 font-medium text-lg transition-colors duration-200">
                vanar@bigimmersive.com
              </a>
              <p class="text-sm text-gray-400 mt-1">We typically respond within 24 hours</p>
            </div>
          </div>

          <!-- Location -->
          <div class="flex items-start space-x-4">
            <div class="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 flex-shrink-0">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-white">Office Location</h3>
              <p class="text-gray-300 mb-2">Visit us during business hours</p>
              <p class="text-gray-200">Big Immersive<br>Authentication Solutions</p>
              <p class="text-sm text-gray-400 mt-1">Monday - Friday, 9 AM - 6 PM</p>
            </div>
          </div>
        </div>

        <!-- Support Categories -->
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-6">
          <h3 class="text-xl font-semibold text-white mb-4">How Can We Help?</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-center space-x-3">
              <svg class="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-300">Technical Support</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-300">Account Issues</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-300">Feature Requests</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-300">General Inquiries</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-300">Admin Training</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-300">Security Questions</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-8">
        <h2 class="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
        
        {#if submitMessage}
          <div class="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl backdrop-blur-sm">
            <div class="flex items-center">
              <svg class="h-5 w-5 text-emerald-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <p class="text-emerald-300">{submitMessage}</p>
            </div>
          </div>
        {/if}

        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-300 mb-2">
              Full Name *
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                id="name"
                bind:value={formData.name}
                required
                class="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                placeholder="Your full name"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
              Email Address *
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                bind:value={formData.email}
                required
                class="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <label for="subject" class="block text-sm font-medium text-gray-300 mb-2">
              Subject *
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <select
                id="subject"
                bind:value={formData.subject}
                required
                class="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm appearance-none"
              >
                <option value="">Select a subject</option>
                <option value="technical-support">Technical Support</option>
                <option value="account-issues">Account Issues</option>
                <option value="feature-request">Feature Request</option>
                <option value="admin-training">Admin Training</option>
                <option value="security">Security Questions</option>
                <option value="general">General Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-gray-300 mb-2">
              Message *
            </label>
            <div class="relative">
              <div class="absolute top-3 left-3 flex items-start pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <textarea
                id="message"
                bind:value={formData.message}
                required
                rows="5"
                class="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm resize-none"
                placeholder="Please describe your question or issue in detail..."
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            class="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div class="mt-6 pt-6 border-t border-slate-600">
          <p class="text-sm text-gray-400 text-center">
            * Required fields. We respect your privacy and will never share your information.
          </p>
        </div>
      </div>
    </div>

    <!-- FAQ Link -->
    <div class="mt-16 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8 shadow-2xl">
      <h2 class="text-2xl font-bold mb-4">Before You Contact Us</h2>
      <p class="text-xl mb-6 opacity-90">
        Check out our FAQ section for quick answers to common questions.
      </p>
      <a 
        href="/faq" 
        class="inline-flex items-center px-6 py-3 bg-white text-purple-600 hover:bg-gray-100 font-medium rounded-xl transition-all duration-200 shadow-lg"
      >
        <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        View FAQ
      </a>
    </div>
  </div>
</div>
