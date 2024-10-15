// app/page.js
import JobApplicationForm from './components/JobApplicationForm';
import Hero from './components/Hero';
import Jobs from './components/Jobs';
import JobForm from './components/JobForm';
import { getSignInUrl, getSignUpUrl, withAuth } from '../lib/auth'; // Adjust the path as necessary
import JobList from './components/JobList';
export const dynamic = 'force-dynamic'
export default async function Home() {
  // Retrieves the user from the session or returns `null` if no user is signed in
  const { user } = await withAuth();

  // Get the URL to redirect the user to AuthKit to sign in
  const signInUrl = await getSignInUrl();

  // Get the URL to redirect the user to AuthKit to sign up
  const signUpUrl = await getSignUpUrl();

  return (
    <div>
      <div>
      <h1>Welcome to the Remote Job Board</h1>
      {user ? (
        <p>Welcome, {user.firstName}!</p>
      ) : (
        <div>
          <a href={signInUrl}>Sign In</a>
          <a href={signUpUrl}>Sign Up</a>
        </div>
      )}
     
    </div>
      <Hero />

   

      <JobList/>
      <JobApplicationForm />
    </div>
  );
}
