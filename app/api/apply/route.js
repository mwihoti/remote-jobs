import { NextResponse } from 'next/server';
import { readJobsFile } from '../../../lib/jobsUtils';
import { saveApplication, saveCV } from '../../../lib/applicationUtils';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function GET(request) {
  try {
    
    const jobs = await readJobsFile(request);


    
   

    return NextResponse.json(jobs);
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