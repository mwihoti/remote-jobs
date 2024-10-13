import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { workosWithAuthetUser as getUser } from '../../../lib/auth'

export async function GET(request) {
    const jobs = await prisma.job.findMany();
    return NextResponse.json(jobs);
}

export async function POST(request) {
    const user = await getUser(request);
    if (user.role !== 'ADMIN') {
        return NextResponse.json({  error: 'Unauthorized'}, {status: 403});
    }

    const data = await request.json();
    const job = await prisma.job.create({
        data: {
            ...data,
            createdBy: { connect: { id: user.id }}
        }
    });
    return NextResponse.json(job);
}