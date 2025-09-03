import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { eq, and } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { db } from '$lib/server/db';
import { users, passwordResetTokens } from '$lib/server/db/schema';
import { isTokenExpired, isValidTokenFormat } from '$lib/server/tokens';

export const load: PageServerLoad = async ({ url }) => {
	const token = url.searchParams.get('token');
	
	if (!token) {
		return {
			error: 'Reset token is required.'
		};
	}

	if (!isValidTokenFormat(token)) {
		return {
			error: 'Invalid reset token format.'
		};
	}

	// Check if token exists and is valid
	try {
		const tokenRecord = await db
			.select()
			.from(passwordResetTokens)
			.where(eq(passwordResetTokens.token, token))
			.limit(1);

		if (tokenRecord.length === 0) {
			return {
				error: 'Invalid or expired reset token.'
			};
		}

		const resetToken = tokenRecord[0];

		// Check if token has expired
		if (isTokenExpired(resetToken.expires)) {
			return {
				error: 'This reset token has expired. Please request a new password reset.'
			};
		}

		// Check if token has already been used
		if (resetToken.used) {
			return {
				error: 'This reset token has already been used. Please request a new password reset.'
			};
		}

		return {
			token,
			email: resetToken.email,
			valid: true
		};
	} catch (error) {
		console.error('Error validating reset token:', error);
		return {
			error: 'An error occurred while validating the reset token.'
		};
	}
};

export const actions = {
	reset: async ({ request, url, locals }) => {
		try {
			const data = await request.formData();
			const token = data.get('token') as string;
			const password = data.get('password') as string;
			const confirmPassword = data.get('confirmPassword') as string;

			// Validate inputs
			if (!token || !password || !confirmPassword) {
				return fail(400, {
					token,
					error: 'All fields are required.'
				});
			}

			if (password !== confirmPassword) {
				return fail(400, {
					token,
					error: 'Passwords do not match.'
				});
			}

			if (password.length < 6) {
				return fail(400, {
					token,
					error: 'Password must be at least 6 characters long.'
				});
			}

			if (!isValidTokenFormat(token)) {
				return fail(400, {
					token,
					error: 'Invalid reset token format.'
				});
			}

			// Find and validate token
			const tokenRecord = await db
				.select()
				.from(passwordResetTokens)
				.where(eq(passwordResetTokens.token, token))
				.limit(1);

			if (tokenRecord.length === 0) {
				return fail(400, {
					token,
					error: 'Invalid or expired reset token.'
				});
			}

			const resetToken = tokenRecord[0];

			// Check if token has expired
			if (isTokenExpired(resetToken.expires)) {
				return fail(400, {
					token,
					error: 'This reset token has expired. Please request a new password reset.'
				});
			}

			// Check if token has already been used
			if (resetToken.used) {
				return fail(400, {
					token,
					error: 'This reset token has already been used. Please request a new password reset.'
				});
			}

			// Find the user
			const userRecord = await db
				.select()
				.from(users)
				.where(eq(users.email, resetToken.email))
				.limit(1);

			if (userRecord.length === 0) {
				return fail(400, {
					token,
					error: 'User not found.'
				});
			}

			// Hash the new password
			const hashedPassword = await bcrypt.hash(password, 12);

			// Update user's password and mark token as used
			await db.transaction(async (tx) => {
				// Update user password
				await tx
					.update(users)
					.set({ hashedPassword })
					.where(eq(users.email, resetToken.email));

				// Mark token as used
				await tx
					.update(passwordResetTokens)
					.set({ used: new Date() })
					.where(eq(passwordResetTokens.id, resetToken.id));
			});

			console.log('Password reset successfully for user:', resetToken.email);

			// Check if user is currently logged in
			const session = await locals.auth();
			const wasLoggedIn = session?.user?.email === resetToken.email;

			// Return success instead of redirect to avoid confusion
			return {
				success: true,
				message: wasLoggedIn 
					? 'Your password has been successfully reset! Please log in again with your new password for security.'
					: 'Your password has been successfully reset! You can now sign in with your new password.',
				resetComplete: true,
				userWasLoggedIn: wasLoggedIn
			};

		} catch (error) {
			console.error('Error resetting password:', error);
			return fail(500, {
				error: 'An unexpected error occurred while resetting your password.'
			});
		}
	}
} satisfies Actions;
