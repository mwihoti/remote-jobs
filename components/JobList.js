'use client'
import { useState, useEffect } from 'react';
import JobRow from './JobRows';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const jobsData = await response.json();
        setJobs(jobsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

 
  if (error) {
    return <div>Error: {error}</div>;
  }



  return (
    <div className='mx-auto  items-center'>
      {jobs.map(job => (
        <JobRow key={job.id} jobDoc={job} />
      ))}
    </div>
  );
}