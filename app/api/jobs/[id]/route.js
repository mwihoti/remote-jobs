import { NextResponse } from 'next/server';
import { readJobsFile } from '../../../../lib/jobsUtils';

export async function GET(request, { params }) {
  try {
    const jobs = await readJobsFile();
    
    if (!Array.isArray(jobs)) {
      console.error('Jobs is not an array:', jobs);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    console.log('Searching for job with id:', params.id);
    const job = jobs.find(job => job.id.toString() === params.id);

    if (!job) {
      console.log('Job not found for id:', params.id);
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    console.log('Job found:', job);
    return NextResponse.json(job);
  } catch (error) {
    console.error('Error in GET function:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}