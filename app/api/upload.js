import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;
    const { cv } = formData;
    
    if (!cv) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    // Create the upload directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Save the file to the upload directory
    const filePath = path.join(uploadDir, cv.name);
    fs.writeFileSync(filePath, cv.buffer);

    res.status(200).json({ message: 'File uploaded successfully', filePath: `/uploads/${cv.name}` });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
