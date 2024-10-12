import { getSignInUrl,  withAuth, signOut} from '@workos-inc/authkit-nextjs';
import Link from "next/link";


export default async function Header  ()  {
    const { user } = await withAuth();
    const signInUrl = await getSignInUrl();
  
    return (
    <div><header>
       
    <div className="container items-center justify-between mx-auto py-4 flex">
      <Link href={'/'} className="font-bold text-xl"> Job Board</Link>
      <nav className="flex gap-2 *:px-4 *:py-2 *:rounded-md ">
        {!user && (
          <Link className='=bg-blue bg-gray-50' href={signInUrl}>Login</Link>
        )}
        { user && (
          <form action={async () => {
            'use server';
            await signOut();
          }}>
          <button className='bg-blue bg-gray-50' type='submit'>LogOut</button>


          </form>
        )}
        <Link href="/jobs" className="bg-gray-200 ">Jobs</Link>
        <Link href="/new-listing" className="bg-blue-600">Post jobs</Link>
      </nav>
      </div>
  </header></div>
  )
}

