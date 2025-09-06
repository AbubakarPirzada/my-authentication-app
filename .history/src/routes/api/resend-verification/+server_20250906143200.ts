import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { emailVerificationTokens, users } from '$lib/server/db/schema';
import { sendEmailVerification } from '$lib/server/email';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { email } = await request.json();

    if (!email) {
      return json({ error: 'Email is required' }, { status: 400 });
    }

    // Find the user
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      // Don't reveal if the email exists or not for security
      return json({ success: 'If an account exists with this email, a verification email will be sent.' });
    }

    // Check if email is already verified
    if (user.emailVerified) {
      return json({ error: 'This email is already verified.' }, { status: 400 });
    }

    // Delete any existing verification tokens for this user
    await db.delete(emailVerificationTokens).where(eq(emailVerificationTokens.userId, user.id));

    // Generate a new verification token
    const verificationToken = crypto.randomUUID();

    // Calculate expiration time (24 hours from now)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // Store the new verification token
    await db.insert(emailVerificationTokens).values({
      token: verificationToken,
      userId: user.id,
      email: email,
      expiresAt: expiresAt,
    });

    // Send verification email
    const emailSent = await sendEmailVerification(email, verificationToken);
    
    if (!emailSent) {
      console.error('Failed to resend verification email for user:', email);
      return json({ error: 'Failed to send verification email. Please try again later.' }, { status: 500 });
    }

    console.log('Verification email resent successfully for user:', email);

    return json({ success: 'If an account exists with this email, a verification email will be sent.' });

  } catch (error) {
    console.error('Resend verification error:', error);
    return json({ error: 'Failed to resend verification email. Please try again later.' }, { status: 500 });
  }
};
