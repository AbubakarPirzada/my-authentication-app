import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { users, emailVerificationTokens } from '$lib/server/db/schema';
import { sendEmailVerification } from '$lib/server/email';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

export const actions = {
  register: async ({ request }) => {
    // Get the form data from the user's request
    const data = await request.formData();
    
    // Extract the email and password fields
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    // Basic validation
    if (!email || !password) {
      return {
        error: 'Email and password are required'
      };
    }

    if (password.length < 6) {
      return {
        error: 'Password must be at least 6 characters long'
      };
    }

    try {
      // Check if user already exists
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (existingUser) {
        return {
          error: 'A user with this email already exists'
        };
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Generate a unique ID for the user
      const userId = crypto.randomUUID();

      // Create the user in the database with emailVerified set to NULL
      await db.insert(users).values({
        id: userId,
        email: email,
        hashedPassword: hashedPassword,
        name: email.split('@')[0], // Use email prefix as default name
        role: 'user', // Assign default user role
        emailVerified: null, // Email not verified yet
      });

      // Generate a secure verification token
      const verificationToken = crypto.randomUUID();

      // Calculate expiration time (24 hours from now)
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      // Store the verification token in the database
      await db.insert(emailVerificationTokens).values({
        token: verificationToken,
        userId: userId,
        email: email,
        expiresAt: expiresAt,
      });

      // Send verification email
      const emailSent = await sendEmailVerification(email, verificationToken);
      
      if (!emailSent) {
        console.error('Failed to send verification email for user:', email);
        // Still consider registration successful, but inform user about email issue
        return {
          success: 'Registration successful! However, there was an issue sending the verification email. Please contact support.',
          showEmailIssue: true
        };
      }

      console.log('User registered successfully:', email);

      // Return success response instead of redirecting
      return {
        success: 'Registration successful! Please check your email for a verification link.',
        requiresVerification: true
      };
      
    } catch (error) {
      console.error('Registration error:', error);
      
      return {
        error: 'Registration failed. Please try again.'
      };
    }
  }
} satisfies Actions;