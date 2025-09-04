// Test database connection
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from 'dotenv';

// Load environment variables
config();

async function testDatabase() {
  try {
    console.log('Testing database connection...');
    
    const client = postgres(process.env.DATABASE_URL);
    const db = drizzle(client);
    
    // Test simple query
    const result = await client`SELECT 1 as test`;
    console.log('Database connection successful:', result);
    
    // Test chat sessions table
    const sessions = await client`SELECT COUNT(*) as count FROM chat_sessions`;
    console.log('Chat sessions count:', sessions);
    
    await client.end();
    console.log('Database test completed successfully');
  } catch (error) {
    console.error('Database test failed:', error);
  }
}

testDatabase();
