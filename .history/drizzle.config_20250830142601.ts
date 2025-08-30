import 'dotenv/config';
import type { Config } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing from .env file');
}

export default {
  // Make sure this path is correct for your project
  schema: './src/lib/server/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL, // <-- THE FINAL FIX: The property must be named 'url'
  }
} satisfies Config;