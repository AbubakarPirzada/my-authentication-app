import 'dotenv/config'; // This is the new line that loads your .env file
import type { Config } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing from .env file');
}

export default {
  // You might need to adjust this path if your schema.ts file is located elsewhere
  schema: './src/lib/server/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  }
} satisfies Config;