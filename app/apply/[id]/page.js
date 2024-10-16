

'use client';

import { useParams, useparams } from 'next/navigation';
import JobApplicationForm from '../../../components/JobApplicationForm';
import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic'

export default function Apply() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
          // Fetch job details based on the id from the route
          fetch(`/api/apply/${id}`)
            .then(res => res.json())
            .then(data => {
              if (data.error) {
                setError(data.error);
              } else {
                setJob(data);
              }
            })
            .catch(err => setError('Error fetching job details.'));
        }
      }, [id]);

   

   
    if (error) return <div>{error}</div>;
    if (!job) return <div>Loading job details...</div>;

    return <JobApplicationForm job={job} />;
}