import 'dotenv/config';
import type { Config } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing from your .env file');
}

export default {
  schema: './src/lib/server/db/schema.ts', // IMPORTANT: Double check this path is correct!
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  }
} satisfies Config;