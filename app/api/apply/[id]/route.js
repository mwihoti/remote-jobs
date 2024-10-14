import { NextResponse } from 'next/server';
import { readJobsFile } from '../../../../lib/jobsUtils';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      console.error('No id provided:', id);
      return NextResponse.json({ error: 'No id provided' }, { status: 400 });
    }

    // Fetch the jobs data
    const jobs = await readJobsFile();

    if (!Array.isArray(jobs)) {
      console.error('Jobs is not an array:', jobs);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    console.log('Searching for job with id:', id);
    const job = jobs.find(job => job.id.toString() === id);

    if (!job) {
      console.log('Job not found for id:', id);
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    console.log('Job found:', job);

    // Here you can fetch user details associated with the job if you have that logic
    // For now, I will just return the job data
    return NextResponse.json(job);
  } catch (error) {
    console.error('Error in GET function:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
