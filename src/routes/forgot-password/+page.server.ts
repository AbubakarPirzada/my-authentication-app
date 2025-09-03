import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { users, passwordResetTokens } from '$lib/server/db/schema';
import { sendPasswordResetEmail } from '$lib/server/email';
import { generateSecureToken, generateTokenId, generateTokenExpiration } from '$lib/server/tokens';

export const actions = {
  reset: async ({ request, url }) => {
    console.log('=== FORGOT PASSWORD ACTION CALLED ===');
    try {
      // Get the form data from the user's request
      const data = await request.formData();
      const email = data.get('email') as string;
      console.log('Form data received, email:', email);

      // 1. Validate the email
      if (!email || !email.includes('@')) {
        return fail(400, {
          email,
          error: 'Please provide a valid email address.'
        });
      }

      // 2. Check if user exists in database
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email.toLowerCase()))
        .limit(1);

      // Always return the same message for security (prevent email enumeration)
      const successMessage = 'If an account with that email exists, we\'ve sent a password reset link.';

      if (existingUser.length === 0) {
        // User doesn't exist, but we don't reveal this
        console.log('Password reset requested for non-existent email:', email);
        return { success: true, message: successMessage };
      }

      // 3. Generate a secure reset token
      const resetToken = generateSecureToken();
      const tokenId = generateTokenId();
      const expirationTime = generateTokenExpiration();

      // 4. Store the token with expiration in database
      try {
        await db.insert(passwordResetTokens).values({
          id: tokenId,
          email: email.toLowerCase(),
          token: resetToken,
          expires: expirationTime,
          used: null
        });
      } catch (dbError) {
        console.error('Error storing password reset token:', dbError);
        return fail(500, {
          email,
          error: 'An error occurred while processing your request. Please try again.'
        });
      }

      // 5. Send password reset email
      const baseUrl = url.origin;
      const emailResult = await sendPasswordResetEmail(email, resetToken, baseUrl);

      if (!emailResult.success) {
        console.error('Failed to send password reset email:', emailResult.error);
        // Remove the token from database since email failed
        await db.delete(passwordResetTokens).where(eq(passwordResetTokens.id, tokenId));
        
        return fail(500, {
          email,
          error: 'Failed to send password reset email. Please try again later.'
        });
      }

      console.log('Password reset email sent successfully for:', email);
      console.log('Returning success response with message:', successMessage);
      return { 
        success: true, 
        message: successMessage 
      };

    } catch (error) {
      console.error('Error in password reset process:', error);
      return fail(500, {
        error: 'An unexpected error occurred. Please try again.'
      });
    }
  }
} satisfies Actions;
