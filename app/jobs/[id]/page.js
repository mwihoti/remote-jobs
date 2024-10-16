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

      <h2 className="text-2xl font-bold mt-6 mb-2">Additional Details</h2>
      <p className="mb-2"><strong>Qualifications:</strong> {job.qualifications}</p>
      <p className="mb-2"><strong>Benefits:</strong> {job.benefits}</p>
      <p className="mb-2"><strong>Contact Info:</strong> {job.contactInfo}</p>
      <p className="mb-2"><strong>Company Background:</strong> {job.companyBackground}</p>
      <p className="mb-2"><strong>Application Procedure:</strong> {job.applicationProcedure}</p>
      <p className="mb-2"><strong>Responsibilities:</strong> {job.responsibilities}</p>
      <p className="mb-2"><strong>Role Summary:</strong> {job.roleSummary}</p>
      <p className="mb-2"><strong>Business Intro:</strong> {job.businessIntro}</p>
      <p className="mb-2"><strong>Preferred Qualifications:</strong> {job.preferredQualifications}</p>
      <p className="mb-2"><strong>Application Directions:</strong> {job.applicationDirections}</p>
      <p className="mb-2"><strong>Internal Advertising:</strong> {job.internalAdvertising}</p>
      <p className="mb-2"><strong>Social Media:</strong> {job.socialMedia}</p>


      <Link href={`/apply/${job.id}`}  className="bg-indigo-600 text-white py-2 px-4 rounded-lg">Apply for this job</Link>
    </div>
  );
}
