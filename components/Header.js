
import { getSignInUrl, withAuth, signOut } from '@workos-inc/authkit-nextjs';
import Link from "next/link";
import prisma from '../lib/prisma';

// Mark this as a server-side component
export default async function Header() {



  
  let workosUser = null;
  let signInUrl = null;

  try {
    // Server-side authentication using WorkOS Authkit
    if (typeof window === 'undefined') {
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
    
    }
  } catch (error) {
    console.error("Error in Header:", error);
  }

  return (
    <div>
      <header>
        <div className="container items-center justify-between mx-auto py-4 flex">
          <Link href="/" className="font-bold text-xl">Job Corner</Link>
          <nav className="flex gap-2 px-4 py-2 rounded-md">
          {!workosUser && (
          <Link className='=bg-blue bg-gray-50' href={signInUrl || '/'}>Login</Link>
        )}
        { workosUser && workosUser.user && (
          <div>
          <p>Welcome back{workosUser.user.firstName && `, ${workosUser.user.firstName}`}</p>
          
          <form action={async () => {
                  'use server';
                  await signOut();
                }}>
                  <button className='bg-blue bg-gray-50' type='submit'>LogOut</button>
                </form>
               
                </div>
        
            )}
            <Link href="/jobs" className="bg-gray-200 ">Jobs</Link>
            <Link href="/form" className="bg-blue-600">Post Jobs</Link>
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
