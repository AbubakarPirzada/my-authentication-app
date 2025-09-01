// src/hooks.server.ts

import { SvelteKitAuth } from '@auth/sveltekit';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '$lib/server/db';
import * as schema from '$lib/server/db/schema';
import Credentials from '@auth/sveltekit/providers/credentials';
import bcrypt from 'bcrypt';
import { env } from '$env/dynamic/private';

// Destructure the handle function from SvelteKitAuth
export const { handle } = SvelteKitAuth({
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
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
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
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
            };
          }
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }

        return null;
      }
    })
  ],
  session: {
    strategy: 'database',
  },
  callbacks: {
    async jwt({ token, user }) {
      // If user object exists (first time login), add user data to token
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user ID from token to session object
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: env.AUTH_SECRET,
  trustHost: true,
});