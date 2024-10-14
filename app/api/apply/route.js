import { NextResponse } from 'next/server';
import { readJobsFile } from '../../../lib/jobsUtils';
import { saveApplication, saveCV } from '../../../lib/applicationUtils';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'No id provided' }, { status: 400 });
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs?id=${id}`);
    if (!response.ok) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    const job = await response.json();

    return NextResponse.json(job);
  } catch (error) {
    console.error('Error in GET function:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const applicationData = Object.fromEntries(formData);

    const cvFile = formData.get('cv');
    if (cvFile) {
      if (cvFile.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: 'File size exceeds 5MB limit' }, { status: 400 });
      }
      if (cvFile.type !== 'application/pdf') {
        return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
      }
      const cvPath = await saveCV(cvFile);
      applicationData.cvPath = cvPath;
    } else {
      return NextResponse.json({ error: 'CV file is required' }, { status: 400 });
    }

    const savedApplication = await saveApplication(applicationData);
    return NextResponse.json(savedApplication, { status: 200 });
  } catch (error) {
    console.error('Error in POST function:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}