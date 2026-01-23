import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="flex justify-between gap-8">
          
          {/* Section 1 - Logo & Description */}
          <div className="flex-1">
            <img src="/job-gpt-logo.png" alt="JobGPT" className="h-52 mb-4" />
            <p className="text-gray-400">Find your dream job with AI-powered resume matching.</p>
          </div>

          {/* Section 2 - Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link to="/jobs" className="text-gray-400 hover:text-white">Jobs</Link>
              <Link to="/pricing" className="text-gray-400 hover:text-white">Pricing</Link>
              <Link to="/savedjobs" className="text-gray-400 hover:text-white">Saved Jobs</Link>
            </div>
          </div>

          {/* Section 3 - Account */}
          <div>
            <h3 className="font-semibold mb-4">Account</h3>
            <div className="flex flex-col gap-2">
              <Link to="/login" className="text-gray-400 hover:text-white">Login</Link>
              <Link to="/signup" className="text-gray-400 hover:text-white">Sign Up</Link>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2026 JobGPT. All rights reserved.</p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
