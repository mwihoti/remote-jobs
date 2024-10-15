import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse form data
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const jobId = formData.get('jobId');
    const cvFile = formData.get('cv');
    const userId = formData.get('userId');

    // Validate input
    const missingFields = [];
    if (!name) missingFields.push('name');
    if (!email) missingFields.push('email');
    if (!phone) missingFields.push('phone');
    if (!jobId) missingFields.push('jobId');
    if (!userId) missingFields.push('userId');

    if (missingFields.length > 0) {
      return NextResponse.json({ error: 'Missing required fields', missingFields }, { status: 400 });
    }

    // Instead of saving to the database, just return a success message
    return NextResponse.json({ message: 'Application submitted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error processing application:', error);
    
    return NextResponse.json({ error: 'Failed to process application', details: error.message }, { status: 500 });
  }
}