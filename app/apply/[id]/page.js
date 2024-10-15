import JobApplicationForm from '../../components/JobApplicationForm';

async function getJob(id) {
  const res = await fetch(`http://localhost:3000/api/jobs/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch job');
  }
  return res.json();
}

export default async function Apply({ params }) {
  const { id } = params;
  
  try {
    const job = await getJob(id);
    return <JobApplicationForm job={job} />;
  } catch (error) {
    return <div>Error: {error.message}</div>;
  }
}