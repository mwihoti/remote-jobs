'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function JobDetailsPage() {
  const params = useParams();
  const id = params.id;
  const [job, setJob] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/jobs/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log('Fetched job details:', data);
            setJob(data)})
        .catch(err => console.error('Error fetching job details:', err));
    }
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <p className="text-lg mb-2"><strong>Company:</strong> {job.company || 'Unknown Company'}</p>
      <p className="text-lg mb-2"><strong>Location:</strong> {job.location || 'Unknown Location'}</p>
      <p className="text-lg mb-2"><strong>Salary:</strong> {job.salary || 'Not specified'}</p>
      <p className="mb-4"><strong>Description:</strong> {job.description}</p>

      <Link href='/apply?id=${id}' className="bg-indigo-600 text-white py-2 px-4 rounded-lg">Apply for this job</Link>
    </div>
  );
}
