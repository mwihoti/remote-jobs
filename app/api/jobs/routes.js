import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { workosWithAuthetUser as getUser } from '../../../lib/auth'
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'jobs.json');

async function readJobsFile() {
    try {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        return JSON.parse(data)
    } catch (error) {
        console.error('Error reading jobs file:', error);
        return [];
    }
}

async function writeJobsFile(jobs) {
    try {
        await fs.writeFile(dataFilePath, JSON.stringify(jobs, null, 2));
    } catch (error) {
        console.error('Error writing jos file.', error);
    }
}

export async function GET(request) {
    const jobs = await readJobsFile();
    return NextResponse.json(jobs);
}

export async function POST(request) {
    const user = await getUser(request);
    if (user.role !== 'ADMIN') {
        return NextResponse.json({  error: 'Unauthorized'}, {status: 403});
    }

    const data = await request.json();
    const jobs = await readJobsFile();

    const newJob = {
        id: Date.now().toString(),
        ...data,
        createdBy: user.id,
        createdAt: new Date().toISOString(),
    };

    jobs.push(newJob);
    await writeJobsFile(jobs);

    return NextResponse.json(newJob, {status: 201});
}