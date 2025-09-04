// src/lib/server/db/schema.ts

import {
	timestamp,
	pgTable,
	text,
	primaryKey,
	integer,
	pgEnum,
	uuid,
	boolean
  } from 'drizzle-orm/pg-core';
  import type { AdapterAccount } from '@auth/core/adapters';
  
  // Define user roles enum
  export const userRoleEnum = pgEnum('user_role', ['user', 'admin']);
  
  // Define message roles enum for chat
  export const messageRoleEnum = pgEnum('message_role', ['user', 'assistant', 'system']);
  
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

  // Chat Sessions Table
  export const chatSessions = pgTable('chat_sessions', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: text('user_id')
	  .notNull()
	  .references(() => users.id, { onDelete: 'cascade' }),
	title: text('title').notNull().default('New Chat'),
	isActive: boolean('is_active').notNull().default(true),
	createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow()
  });

  // Chat Messages Table
  export const chatMessages = pgTable('chat_messages', {
	id: uuid('id').defaultRandom().primaryKey(),
	sessionId: uuid('session_id')
	  .notNull()
	  .references(() => chatSessions.id, { onDelete: 'cascade' }),
	role: messageRoleEnum('role').notNull(),
	content: text('content').notNull(),
	tokens: integer('tokens').default(0),
	createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow()
  });

  // Chat Analytics Table (for tracking usage)
  export const chatAnalytics = pgTable('chat_analytics', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: text('user_id')
	  .notNull()
	  .references(() => users.id, { onDelete: 'cascade' }),
	sessionId: uuid('session_id')
	  .notNull()
	  .references(() => chatSessions.id, { onDelete: 'cascade' }),
	messageCount: integer('message_count').notNull().default(0),
	totalTokens: integer('total_tokens').notNull().default(0),
	duration: integer('duration').default(0), // in seconds
	createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow()
  });