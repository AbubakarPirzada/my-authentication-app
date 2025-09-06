// src/hooks.server.ts

import { SvelteKitAuth } from '@auth/sveltekit';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '$lib/server/db';
import * as schema from '$lib/server/db/schema';
import Credentials from '@auth/sveltekit/providers/credentials';
import bcrypt from 'bcrypt';
import { env } from '$env/dynamic/private';

export const { handle } = SvelteKitAuth({
  // Note: With JWT strategy, we still use the adapter for user/account storage
  // but sessions are managed via JWT tokens
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
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.email, credentials.email as string),
        });
        if (!user || !user.hashedPassword) {
          return null;
        }
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword
        );
        if (isPasswordCorrect) {
          // Check if the user's email is verified
          if (!user.emailVerified) {
            console.log('Login attempt with unverified email:', user.email);
            return null; // Reject login for unverified users
          }
          
          // IMPORTANT: Return the full user object here for the callbacks
          return user;
        }
        return null;
      },
    }),
  ],

  // --- THIS IS THE CRUCIAL SECTION THAT FIXES THE ERROR ---
  // The callbacks are used to bridge the gap between the `authorize` function
  // and the final database session.
  callbacks: {
    // The JWT callback runs first, encoding user data into a token.
    // This happens even with database sessions.
    async jwt({ token, user }) {
      if (user) {
        // On a new sign-in, the `user` object is available.
        // We add its properties to the token.
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = (user as any).role; // Add role to token
      }
      return token;
    },
    // The session callback runs next, using the token data to build the session object.
    async session({ session, token }) {
      if (token && session.user) {
        // We take the ID from the token and add it to the session object.
        // This makes the user's ID available everywhere in your app.
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        (session.user as any).role = token.role as string; // Add role to session
      }
      return session;
    },
  },
  // ---------------- END OF THE FIX --------------------

  session: {
    // Use JWT strategy for credentials provider - required in Auth.js v1.10+
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  secret: env.AUTH_SECRET,
  trustHost: true,
});