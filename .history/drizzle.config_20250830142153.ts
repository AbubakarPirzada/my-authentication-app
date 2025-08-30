import 'dotenv/config';
import type { Config } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing from .env file');
}

export default {
  // Make sure this path is correct for your project
  schema: './src/lib/server/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql', // <-- THE FIX: Use 'dialect' instead of 'driver'
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  }
} satisfies Config;