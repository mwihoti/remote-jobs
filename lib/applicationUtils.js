import prisma from './prisma';

export async function saveApplication(applicationData) {
  // Save application data to the database using Prisma
  const savedApplication = await prisma.application.create({
    data: applicationData,
  });
  return savedApplication;
}

export async function saveCV(cvFile) {
  // This function should handle saving the CV file
  // You might want to use a cloud storage service like AWS S3 or Google Cloud Storage
  // For now, we'll just return a placeholder path
  return `/uploads/${Date.now()}-${cvFile.name}`;
}