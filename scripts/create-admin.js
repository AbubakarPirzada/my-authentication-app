#!/usr/bin/env node

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { pgTable, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';

// Load environment variables
dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set in .env file');
  process.exit(1);
}

// Define schema locally to avoid import issues
const userRoleEnum = pgEnum('user_role', ['user', 'admin']);

const users = pgTable('users', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  hashedPassword: text('hashed_password'),
  role: userRoleEnum('role').notNull().default('user'),
});

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client, { schema: { users } });

async function createAdmin() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.log('Usage: node scripts/create-admin.js <email> <password>');
    console.log('Example: node scripts/create-admin.js admin@example.com mypassword');
    process.exit(1);
  }

  try {
    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
    const userExists = existingUser.length > 0;

    if (userExists) {
      // Update existing user to admin
      const hashedPassword = await bcrypt.hash(password, 12);
      await db.update(users)
        .set({ 
          role: 'admin',
          hashedPassword: hashedPassword 
        })
        .where(eq(users.email, email));
      
      console.log(`✅ Updated existing user ${email} to admin role`);
    } else {
      // Create new admin user
      const hashedPassword = await bcrypt.hash(password, 12);
      const userId = crypto.randomUUID();

      await db.insert(users).values({
        id: userId,
        email: email,
        hashedPassword: hashedPassword,
        name: email.split('@')[0],
        role: 'admin',
      });

      console.log(`✅ Created new admin user: ${email}`);
    }

    console.log('🎉 Admin user is ready! You can now login with admin privileges.');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await client.end();
  }
}

createAdmin();
