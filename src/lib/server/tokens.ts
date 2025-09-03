// src/lib/server/tokens.ts
import { randomBytes, randomUUID } from 'crypto';

/**
 * Generate a secure random token for password reset
 * @param length - Length of the token in bytes (default: 32)
 * @returns A hex string token
 */
export function generateSecureToken(length: number = 32): string {
  return randomBytes(length).toString('hex');
}

/**
 * Generate a unique ID for the password reset token record
 * @returns A UUID string
 */
export function generateTokenId(): string {
  return randomUUID();
}

/**
 * Generate token expiration time (1 hour from now)
 * @returns Date object representing the expiration time
 */
export function generateTokenExpiration(): Date {
  const now = new Date();
  const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
  return new Date(now.getTime() + oneHour);
}

/**
 * Check if a token has expired
 * @param expirationDate - The expiration date to check
 * @returns True if the token has expired, false otherwise
 */
export function isTokenExpired(expirationDate: Date): boolean {
  return new Date() > expirationDate;
}

/**
 * Validate token format (basic validation)
 * @param token - The token to validate
 * @returns True if the token format is valid, false otherwise
 */
export function isValidTokenFormat(token: string): boolean {
  // Check if token is a hex string of expected length (64 characters for 32 bytes)
  return /^[a-f0-9]{64}$/i.test(token);
}
