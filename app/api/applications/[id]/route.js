import { NextResponse } from 'next/server';
import { readJobsFile } from '../../../../lib/jobsUtils';

export async function GET(request, { params }) {
    const { id } = params;

    try {
        const application = await readJobsFile({
            filter: (job) => job.id.toString() === id,
        });

        if (!application) {
            return NextResponse.json({ error: 'Application not found' }, { status: 404 });
        }

        return NextResponse.json(application);
    } catch (error) {
        console.error('Error fetching application:', error);
        return NextResponse.json({ error: 'Failed to fetch application' }, { status: 500 });
    }
}