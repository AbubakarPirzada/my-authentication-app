// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { DefaultSession } from '@auth/core/types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			getSession(): Promise<DefaultSession | null>;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// Extend the default session interface to include role
declare module '@auth/core/types' {
	interface Session {
		user?: {
			id: string;
			name?: string | null;
			email?: string | null;
			image?: string | null;
			role?: 'user' | 'admin';
			emailVerified?: Date | null;
		} & DefaultSession['user'];
	}

	interface User {
		role?: 'user' | 'admin';
		emailVerified?: Date | null;
	}
}

export {};