import { NextResponse } from 'next/navigation';
import { readJobsFile } from './index'; // Reuse your readJobsFile function

export async function GET(request, { params }) {
  const jobs = await readJobsFile();
  const job = jobs.find(job => job.id === params.id);

  if (!job) {
    return NextResponse.json({ message: 'Job not found' }, { status: 404 });
  }

  return NextResponse.json(job);
}
