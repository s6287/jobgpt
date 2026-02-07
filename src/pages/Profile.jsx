import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { getUserPlan } from '../services/upgrade'
import { getSavedJobs } from '../services/savedJobs'

function Profile() {
  const [plan, setPlan] = useState('free')
  const [savedCount, setSavedCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    navigate('/login')
    return null
  }

  useEffect(() => {
    const loadProfile = async () => {
      const [userPlan, { data }] = await Promise.all([
        getUserPlan(user.id),
        getSavedJobs(user.id),
      ])
      setPlan(userPlan)
      setSavedCount(data?.length || 0)
      setLoading(false)
    }
    loadProfile()
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="text-5xl mb-4 animate-spin">⚡</div>
          <p className="text-lg text-gray-400">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        {/* User Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-2xl font-bold text-orange-600">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user.email}</h2>
              <p className="text-gray-500 text-sm">
                Member since {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-500 text-sm mb-1">Current Plan</p>
              <div className="flex items-center gap-2">
                <span className={`text-lg font-bold ${plan === 'premium' ? 'text-orange-600' : 'text-gray-900'}`}>
                  {plan === 'premium' ? 'Premium' : 'Free'}
                </span>
                {plan === 'premium' && (
                  <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-medium">PRO</span>
                )}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-500 text-sm mb-1">Saved Jobs</p>
              <span className="text-lg font-bold text-gray-900">{savedCount}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              to="/upload"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">📄</span>
                <span className="font-medium text-gray-700">Upload Resume</span>
              </div>
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              to="/Jobs"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🔍</span>
                <span className="font-medium text-gray-700">Search Jobs</span>
              </div>
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              to="/savedjobs"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">📌</span>
                <span className="font-medium text-gray-700">Saved Jobs ({savedCount})</span>
              </div>
              <span className="text-gray-400">→</span>
            </Link>
            {plan === 'free' && (
              <Link
                to="/pricing"
                className="flex items-center justify-between p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">⚡</span>
                  <span className="font-medium text-orange-700">Upgrade to Premium</span>
                </div>
                <span className="text-orange-400">→</span>
              </Link>
            )}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-white border border-red-200 text-red-500 font-semibold rounded-xl hover:bg-red-50 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Profile
