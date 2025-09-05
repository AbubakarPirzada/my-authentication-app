// src/routes/forgot-password/+page.server.ts

import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users, passwordResetTokens } from '$lib/server/db/schema';
import { sendPasswordResetEmail } from '$lib/server/email';
import { eq } from 'drizzle-orm';
import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import type { Actions } from './$types';

export const actions: Actions = {
	sendResetEmail: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');

		// Basic validation
		if (!email || typeof email !== 'string') {
			return fail(400, {
				fieldErrors: { email: 'Email is required' },
				email: email as string
			});
		}

		// Email format validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return fail(400, {
				fieldErrors: { email: 'Please enter a valid email address' },
				email
			});
		}

		try {
			// Check if user exists (but don't reveal if they don't for security)
			const user = await db.query.users.findFirst({
				where: eq(users.email, email.toLowerCase().trim())
			});

			// Always return success to prevent email enumeration attacks
			// But only send email if user actually exists
			if (user) {
				// Generate a secure random token
				const token = randomBytes(32).toString('hex');
				
				// Hash the token before storing (additional security layer)
				const hashedToken = await bcrypt.hash(token, 12);
				
				// Set expiration to 1 hour from now
				const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
				
				// Delete any existing reset tokens for this user
				await db.delete(passwordResetTokens).where(eq(passwordResetTokens.userId, user.id));
				
				// Store the hashed token in database
				await db.insert(passwordResetTokens).values({
					token: hashedToken,
					userId: user.id,
					expiresAt
				});
				
				// Send the unhashed token via email
				const emailSent = await sendPasswordResetEmail(email, token);
				
				if (!emailSent) {
					console.error('Failed to send password reset email to:', email);
					// Still return success to user to prevent information disclosure
				}
			}

			// Always return success regardless of whether user exists or email was sent
			return {
				success: true,
				message: 'If an account with that email exists, you will receive a password reset link shortly.'
			};

		} catch (error) {
			console.error('Error in password reset process:', error);
			
			// Return generic error to prevent information disclosure
			return fail(500, {
				error: 'An error occurred while processing your request. Please try again later.',
				email
			});
		}
	}
};