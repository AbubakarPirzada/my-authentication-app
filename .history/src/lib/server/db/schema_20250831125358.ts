import { pgTable, serial, integer, text, pgEnum } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['ADMIN', 'USER']);

export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	age: integer('age'),
	role: roleEnum('role').notNull().default('USER')
});
