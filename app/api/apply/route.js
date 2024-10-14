import { NextResponse } from 'next/server';
import { readJobsFile } from '../../../lib/jobsUtils';



export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'No id provided' }, { status: 400 });
    }

    const jobs = await readJobsFile();

    if (!Array.isArray(jobs)) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    const job = jobs.find(job => job.id.toString() === id);

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error('Error in GET function:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const jobId = formData.get('jobId');
    const cv = formData.get('cv');

    if (!name || !email || !phone || !jobId || !cv) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Here you would typically:
    // 1. Validate the data
    // 2. Save the application to a database
    // 3. Send a confirmation email
    // 4. Handle the CV file (e.g., save it to a file system or cloud storage)

    // For this example, we'll just return a success message
    return NextResponse.json({ message: 'Application submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in POST function:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}