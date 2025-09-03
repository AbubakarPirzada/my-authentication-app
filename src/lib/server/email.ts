// src/lib/server/email.ts
import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_EMAIL } from '$env/static/private';

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: parseInt(SMTP_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

// Verify transporter configuration
export async function verifyEmailConnection() {
  try {
    await transporter.verify();
    console.log('Email server is ready to take our messages');
    return true;
  } catch (error) {
    console.error('Email server connection failed:', error);
    return false;
  }
}

// Send password reset email
export async function sendPasswordResetEmail(email: string, resetToken: string, baseUrl: string) {
  const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: FROM_EMAIL,
    to: email,
    subject: 'Password Reset Request - My Authentication App',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="color: #666; line-height: 1.6;">
            You have requested to reset your password for your account. Click the button below to reset your password:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #4f46e5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; font-size: 14px;">
            If the button doesn't work, you can copy and paste this link into your browser:
            <br>
            <a href="${resetUrl}" style="color: #4f46e5; word-break: break-all;">${resetUrl}</a>
          </p>
          
          <p style="color: #666; line-height: 1.6; font-size: 14px;">
            <strong>This link will expire in 1 hour.</strong>
          </p>
          
          <p style="color: #666; line-height: 1.6; font-size: 14px;">
            If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #999; font-size: 12px;">
            This email was sent from My Authentication App
          </p>
        </div>
      </div>
    `,
    text: `
Password Reset Request

You have requested to reset your password for your account. 

To reset your password, visit this link: ${resetUrl}

This link will expire in 1 hour.

If you didn't request this password reset, please ignore this email. Your password will remain unchanged.

This email was sent from My Authentication App
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Send test email (for debugging)
export async function sendTestEmail(email: string) {
  const mailOptions = {
    from: FROM_EMAIL,
    to: email,
    subject: 'Test Email - My Authentication App',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">Email Configuration Test</h2>
        <p style="color: #666;">
          This is a test email to verify that your email configuration is working correctly.
        </p>
        <p style="color: #666;">
          If you received this email, your SMTP settings are configured properly!
        </p>
      </div>
    `,
    text: 'This is a test email to verify that your email configuration is working correctly.'
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Test email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending test email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
