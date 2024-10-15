import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const jobId = formData.get('jobId');
    const cvFile = formData.get('cv');

    // Handle file upload (you may want to use a cloud storage service)
    // For this example, we'll just store the file name
    const cvUrl = cvFile ? cvFile.name : null;

    const application = await prisma.application.create({
      data: {
        name,
        email,
        phone,
        cvUrl,
        jobId,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json({ error: 'Failed to create application' }, { status: 500 });
  }
}