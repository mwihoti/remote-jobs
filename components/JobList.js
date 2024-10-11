'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function JobList() {
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [industry, setIndustry] = useState("")
  const [geo, setGeo] = useState("")

  const router = useRouter();

  const fetchJobs = async () => {
    let url = 'https://jobicy.com/api/v2/remote-jobs?count=50'
    if (searchTerm) url += `&tag=${encodeURIComponent(searchTerm)}`
    if (industry) url += `&industry=${encodeURIComponent(industry)}`
    if (geo) url += `&geo=${encodeURIComponent(geo)}`

    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const result = await response.json()
      setJobs(result)
    } catch (error) {
      console.error('Error fetching jobs:', error)
      setError('Failed to fetch jobs. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [searchTerm, industry, geo])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchJobs()
  }

  const handleJobClick = (jobId) => {
    router.push(`/job/${jobId}`)
  }

  if (isLoading) return <div className="text-center">Loading jobs...</div>

  if (error) return <div className="text-center text-red-500">{error}</div>

  if (jobs.length === 0) return <div className="text-center">No jobs found.</div>

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search jobs"
          className="px-4 py-2 border rounded-md mr-2"
        />
        <input
          type="text"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="Industry"
          className="px-4 py-2 border rounded-md mr-2"
        />
        <input
          type="text"
          value={geo}
          onChange={(e) => setGeo(e.target.value)}
          placeholder="Region"
          className="px-4 py-2 border rounded-md mr-2"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Search</button>
      </form>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer" onClick={() => handleJobClick(job.id)}>
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{job.jobTitle}</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Company: {job.companyName}</p>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Industry: {job.jobIndustry}</p>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Region: {job.jobGeo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}