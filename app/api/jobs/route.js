import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { withAuth } from '@workos-inc/authkit-nextjs'
import { readJobsFile, writeJobsFile} from '../../../lib/jobsUtils'



export async function GET(request) {
    const jobs = await readJobsFile();
    return NextResponse.json(jobs);
}

export async function POST(request) {
    const user = await withAuth(request);
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { title, description, company, location, salary } = await request.json();

   
    const jobs = await readJobsFile();

    const newJob = {
        id: Date.now().toString(),
        title,
        description,
        company,      // Include company
        location,     // Include location
        salary,       // Include salary
        createdBy: user.id,
        createdAt: new Date().toISOString(),
    };

    jobs.push(newJob);
    await writeJobsFile(jobs);

    return NextResponse.json(newJob, {status: 201});
}