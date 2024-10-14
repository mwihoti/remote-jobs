'use client';
import { useSearchParams } from 'next/navigation';
import JobApplicationForm from '../components/JobApplicationForm';
import { useEffect, useState } from 'react';

export default function Apply() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [job, setJob] = useState(null);
    const [error, setError] = useState(null);

  
    useEffect(() => {
        if (id) {
          fetch(`/api/jobs/${id}`)
            .then(response => response.json())
            .then(data => {
              if (data.error) {
                setError(data.error);
              } else {
                setJob(data);
                console.log('Fetched job details:', data);
              }
            })
            .catch((error) => {
              setError('Failed to fetch job details');
              console.error('Error fetching job:', error);
            });
        }
      }, [id]);
    
      if (!id) return <div>No job ID provided</div>;
      if (error) return <div>{error}</div>;
      if (!job) return <div>Loading job details...</div>;
    
      return <JobApplicationForm job={job} />;
    }