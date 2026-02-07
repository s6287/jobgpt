import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { supabase } from '../services/supabase'
import { parseResume } from '../utils/parseResume'

function Upload() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [parsing, setParsing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Parsed resume data
  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState(null)
  const [jobTitle, setJobTitle] = useState('')
  const [isParsed, setIsParsed] = useState(false)

  const { user } = useAuth()
  const navigate = useNavigate()

  // Redirect if not logged in
  if (!user) {
    navigate('/login')
    return null
  }

  function handleFileChange(e) {
    setFile(e.target.files[0])
    setError('')
    setSuccess('')
    setIsParsed(false)
    setSkills([])
    setExperience(null)
    setJobTitle('')
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a PDF file')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    // Step 1: Upload to Supabase Storage
    const filePath = `${user.id}/${file.name}`
    const { error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(filePath, file, { upsert: true })

    if (uploadError) {
      setError(uploadError.message)
      setLoading(false)
      return
    }

    setSuccess('Resume uploaded!')
    setLoading(false)

    // Step 2: Parse the PDF
    setParsing(true)
    try {
      const result = await parseResume(file)
      setSkills(result.skills)
      setExperience(result.experience)
      setJobTitle(result.jobTitle || '')
      setIsParsed(true)
    } catch (err) {
      setError('Could not parse resume. Please try again.')
    }
    setParsing(false)
  }

  const handleFindJobs = () => {
    // Build search query from skills and job title
    const query = jobTitle || skills.slice(0, 3).join(' ')
    navigate(`/Jobs?query=${encodeURIComponent(query)}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Your Resume</h1>
        <p className="text-gray-600 mb-8">Upload a PDF and we'll extract your skills to find matching jobs.</p>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">{error}</div>
        )}

        {success && (
          <div className="bg-green-100 text-green-600 p-3 rounded-lg mb-4">{success}</div>
        )}

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-orange-400 transition-colors">
            <div className="text-4xl mb-4">📄</div>
            <p className="text-gray-700 font-medium mb-2">
              {file ? file.name : 'Choose a PDF file'}
            </p>
            <p className="text-gray-400 text-sm mb-4">PDF only, max 5MB</p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="block mx-auto text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-50 file:text-orange-600 file:font-medium hover:file:bg-orange-100"
            />
          </div>

          <button
            onClick={handleUpload}
            disabled={loading || parsing || !file}
            className="w-full mt-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Uploading...' : parsing ? 'Analyzing Resume...' : 'Upload & Analyze'}
          </button>
        </div>

        {/* Parsed Results */}
        {isParsed && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Resume Analysis</h2>

            {/* Detected Job Title */}
            {jobTitle && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Detected Role</h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-gray-900">{jobTitle}</span>
                  <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">Auto-detected</span>
                </div>
              </div>
            )}

            {/* Experience */}
            {experience && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Experience</h3>
                <p className="text-lg font-semibold text-gray-900">{experience}+ years</p>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Skills Found ({skills.length})</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {skills.length === 0 && !jobTitle && (
              <p className="text-gray-500 mb-6">No skills detected. You can search manually on the Jobs page.</p>
            )}

            {/* Find Jobs Button */}
            <button
              onClick={handleFindJobs}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-colors"
            >
              Find Matching Jobs →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Upload
