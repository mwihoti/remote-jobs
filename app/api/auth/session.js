import { getSession } from '@workos-inc/authkit-nextjs';

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });

    if (session?.user) {
      // Return user data if logged in
      res.status(200).json({ user: session.user });
    } else {
      // Not logged in
      res.status(401).json({ message: 'Not authenticated' });
    }
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
