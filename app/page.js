// app/page.js
import JobApplicationForm from './components/JobApplicationForm';
import Hero from './components/Hero';
import Jobs from './components/Jobs';
import JobForm from './components/JobForm';
import { getSignInUrl, getSignUpUrl, withAuth } from '../lib/auth'; // Adjust the path as necessary
import JobList from './components/JobList';

export default async function Home() {
  // Retrieves the user from the session or returns `null` if no user is signed in
  const { user } = await withAuth();

  // Get the URL to redirect the user to AuthKit to sign in
  const signInUrl = await getSignInUrl();

  // Get the URL to redirect the user to AuthKit to sign up
  const signUpUrl = await getSignUpUrl();

  return (
    <div>
      <Hero />

   

      <JobList/>
      <JobApplicationForm />
    </div>
  );
}
