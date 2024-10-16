import { getSession } from '@workos-inc/authkit-nextjs';

export const GET = async (req) => {
  try {
    const session = await getSession(req);

    if (session) {
      return new Response(JSON.stringify(session), { status: 200 });
    } else {
      return new Response('No active session', { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching session:', error);
    return new Response('Error fetching session', { status: 500 });
  }
};
