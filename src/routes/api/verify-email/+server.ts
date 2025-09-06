import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { emailVerificationTokens, users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  const token = url.searchParams.get('token');

  if (!token) {
    // Redirect to error page with message
    redirect(302, '/login?error=invalid_verification_token');
  }

  try {
    // Find the verification token in the database
    const verificationRecord = await db.query.emailVerificationTokens.findFirst({
      where: eq(emailVerificationTokens.token, token),
    });

    if (!verificationRecord) {
      console.log('Verification token not found:', token);
      redirect(302, '/login?error=invalid_verification_token');
    }

    // Check if the token has expired
    const now = new Date();
    if (verificationRecord.expiresAt < now) {
      console.log('Verification token expired:', token);
      
      // Clean up expired token
      await db.delete(emailVerificationTokens).where(eq(emailVerificationTokens.token, token));
      
      redirect(302, '/login?error=verification_token_expired');
    }

    // Find the user associated with this token
    const user = await db.query.users.findFirst({
      where: eq(users.id, verificationRecord.userId),
    });

    if (!user) {
      console.error('User not found for verification token:', verificationRecord.userId);
      redirect(302, '/login?error=user_not_found');
    }

    // Update the user's emailVerified status
    await db
      .update(users)
      .set({ 
        emailVerified: new Date() 
      })
      .where(eq(users.id, verificationRecord.userId));

    // Delete the verification token (it's no longer needed)
    await db.delete(emailVerificationTokens).where(eq(emailVerificationTokens.token, token));

    console.log('Email verified successfully for user:', user.email);

    // Redirect to login page with success message
    redirect(302, '/login?verified=true');

  } catch (error) {
    console.error('Email verification error:', error);

    // For other errors, redirect to login with error message
    redirect(302, '/login?error=verification_failed');
  }
};
