import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const description = searchParams.get('description')
    const location = searchParams.get('location')

    const url = 'https://remote-jobs-api1.p.rapidapi.com/jobs/search';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '59de292f59msha00552ad6980245p1d0040jsn8e89f940944e',
            'x-rapidapi-host': 'remote-jobs-api1.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: {
            search: 'python',
            country: 'usa',
            max_results: 50,
            after: 0
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
return NextResponse.json({ error: "Error fetching jobs"}, { status: 500})
    }
}