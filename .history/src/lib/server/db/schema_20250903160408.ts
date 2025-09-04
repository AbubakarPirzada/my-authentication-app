// src/lib/server/db/schema.ts

import {
	timestamp,
	pgTable,
	text,
	primaryKey,
	integer,
	pgEnum
  } from 'drizzle-orm/pg-core';
  import type { AdapterAccount } from '@auth/core/adapters';
  
  // Define user roles enum
  export const userRoleEnum = pgEnum('user_role', ['user', 'admin']);
  
  export const users = pgTable('users', {
	id: text('id').notNull().primaryKey(),
	name: text('name'),
	email: text('email').notNull().unique(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image'),
	hashedPassword: text('hashed_password'), // Your custom field for password
	role: userRoleEnum('role').notNull().default('user'), // Add role with default 'user'
	createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(), // Track user creation time
  });
  
  export const accounts = pgTable(
	'accounts',
	{
	  userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	  type: text('type').$type<AdapterAccount['type']>().notNull(),
	  provider: text('provider').notNull(),
	  providerAccountId: text('providerAccountId').notNull(),
	  refresh_token: text('refresh_token'),
	  access_token: text('access_token'),
	  expires_at: integer('expires_at'),
	  token_type: text('token_type'),
	  scope: text('scope'),
	  id_token: text('id_token'),
	  session_state: text('session_state')
	},
	(account) => ({
	  compoundKey: primaryKey({
		columns: [account.provider, account.providerAccountId]
	  })
	})
  );
  
  export const sessions = pgTable('sessions', {
	sessionToken: text('sessionToken').notNull().primaryKey(),
	userId: text('userId')
	  .notNull()
	  .references(() => users.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull()
  });
  
  export const verificationTokens = pgTable(
	'verification_tokens',
	{
	  identifier: text('identifier').notNull(),
	  token: text('token').notNull(),
	  expires: timestamp('expires', { mode: 'date' }).notNull()
	},
	(vt) => ({
	  compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
	})
  );