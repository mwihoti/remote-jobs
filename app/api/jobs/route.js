import { NextResponse } from 'next/server';
import { withAuth } from '@workos-inc/authkit-nextjs'
import { readJobsFile, writeJobsFile} from '../../../lib/jobsUtils'



export async function GET(request) {
    const jobs = await readJobsFile(request);
    return NextResponse.json(jobs);
}

export async function POST(request) {
    try {
        // Authenticate the user
        const authResult = await withAuth(request);
        if (!authResult || !authResult.user) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
    
        const { title, description, company, location, salary } = await request.json();
    
        if (!title || !description || !company || !location) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
    
        const jobs = await readJobsFile();
    
        const newJob = {
          id: Date.now().toString(),
          title,
          description,
          company,      
          location,     
          salary,      
          createdBy: authResult.user.id,  // User ID from WorkOS authentication
          createdAt: new Date().toISOString(),
        };
    
        jobs.push(newJob);
        await writeJobsFile(jobs);
    
        return NextResponse.json(newJob, { status: 201 });
      } catch (error) {
        console.error("Error posting job:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
      }
    }