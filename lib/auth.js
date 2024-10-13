import { getSignInUrl as workosGetSignInUrl, getSignUpUrl as workosGetSignUpUrl, withAuth as workosWithAuth } from '@workos-inc/authkit-nextjs';

// Wrapper function to get the sign-in URL
export const getSignInUrl = async () => {
  return await workosGetSignInUrl();
};

// Wrapper function to get the sign-up URL
export const getSignUpUrl = async () => {
  return await workosGetSignUpUrl();
};

// Wrapper function to get the user from the session
export const withAuth = async () => {
  return await workosWithAuth();
};