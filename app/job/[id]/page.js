'use client'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function JobDetails() {

  const { id } = useParams(); // Get the job ID from the URL

  const [job, setJob] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (id) {
      // Fetch job details using the job ID
      console.log("Fetching job details for ID:", id);

      const fetchJobDetails = async () => {
        const url = `https://api.theirstack.com/v1/jobs/${id}`
        const options = {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYW5td2lob3RpQGdtYWlsLmNvbSIsInBlcm1pc3Npb25zIjoidXNlciJ9.J-UF0D5r1V4PcIEb77tW4vQW73qRqmB4mK-PPQO1jzE' // Replace with your actual API key
          },
            
        }

        try {
          const response = await fetch(url, options)
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          const result = await response.json()
          setJob(result.data) // Assuming the job details are in result.data
        } catch (error) {
          console.error('Error fetching job details:', error)
          setError('Failed to fetch job details. Please try again later.')
        } finally {
          setIsLoading(false)
        }
      }

      fetchJobDetails()
    }
  }, [id])

  if (isLoading) {
    return <div className="text-center">Loading job details...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  if (!job) {
    return <div className="text-center">No job details found.</div>
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{job.job_title}</h1>
      <p className="text-gray-600 mb-4">Company: {job.company_object?.name || 'N/A'}</p>
      <p className="text-gray-600 mb-4">City: {job.company_object?.city || 'N/A'}</p>
      <p className="text-gray-600 mb-4">Industry: {job.company_object?.industry || 'N/A'}</p>
      <p className="text-gray-600 mb-4">Remote: {job.remote ? 'Yes' : 'No'}</p>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Job Description</h2>
        <p className="mt-4 text-gray-800">{job.description || 'No description available.'}</p>
      </div>

      <div className="mt-6">
        <a
          href={job.apply_url || job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Apply Now
        </a>
      </div>
    </div>
  )
}
