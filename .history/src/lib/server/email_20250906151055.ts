// src/lib/server/email.ts

import * as nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

// Create reusable transporter object using SMTP transport
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
	if (!transporter) {
		transporter = nodemailer.createTransport({
			host: env.SMTP_HOST,
			port: parseInt(env.SMTP_PORT || '587'),
			secure: env.SMTP_SECURE === 'true', // true for 465, false for other ports
			auth: {
				user: env.SMTP_USER,
				pass: env.SMTP_PASS,
			},
		});
	}
	return transporter;
}

/**
 * Sends a password reset email to the specified email address
 * @param email - The recipient's email address
 * @param token - The password reset token
 * @returns Promise<boolean> - True if email was sent successfully
 */
export async function sendPasswordResetEmail(email: string, token: string): Promise<boolean> {
	try {
		const transporter = getTransporter();
		
		// Create the reset URL
		const resetUrl = env.ORIGIN ? 
			`${env.ORIGIN}/reset-password/${token}` : 
			`http://localhost:5173/reset-password/${token}`;

		// Email content
		const mailOptions = {
			from: `"${env.SMTP_FROM_NAME || 'Authentication App'}" <${env.SMTP_FROM_EMAIL || env.SMTP_USER}>`,
			to: email,
			subject: 'Reset Your Password',
			html: `
				<!DOCTYPE html>
				<html>
				<head>
					<meta charset="utf-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Reset Your Password</title>
					<style>
						body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
						.container { max-width: 600px; margin: 0 auto; padding: 20px; }
						.header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
						.content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
						.button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
						.footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
						.warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 20px 0; }
					</style>
				</head>
				<body>
					<div class="container">
						<div class="header">
							<h1>Reset Your Password</h1>
						</div>
						<div class="content">
							<p>Hello,</p>
							<p>You requested to reset your password for your account. Click the button below to set a new password:</p>
							
							<div style="text-align: center;">
								<a href="${resetUrl}" class="button">Reset Password</a>
							</div>
							
							<div class="warning">
								<strong>⚠️ Important:</strong>
								<ul>
									<li>This link will expire in 1 hour for security reasons</li>
									<li>If you didn't request this reset, please ignore this email</li>
									<li>Never share this link with anyone</li>
								</ul>
							</div>
							
							<p>If the button doesn't work, you can copy and paste this link into your browser:</p>
							<p style="word-break: break-all; background: #e9ecef; padding: 10px; border-radius: 4px; font-family: monospace;">
								${resetUrl}
							</p>
							
							<p>If you didn't request this password reset, you can safely ignore this email. Your password will not be changed.</p>
						</div>
						<div class="footer">
							<p>This email was sent from an automated system. Please do not reply to this email.</p>
						</div>
					</div>
				</body>
				</html>
			`,
			text: `
Reset Your Password

Hello,

You requested to reset your password for your account. Please visit the following link to set a new password:

${resetUrl}

Important:
- This link will expire in 1 hour for security reasons
- If you didn't request this reset, please ignore this email
- Never share this link with anyone

If you didn't request this password reset, you can safely ignore this email. Your password will not be changed.
			`
		};

		// Send email
		const info = await transporter.sendMail(mailOptions);
		
		console.log('Password reset email sent successfully:', {
			messageId: info.messageId,
			recipient: email,
			previewUrl: nodemailer.getTestMessageUrl(info) // For Ethereal Email
		});
		
		return true;
	} catch (error) {
		console.error('Failed to send password reset email:', error);
		return false;
	}
}

/**
 * Sends an email verification email to the specified email address
 * @param email - The recipient's email address
 * @param token - The email verification token
 * @returns Promise<boolean> - True if email was sent successfully
 */
export async function sendEmailVerification(email: string, token: string): Promise<boolean> {
	try {
		const transporter = getTransporter();
		
		// Create the verification URL - Enhanced with debugging
		const verificationUrl = env.ORIGIN ? 
			`${env.ORIGIN}/api/verify-email?token=${token}` : 
			`http://localhost:5173/api/verify-email?token=${token}`;

		// Debug logging to ensure correct URL generation
		console.log('Generating verification URL:', {
			ORIGIN: env.ORIGIN,
			verificationUrl,
			token: token.substring(0, 8) + '...' // Log partial token for debugging
		});

		// Email content
		const mailOptions = {
			from: `"${env.SMTP_FROM_NAME || 'Authentication App'}" <${env.SMTP_FROM_EMAIL || env.SMTP_USER}>`,
			to: email,
			subject: 'Verify Your Email Address',
			html: `
				<!DOCTYPE html>
				<html>
				<head>
					<meta charset="utf-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Verify Your Email Address</title>
					<style>
						body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
						.container { max-width: 600px; margin: 0 auto; padding: 20px; }
						.header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
						.content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
						.button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
						.footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
						.warning { background: #e8f4f8; border: 1px solid #bee5eb; padding: 15px; border-radius: 6px; margin: 20px 0; }
					</style>
				</head>
				<body>
					<div class="container">
						<div class="header">
							<h1>🎉 Welcome!</h1>
							<p>Please verify your email address</p>
						</div>
						<div class="content">
							<p>Hello,</p>
							<p>Thank you for signing up! To complete your registration and start using your account, please verify your email address by clicking the button below:</p>
							
							<div style="text-align: center;">
								<a href="${verificationUrl}" class="button">Verify Email Address</a>
							</div>
							
							<div class="warning">
								<strong>📧 Important:</strong>
								<ul>
									<li>This link will expire in 24 hours for security reasons</li>
									<li>You won't be able to sign in until your email is verified</li>
									<li>If you didn't create this account, please ignore this email</li>
								</ul>
							</div>
							
							<p>If the button doesn't work, you can copy and paste this link into your browser:</p>
							<p style="word-break: break-all; background: #e9ecef; padding: 10px; border-radius: 4px; font-family: monospace;">
								${verificationUrl}
							</p>
							
							<p>If you didn't create an account with us, you can safely ignore this email.</p>
						</div>
						<div class="footer">
							<p>This email was sent from an automated system. Please do not reply to this email.</p>
						</div>
					</div>
				</body>
				</html>
			`,
			text: `
Welcome!

Thank you for signing up! To complete your registration and start using your account, please verify your email address by visiting the following link:

${verificationUrl}

Important:
- This link will expire in 24 hours for security reasons
- You won't be able to sign in until your email is verified
- If you didn't create this account, please ignore this email

If you didn't create an account with us, you can safely ignore this email.
			`
		};

		// Send email
		const info = await transporter.sendMail(mailOptions);
		
		console.log('Email verification sent successfully:', {
			messageId: info.messageId,
			recipient: email,
			verificationUrl, // Log the full URL for debugging
			previewUrl: nodemailer.getTestMessageUrl(info) // For Ethereal Email
		});
		
		return true;
	} catch (error) {
		console.error('Failed to send email verification:', error);
		return false;
	}
}

/**
 * Verify email configuration is working
 * @returns Promise<boolean> - True if configuration is valid
 */
export async function verifyEmailConfig(): Promise<boolean> {
	try {
		const transporter = getTransporter();
		await transporter.verify();
		console.log('Email configuration verified successfully');
		return true;
	} catch (error) {
		console.error('Email configuration verification failed:', error);
		return false;
	}
}
