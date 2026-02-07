import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { getUserPlan, upgradeToPremium, downgradeToFree } from '../services/upgrade'

function Pricing() {
  const [currentPlan, setCurrentPlan] = useState('free')
  const [loading, setLoading] = useState(false)

  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      getUserPlan(user.id).then(plan => setCurrentPlan(plan))
    }
  }, [user])

  const handleUpgrade = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    setLoading(true)

    // Mock payment confirmation
    const confirmed = window.confirm(
      'Mock Payment\n\nThis is a demo payment.\nIn production, Razorpay checkout will open here.\n\nClick OK to simulate a successful payment of ₹199/month.'
    )

    if (confirmed) {
      const { error } = await upgradeToPremium(user.id)
      if (!error) {
        setCurrentPlan('premium')
        alert('Payment successful! You are now a Premium member.')
      } else {
        alert('Something went wrong. Please try again.')
      }
    }

    setLoading(false)
  }

  const handleDowngrade = async () => {
    const confirmed = window.confirm('Are you sure you want to downgrade to Free?')
    if (confirmed) {
      const { error } = await downgradeToFree(user.id)
      if (!error) {
        setCurrentPlan('free')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Simple Pricing</h1>
          <p className="text-gray-600 text-lg">Start free, upgrade when you need more.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">

          {/* Free Plan */}
          <div className={`bg-white rounded-2xl p-8 shadow-sm border-2 ${currentPlan === 'free' ? 'border-blue-500' : 'border-gray-100'}`}>
            {currentPlan === 'free' && (
              <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">CURRENT PLAN</span>
            )}
            <h2 className="text-2xl font-bold text-gray-900 mt-4">Free</h2>
            <div className="mt-4 mb-6">
              <span className="text-4xl font-bold text-gray-900">₹0</span>
              <span className="text-gray-500"> / month</span>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-green-500 font-bold">✓</span>
                Upload & parse resume
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-green-500 font-bold">✓</span>
                Skill extraction
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-green-500 font-bold">✓</span>
                Job search (JSearch API)
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-green-500 font-bold">✓</span>
                Save jobs
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <span className="font-bold">✗</span>
                LinkedIn jobs (24h fresh)
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <span className="font-bold">✗</span>
                LinkedIn jobs (hourly fresh)
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <span className="font-bold">✗</span>
                Salary data
              </li>
            </ul>

            {currentPlan === 'free' ? (
              <button disabled className="w-full py-3 bg-gray-100 text-gray-500 font-semibold rounded-lg">
                Current Plan
              </button>
            ) : (
              <button
                onClick={handleDowngrade}
                className="w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Downgrade
              </button>
            )}
          </div>

          {/* Premium Plan */}
          <div className={`bg-white rounded-2xl p-8 shadow-lg border-2 ${currentPlan === 'premium' ? 'border-orange-500' : 'border-orange-200'} relative`}>
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full">
              {currentPlan === 'premium' ? 'CURRENT PLAN' : 'RECOMMENDED'}
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mt-4">Premium</h2>
            <div className="mt-4 mb-6">
              <span className="text-4xl font-bold text-gray-900">₹199</span>
              <span className="text-gray-500"> / month</span>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-green-500 font-bold">✓</span>
                Everything in Free
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-green-500 font-bold">✓</span>
                LinkedIn jobs (last 24 hours)
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-green-500 font-bold">✓</span>
                LinkedIn jobs (hourly fresh)
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-green-500 font-bold">✓</span>
                Salary data included
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-green-500 font-bold">✓</span>
                Company details & size
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-green-500 font-bold">✓</span>
                Direct apply links
              </li>
            </ul>

            {currentPlan === 'premium' ? (
              <button disabled className="w-full py-3 bg-orange-100 text-orange-500 font-semibold rounded-lg">
                Current Plan
              </button>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Upgrade to Premium'}
              </button>
            )}
          </div>

        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          Demo mode: No real payment is processed. Click Upgrade to simulate.
        </p>
      </div>
    </div>
  )
}

export default Pricing
