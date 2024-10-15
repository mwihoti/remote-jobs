// lib/userUtils.js
import { withAuth } from '@workos-inc/authkit-nextjs';
import { prisma } from './prisma';

export async function getUser() {
  try {
    const authResult = await withAuth();
    const workosUser = authResult.user;

    if (workosUser && workosUser.id) {
      // You can also update or create the user in your database here
      await updateOrCreateUser(workosUser);
      return workosUser; // Return the user object
    }
    return null; // No user is authenticated
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
