import type { Actions } from './$types';

export const actions = {
  // This name 'register' can be anything, but it's good practice to name it after its function
  register: async ({ request }) => {
    // Get the form data from the user's request
    const data = await request.formData();
    
    // Extract the email and password fields
    const email = data.get('email');
    const password = data.get('password');

    // THIS IS OUR "CHECK" FOR NOW
    // We will print the data to the server console (your terminal)
    console.log('New user trying to register:');
    console.log('Email:', email);
    console.log('Password:', password);
    
    // We will add database logic here later...

    // For now, just return a success message
    return { success: true, message: 'Registration form submitted!' };
  }
} satisfies Actions;