import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'jobs.json');

export async function readJobsFile() {
    try {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading jobs file:', error);
        return [];
    }
}

export async function writeJobsFile(jobs) {
    try {
        await fs.writeFile(dataFilePath, JSON.stringify(jobs, null, 2));
    } catch (error) {
        console.error('Error writing jobs file:', error);
    }
}
