import 'dotenv/config';
import type { Config } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing from your .env file. Make sure the file exists and the variable is set.');
}

export default {
  schema: './src/lib/server/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  }
} satisfies Config;
