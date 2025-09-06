import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  // Check for various URL parameters that indicate different states
  const verified = url.searchParams.get('verified') === 'true';
  const passwordResetSuccess = url.searchParams.get('message') === 'password-reset-success';
  const error = url.searchParams.get('error');

  // Return the state data to be used by the page component
  return {
    isVerified: verified,
    passwordResetSuccess,
    error
  };
};
