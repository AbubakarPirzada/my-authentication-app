import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { users, passwordResetTokens } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { sendPasswordResetEmail } from '$lib/server/email';
import { generateSecureToken, generateTokenId, generateTokenExpiration } from '$lib/server/tokens';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth();
  
  // If no session exists, redirect to login
  if (!session?.user) {
    throw redirect(303, '/login');
  }

  // Fetch the latest user data from database
  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id!),
    columns: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      image: true,
    },
  });

  if (!user) {
    throw redirect(303, '/login');
  }

  return {
    user
  };
};

export const actions = {
  updateProfile: async ({ request, locals }) => {
    const session = await locals.auth();
    
    if (!session?.user?.id) {
      return fail(401, { error: 'Unauthorized' });
    }

    const data = await request.formData();
    const name = data.get('name') as string;

    // Basic validation
    if (!name || name.trim().length === 0) {
      return fail(400, { error: 'Name is required' });
    }

    if (name.trim().length > 100) {
      return fail(400, { error: 'Name must be less than 100 characters' });
    }

    try {
      // Update the user's name in the database
      await db
        .update(users)
        .set({
          name: name.trim(),
        })
        .where(eq(users.id, session.user.id));

      return {
        success: true,
        message: 'Profile updated successfully!'
      };
    } catch (error) {
      console.error('Profile update error:', error);
      return fail(500, { error: 'Failed to update profile. Please try again.' });
    }
  },

  requestPasswordReset: async ({ request, locals, url }) => {
    const session = await locals.auth();
    
    if (!session?.user?.id) {
      return fail(401, { passwordResetError: 'Unauthorized' });
    }

    try {
      // Get the user's email from the database
      const user = await db.query.users.findFirst({
        where: eq(users.id, session.user.id),
        columns: {
          id: true,
          email: true,
        },
      });

      if (!user) {
        return fail(400, { passwordResetError: 'User not found.' });
      }

      // Generate a secure reset token
      const resetToken = generateSecureToken();
      const tokenId = generateTokenId();
      const expirationTime = generateTokenExpiration();

      // Store the token with expiration in database
      try {
        await db.insert(passwordResetTokens).values({
          id: tokenId,
          email: user.email.toLowerCase(),
          token: resetToken,
          expires: expirationTime,
          used: null
        });
      } catch (dbError) {
        console.error('Error storing password reset token:', dbError);
        return fail(500, {
          passwordResetError: 'An error occurred while processing your request. Please try again.'
        });
      }

      // Send password reset email
      const baseUrl = url.origin;
      const emailResult = await sendPasswordResetEmail(user.email, resetToken, baseUrl);

      if (!emailResult.success) {
        console.error('Failed to send password reset email:', emailResult.error);
        // Remove the token from database since email failed
        await db.delete(passwordResetTokens).where(eq(passwordResetTokens.id, tokenId));
        
        return fail(500, {
          passwordResetError: 'Failed to send password reset email. Please try again later.'
        });
      }

      console.log('Password reset email sent successfully for profile user:', user.email);
      return { 
        passwordResetSent: true,
        userEmail: user.email
      };

    } catch (error) {
      console.error('Error in profile password reset process:', error);
      return fail(500, {
        passwordResetError: 'An unexpected error occurred. Please try again.'
      });
    }
  }
} satisfies Actions;
