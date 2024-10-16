// app/page.js
import JobApplicationForm from '../components/JobApplicationForm';
import Hero from '../components/Hero';

import JobList from '../components/JobList';

export const dynamic = 'force-dynamic';
export default async function Home() {
 

  return (
    <div>
      
      <Hero />

   

      <JobList/>
      <JobApplicationForm />
    </div>
  );
}
