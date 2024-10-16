import { authkitMiddleware } from '@workos-inc/authkit-nextjs';
export default authkitMiddleware({
    redirectUri: process.env.WORKOS_REDIRECT_URI || 'http://localhost:3000/callback',
    clientId: process.env.WORKOS_CLIENT_ID,
    clientSecret: process.env.WORKOS_CLIENT_SECRET,
    middlewareAuth: {
        enabled: true,
        unauthenticatedPaths: ['/jobs', '/'],
      },


});
// Match against pages that require authentication
// Leave this out if you want authentication on every page in your application
export const config = { matcher: [
    
    '/jobs/:id*',
    '/apply',
    '/form',
    '/api/signout',
    '/api/apply',
    '/apply/:id*',
    
    

    ]
 };
