import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'

function Test() {
  const [message, setMessage] = useState('Testing Supabase...')
  const [profiles, setProfiles] = useState([])

  // Test 1: Check environment variables
  useEffect(() => {
    console.log('=== SUPABASE CONNECTION TEST ===')
    console.log('URL:', import.meta.env.VITE_SUPABASE_URL)
    console.log('Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY)
  }, [])

  // Test 2: Query database
  const testDatabase = async () => {
    console.log('Testing database query...')
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
    
    if (error) {
      console.error('Error:', error)
      setMessage(`Error: ${error.message}`)
    } else {
      console.log('Success! Data:', data)
      setMessage(`Success! Found ${data.length} profiles`)
      setProfiles(data)
    }
  }

  // Test 3: Test auth
  const testAuth = async () => {
    const { data, error } = await supabase.auth.getSession()
    console.log('Current session:', data)
    console.log('Error:', error)
    setMessage(data.session ? 'User is logged in!' : 'No user logged in')
  }


  // Add this function with the other test functions
const testCreateProfile = async () => {
  console.log('Testing profile creation...')
  
  // This will fail because we need to be authenticated first
  // But it's good to see the error message
  const { data, error } = await supabase
    .from('profiles')
    .insert([
      { 
        id: '00000000-0000-0000-0000-000000000000', // fake UUID
        email: 'test@example.com',
        full_name: 'Test User',
        is_premium: false
      }
    ])
    .select()
  
  if (error) {
    console.error('❌ Error (expected):', error.message)
    setMessage(`Expected Error: ${error.message}`)
  } else {
    console.log('✅ Success:', data)
    setMessage('Profile created!')
  }
}

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          🧪 Test Page
        </h1>

        {/* Status Message */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Status:</h2>
          <p className="text-gray-700 font-mono">{message}</p>
        </div>

        {/* Test Buttons */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Tests:</h2>
          <div className="space-y-3">
            <button 
              onClick={testDatabase}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Test Database Connection
            </button>
            <button 
              onClick={testAuth}
              className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Test Authentication
            </button>


            <button 
  onClick={testCreateProfile}
  className="w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
>
  Test Create Profile (Will Fail - That's OK!)
</button>
          </div>
        </div>

        {/* Environment Variables */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment:</h2>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Supabase URL:</span>
              <span className="text-gray-900">
                {import.meta.env.VITE_SUPABASE_URL || '❌ Missing'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">API Key:</span>
              <span className="text-gray-900">
                {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Loaded' : '❌ Missing'}
              </span>
            </div>
          </div>
        </div>

        {/* Results */}
        {profiles.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Profiles Data:</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              {JSON.stringify(profiles, null, 2)}
            </pre>
          </div>
        )}

        {/* Browser Console Reminder */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <p className="text-yellow-800">
            💡 <strong>Tip:</strong> Press F12 to open browser console and see detailed logs!
          </p>
        </div>
      </div>
    </div>
  )
}

export default Test