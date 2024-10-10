'use client'

import { useState, useEffect } from 'react'

export default function JobList() {
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("software") // Default search term
  const [searchTerm, setSearchTerm] = useState("software")
  const [companyName, setCompanyName] = useState("") // To allow filtering by company name
  const [excludedCompany, setExcludedCompany] = useState("") // To exclude certain companies
  const [partialMatchCompany, setPartialMatchCompany] = useState("") // For partial match companies

  const fetchJobs = async () => {
    const url = 'https://api.theirstack.com/v1/jobs/search'
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYW5td2lob3RpQGdtYWlsLmNvbSIsInBlcm1pc3Npb25zIjoidXNlciJ9.J-UF0D5r1V4PcIEb77tW4vQW73qRqmB4mK-PPQO1jzE' // Replace with your actual API key
      },
      body: JSON.stringify({
        include_total_results: false,
        order_by: [
          {
            desc: true,
            field: "date_posted"
          }
        ],
        posted_at_max_age_days: 15,
        job_country_code_or: [
          "KE", "FR", "CN", "AU", "US", "VI", "CA"
        ],
        job_title_or: [searchQuery],
        company_name_or: companyName ? [companyName] : [], // Filter by exact company name (case-sensitive)
        company_name_case_insensitive_or: companyName ? [companyName] : [], // Filter by exact company name (case-insensitive)
        company_name_partial_match_or: partialMatchCompany ? [partialMatchCompany] : [], // For partial company name match
        company_name_not: excludedCompany ? [excludedCompany] : [] // Exclude companies by exact name
      })
    }

    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      if (result.data && Array.isArray(result.data)) {
        setJobs(result.data)
      } else {
        setError('Unexpected data format received from API')
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
      setError('Failed to fetch jobs. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [searchQuery, companyName, excludedCompany, partialMatchCompany]) // Refetch jobs when any of these filters change

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchQuery(searchTerm) // Update search query with the term entered by the user
  }

  if (isLoading) {
    return <div className="text-center">Loading jobs...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  if (jobs.length === 0) {
    return <div className="text-center">No jobs found for "{searchQuery}".</div>
  }

  return (
    <div>
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a job title (e.g., software, cloud engineer, cybersecurity)"
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Filter by company name (case-sensitive)"
          className="mt-2 border border-gray-300 rounded-md p-2 w-full"
        />
        <input
          type="text"
          value={partialMatchCompany}
          onChange={(e) => setPartialMatchCompany(e.target.value)}
          placeholder="Filter by partial company name (case-insensitive)"
          className="mt-2 border border-gray-300 rounded-md p-2 w-full"
        />
        <input
          type="text"
          value={excludedCompany}
          onChange={(e) => setExcludedCompany(e.target.value)}
          placeholder="Exclude by company name"
          className="mt-2 border border-gray-300 rounded-md p-2 w-full"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Search
        </button>
      </form>

      {/* Job Listings */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{job.job_title}</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Company: {job.company_object?.name || 'N/A'}</p>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">City: {job.company_object?.city || 'N/A'}</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{job.long_location || job.short_location || 'N/A'}</dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Remote</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {job.remote ? "Yes" : "No"}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Industry</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{job.company_object?.industry || 'N/A'}</dd>
                </div>
              </dl>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                View Job
              </a>
              <a
                href={`${job.apply_url ? job.apply_url : job.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center py-2 px-4 ml-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Apply Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
