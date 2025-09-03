import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const message = url.searchParams.get('message');
	
	return {
		successMessage: message
	};
};
