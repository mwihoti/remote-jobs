import { getSignInUrl, withAuth, signOut } from '@workos-inc/authkit-nextjs';
import Link from "next/link";
import { prisma } from '../../lib/prisma';

export default async function Header() {
  let workosUser = null;
  let signInUrl = null;

  try {
    const authResult = await withAuth();
    const authKitUser = authResult.user;
    signInUrl = await getSignInUrl();

    if (authKitUser && authKitUser.id) {
      // Fetch full user details from WorkOS
      workosUser = authResult; // authResult contains session and user info
      // Update or create user in Prisma
      if (workosUser && workosUser.user) {
        await updateOrCreateUser(workosUser.user);
      }
    }
  } catch (error) {
    console.error("Error in Header:", error);
  }

  return (
    <div>
      <header>
        <div className="container items-center justify-between mx-auto py-4 flex">
          <Link href={'/'} className="font-bold text-xl"> Job Board</Link>
          <nav className="flex gap-2 *:px-4 *:py-2 *:rounded-md ">
            {!workosUser && (
              <Link className='bg-blue bg-gray-50' href={signInUrl}>Login</Link>
            )}
            {workosUser && workosUser.user && (
              <>
                <p>Welcome back{workosUser.user.firstName && `, ${workosUser.user.firstName}`}</p>
                <form action={async () => {
                  'use server';
                  await signOut();
                }}>
                  <button className='bg-blue bg-gray-50' type='submit'>LogOut</button>
                </form>
              </>
            )}
            <Link href="/jobs" className="bg-gray-200 ">Jobs</Link>
            <Link href="/new-listing" className="bg-blue-600">Post jobs</Link>
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

  const { id, email, firstName, lastName, emailVerified } = workosUser;

  try {
    await prisma.user.upsert({
      where: { email: email },
      update: {
        name: `${firstName || ''} ${lastName || ''}`.trim() || null,
        emailVerified: emailVerified || false,
      },
      create: {
        id: id,
        email: email,
        name: `${firstName || ''} ${lastName || ''}`.trim() || null,
        emailVerified: emailVerified || false,
        role: 'USER', // Set a default role
      },
    });
  } catch (error) {
    console.error("Error updating or creating user:", error);
  }
}
