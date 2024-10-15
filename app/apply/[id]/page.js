

'use client';

import { useRouter } from 'next/navigation';
import JobApplicationForm from '../../components/JobApplicationForm';
import { useEffect, useState } from 'react';
export const dynamic = 'force-dynamic'

export default function Apply() {
    const router = useRouter();
    const [id, setId] = useState(null);
    const [job, setJob] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Extract the id from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const jobId = urlParams.get('id');
        setId(jobId);
    }, []);

   

    if (!id) return <div>No job ID provided</div>;
    if (error) return <div>{error}</div>;
    if (!job) return <div>Loading job details...</div>;

    return <JobApplicationForm job={job} />;
}