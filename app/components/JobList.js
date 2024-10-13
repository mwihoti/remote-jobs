import { useState, useEffect } from 'react';
import JobCard from './JobCard';

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  return (
    <div>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}