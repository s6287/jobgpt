import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { searchJobs, searchLinkedInJobs24h } from '../services/jobSearch'
import { saveJob, unsaveJob, getSavedJobIds } from '../services/savedJobs'
import { getUserPlan } from '../services/upgrade'

// Normalize JSearch job to common format
function normalizeJSearchJob(job) {
  return {
    job_id: job.job_id,
    title: job.job_title,
    company: job.employer_name,
    company_logo: job.employer_logo,
    location: job.job_city ? `${job.job_city}, ${job.job_country}` : job.job_country || '',
    employment_type: job.job_employment_type,
    is_remote: job.job_is_remote,
    apply_url: job.job_apply_link,
    description: job.job_description,
    salary: null,
    source: 'jsearch',
  }
}

// Normalize LinkedIn job to common format
export function normalizeLinkedInJob(job) {
  const salary = job.salary_raw?.value
    ? `$${job.salary_raw.value.minValue?.toLocaleString()} - $${job.salary_raw.value.maxValue?.toLocaleString()} / ${job.salary_raw.value.unitText?.toLowerCase()}`
    : null

  return {
    job_id: job.id,
    title: job.title,
    company: job.organization,
    company_logo: job.organization_logo,
    location: job.locations_derived?.[0] || '',
    employment_type: job.employment_type?.[0] || '',
    is_remote: job.remote_derived,
    apply_url: job.external_apply_url || job.url,
    description: job.description_text,
    salary: salary,
    source: 'linkedin',
  }
}

function Jobs() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [savedIds, setSavedIds] = useState([])
  const [savingId, setSavingId] = useState(null)
  const [plan, setPlan] = useState('free')

  const { user } = useAuth()

  // Load saved job IDs and plan on mount
  useEffect(() => {
    if (user) {
      getSavedJobIds(user.id).then(ids => setSavedIds(ids))
      getUserPlan(user.id).then(p => setPlan(p))
    }
  }, [user])

  // Auto-search if query comes from URL (from Upload page)
  useEffect(() => {
    const urlQuery = searchParams.get('query')
    if (urlQuery) {
      setQuery(urlQuery)
      fetchJobs(urlQuery)
    }
  }, [searchParams])

  const fetchJobs = async (searchQuery) => {
    setLoading(true)
    setError('')

    let allJobs = []

    // Always fetch from JSearch (free)
    const data = await searchJobs(searchQuery)
    if (data.status === 'OK') {
      allJobs = data.data.map(normalizeJSearchJob)
    } else {
      setError('Failed to fetch jobs. Check your API key.')
    }

    // If premium, also fetch LinkedIn jobs
    if (plan === 'premium') {
      try {
        const linkedInData = await searchLinkedInJobs24h(searchQuery, '', 10)
        if (Array.isArray(linkedInData)) {
          const linkedInJobs = linkedInData.map(normalizeLinkedInJob)
          allJobs = [...linkedInJobs, ...allJobs]  // LinkedIn first (fresher)
        }
      } catch (err) {
        // LinkedIn API failed, still show JSearch results
      }
    }

    setJobs(allJobs)
    setLoading(false)
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    fetchJobs(query)
  }

  const handleSave = async (job) => {
    if (!user) return
    setSavingId(job.job_id)

    if (savedIds.includes(job.job_id)) {
      const { error } = await unsaveJob(user.id, job.job_id)
      if (!error) {
        setSavedIds(prev => prev.filter(id => id !== job.job_id))
      }
    } else {
      const { error } = await saveJob(user.id, job)
      if (!error) {
        setSavedIds(prev => [...prev, job.job_id])
      }
    }

    setSavingId(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Jobs</h1>
        <p className="text-gray-600 mb-8">Search thousands of jobs from top companies.</p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. React Developer in India"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Premium Upsell Banner */}
        {user && plan === 'free' && (
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div>
              <p className="text-gray-800 font-medium">Upgrade to Premium for LinkedIn jobs with salary data</p>
              <p className="text-gray-500 text-sm">Fresh jobs every hour + direct apply links</p>
            </div>
            <Link
              to="/pricing"
              className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap"
            >
              Upgrade ₹199/mo
            </Link>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">{error}</div>
        )}

        {/* Results Count */}
        {jobs.length > 0 && (
          <p className="text-gray-600 mb-4">{jobs.length} jobs found for "{query}"</p>
        )}

        {/* Job Cards */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.job_id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  {/* Company Logo */}
                  {job.company_logo ? (
                    <img
                      src={job.company_logo}
                      alt={job.company}
                      className="w-12 h-12 rounded-lg object-contain bg-gray-50"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 font-bold">
                      {job.company?.charAt(0)}
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                    <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-500">
                      {job.location && <span>{job.location}</span>}
                      {job.employment_type && (
                        <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                          {job.employment_type}
                        </span>
                      )}
                      {job.is_remote && (
                        <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded">
                          Remote
                        </span>
                      )}
                      {job.salary && (
                        <span className="bg-purple-50 text-purple-600 px-2 py-0.5 rounded">
                          {job.salary}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Apply + Save Buttons */}
                <div className="flex items-center gap-2">
                  {user && (
                    <button
                      onClick={() => handleSave(job)}
                      disabled={savingId === job.job_id}
                      className={`p-2 rounded-lg border transition-colors ${
                        savedIds.includes(job.job_id)
                          ? 'bg-orange-50 border-orange-300 text-orange-500'
                          : 'bg-white border-gray-200 text-gray-400 hover:text-orange-500 hover:border-orange-300'
                      }`}
                      title={savedIds.includes(job.job_id) ? 'Unsave' : 'Save job'}
                    >
                      {savedIds.includes(job.job_id) ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                      )}
                    </button>
                  )}

                  <a
                    href={job.apply_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Apply
                  </a>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mt-4 line-clamp-3">
                {job.description?.slice(0, 250)}...
              </p>
            </div>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4 animate-spin">⚡</div>
            <p className="text-lg">Searching jobs...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && jobs.length === 0 && !error && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg">Search for jobs to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Jobs
