import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { getSavedJobs, unsaveJob } from '../services/savedJobs'

function SavedJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState(null)

  const { user } = useAuth()
  const navigate = useNavigate()

  // Redirect if not logged in
  if (!user) {
    navigate('/login')
    return null
  }

  useEffect(() => {
    loadSavedJobs()
  }, [])

  const loadSavedJobs = async () => {
    setLoading(true)
    const { data, error } = await getSavedJobs(user.id)
    if (!error && data) {
      setJobs(data)
    }
    setLoading(false)
  }

  const handleRemove = async (jobId) => {
    setRemovingId(jobId)
    const { error } = await unsaveJob(user.id, jobId)
    if (!error) {
      setJobs(prev => prev.filter(row => row.job_id !== jobId))
    }
    setRemovingId(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="text-5xl mb-4 animate-spin">⚡</div>
          <p className="text-lg text-gray-400">Loading saved jobs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Jobs</h1>
        <p className="text-gray-600 mb-8">Jobs you bookmarked for later. {jobs.length} saved.</p>

        {/* Job Cards */}
        {jobs.length > 0 ? (
          <div className="space-y-4">
            {jobs.map((row) => {
              const job = row.job_data  // job details are inside job_data JSONB

              return (
                <div
                  key={row.id}
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
                          {job.source && (
                            <span className="bg-gray-50 text-gray-500 px-2 py-0.5 rounded">
                              via {job.source}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRemove(row.job_id)}
                        disabled={removingId === row.job_id}
                        className="p-2 rounded-lg border border-red-200 text-red-400 hover:text-red-600 hover:border-red-400 transition-colors disabled:opacity-50"
                        title="Remove from saved"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>

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
                  {job.description && (
                    <p className="text-gray-600 text-sm mt-4 line-clamp-3">
                      {job.description.slice(0, 250)}...
                    </p>
                  )}

                  {/* Saved Date */}
                  <p className="text-gray-400 text-xs mt-3">
                    Saved on {new Date(row.saved_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">📌</div>
            <p className="text-lg mb-4">No saved jobs yet</p>
            <button
              onClick={() => navigate('/Jobs')}
              className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Browse Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedJobs
