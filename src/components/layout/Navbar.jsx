import { Link } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

function Navbar() {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <nav className="sticky top-0 bg-white border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <span className="text-xl font-bold text-gray-900">JobGPT</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          <Link to="/#features" className="text-gray-600 hover:text-gray-900 font-medium">Features</Link>
          <Link to="/pricing" className="text-gray-600 hover:text-gray-900 font-medium">Pricing</Link>
          <Link to="/savedjobs" className="text-gray-600 hover:text-gray-900 font-medium">Saved Jobs</Link>

          {/* Show Login or User info based on auth state */}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-600 text-sm">{user.email}</span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">Login</Link>
          )}
        </div>

        {/* CTA Button */}
        <Link to="/upload" className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors">
          <span>📄</span>
          <span>Upload Resume</span>
        </Link>

      </div>
    </nav>
  )
}

export default Navbar
