
import { getSignInUrl, withAuth, signOut } from '@workos-inc/authkit-nextjs';
import Link from "next/link";
import prisma from '../lib/prisma';

// Mark this as a server-side component
export default async function Header() {



  
  let workosUser = null;
  let signInUrl = null;

  try {
    // Server-side authentication using WorkOS Authkit

      // Only run withAuth server-side
      const authResult = await withAuth();
      const authKitUser = authResult.user;
    signInUrl = await getSignInUrl();

    if (authKitUser && authKitUser.id) {
      // Authenticated user logic
      workosUser = authResult;

      // Update or create user in Prisma
      if (workosUser && workosUser.user) {
        await updateOrCreateUser(workosUser);
      }
    
    
    }
  } catch (error) {
    console.error("Error in Header:", error);
  }

  return (
<div>
  <header className="bg-white shadow-md">
    <div className="container mx-auto flex items-center justify-between py-4 px-6">
      <Link href="/" className="font-bold text-2xl text-blue-600 hover:text-blue-800">
        Job Corner
      </Link>
      <nav className="flex items-center space-x-4">
        
        {workosUser && workosUser.user && (
          <div className="flex items-center space-x-3">
            <p className="text-gray-700">
              Welcome back{workosUser.user.firstName && `, ${workosUser.user.firstName}`}
            </p>
            <form action={async () => { 'use server'; await signOut(); }}>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
                type="submit"
              >
                Logout
              </button>
            </form>
          </div>
        )}
        <Link
          href="/jobs"
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-all"
        >
          Jobs
        </Link>
       {/* <Link
          href="/form"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
        >
          Post Jobs
        </Link> */}
      </nav>
    </div>
  </header>
</div>
  );
}

async function updateOrCreateUser(workosUser) {
  if (!workosUser || !workosUser.email) {
    console.error("Invalid user data:", workosUser);
    return;
  }

  const { id, email, firstName, lastName, emailVerified } = workosUser.user;

  try {
    await prisma.user.upsert({
      where: { email },
      update: {
        name: `${firstName || ''} ${lastName || ''}`.trim() || null,
        emailVerified: emailVerified || false,
      },
      create: {
        id: id,
        email: email,
        name: `${firstName || ''} ${lastName || ''}`.trim() || null,
        emailVerified: emailVerified || false,
        role: 'USER', // Default role
      },
    });
  } catch (error) {
    console.error("Error updating or creating user:", error);
  }
}
