// src/hooks.server.ts

import { SvelteKitAuth } from '@auth/sveltekit';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '$lib/server/db';
import * as schema from '$lib/server/db/schema';
import Credentials from '@auth/sveltekit/providers/credentials';
import bcrypt from 'bcrypt';

export const handle = SvelteKitAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: schema.users,
    accountsTable: schema.accounts,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }),
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const user = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.email, credentials.email as string),
        });

        if (!user || !user.hashedPassword) {
          // User not found or password not set
          return null;
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword
        );

        if (isPasswordCorrect) {
          return user;
        }

        return null; // Passwords do not match
      }
    })
  ],
  session: {
    strategy: 'database', // Use database sessions, not JWT
  },
  pages: {
    signIn: '/login', // Redirect users to /login if they are not authenticated
  },
});