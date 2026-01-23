import React from 'react'

function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-purple-950"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm text-gray-300">AI-Powered Job Matching</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Find Your Perfect Job
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">
                  in Seconds
                </span>
              </h1>

              <p className="text-lg text-gray-300 mb-10 max-w-lg mx-auto lg:mx-0">
                Upload your resume and let our AI instantly match you with thousands of relevant jobs. Smart, fast, and effortless.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300">
                  <span className="flex items-center justify-center gap-2">
                    Upload Resume
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                  See How It Works
                </button>
              </div>

              {/* Stats */}
              <div className="flex justify-center lg:justify-start gap-8 mt-12 pt-8 border-t border-white/10">
                <div>
                  <p className="text-3xl font-bold text-white">10K+</p>
                  <p className="text-sm text-gray-400">Active Users</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">50K+</p>
                  <p className="text-sm text-gray-400">Jobs Matched</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">95%</p>
                  <p className="text-sm text-gray-400">Satisfaction</p>
                </div>
              </div>
            </div>

            {/* Right - Dashboard Preview */}
            <div className="hidden lg:block relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>

              <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-sm">JG</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Your Matches</p>
                      <p className="text-xs text-gray-400">Based on your skills</p>
                    </div>
                  </div>
                  <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                    Live
                  </div>
                </div>

                {/* Job Cards */}
                <div className="space-y-3">
                  <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/50 hover:border-orange-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-white font-medium">Senior Frontend Developer</h4>
                        <p className="text-gray-400 text-sm">Google • Mountain View, CA</p>
                      </div>
                      <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        96% Match
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-slate-600 text-gray-300 px-2 py-1 rounded text-xs">React</span>
                      <span className="bg-slate-600 text-gray-300 px-2 py-1 rounded text-xs">TypeScript</span>
                      <span className="bg-slate-600 text-gray-300 px-2 py-1 rounded text-xs">$180K</span>
                    </div>
                  </div>

                  <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/50 hover:border-orange-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-white font-medium">Full Stack Engineer</h4>
                        <p className="text-gray-400 text-sm">Meta • Remote</p>
                      </div>
                      <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        92% Match
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-slate-600 text-gray-300 px-2 py-1 rounded text-xs">Node.js</span>
                      <span className="bg-slate-600 text-gray-300 px-2 py-1 rounded text-xs">React</span>
                      <span className="bg-slate-600 text-gray-300 px-2 py-1 rounded text-xs">$165K</span>
                    </div>
                  </div>

                  <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/50 hover:border-orange-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-white font-medium">React Developer</h4>
                        <p className="text-gray-400 text-sm">Stripe • San Francisco</p>
                      </div>
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        87% Match
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-slate-600 text-gray-300 px-2 py-1 rounded text-xs">React</span>
                      <span className="bg-slate-600 text-gray-300 px-2 py-1 rounded text-xs">GraphQL</span>
                      <span className="bg-slate-600 text-gray-300 px-2 py-1 rounded text-xs">$150K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
              Simple Process
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Three simple steps to find your dream job. No complicated forms, no endless scrolling.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative group h-full">
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Upload Resume</h3>
                <p className="text-gray-600">Simply upload your PDF resume. Our AI will automatically extract your skills and experience.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group h-full">
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">AI Matches Jobs</h3>
                <p className="text-gray-600">Our AI analyzes thousands of jobs and ranks them by how well they match your profile.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group h-full">
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Apply & Land</h3>
                <p className="text-gray-600">Review your matches, save favorites, and apply directly. Track everything in one place.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
                Powerful Features
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Everything You Need to Land Your Dream Job
              </h2>
              <p className="text-gray-600 mb-8">
                We've built every feature you need to make your job search faster and more effective.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Smart Match Score</h4>
                    <p className="text-gray-600 text-sm">See exactly how well each job matches your skills with our AI-powered scoring.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Real-Time Jobs</h4>
                    <p className="text-gray-600 text-sm">Access fresh job listings updated daily from top job boards and companies.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💾</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Save & Track</h4>
                    <p className="text-gray-600 text-sm">Save interesting jobs and keep track of your applications all in one dashboard.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Advanced Filters</h4>
                    <p className="text-gray-600 text-sm">Filter by location, salary, experience level, remote options, and more.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 shadow-2xl">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <span className="text-green-400">✓</span>
                        </div>
                        <span className="text-white">Skills extracted from resume</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <span className="text-green-400">✓</span>
                        </div>
                        <span className="text-white">2,847 jobs analyzed</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <span className="text-green-400">✓</span>
                        </div>
                        <span className="text-white">127 high-match jobs found</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-orange-500/20 rounded-xl border border-orange-500/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                          <span className="text-white">→</span>
                        </div>
                        <span className="text-white font-medium">View Your Matches</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-4">
              Pricing
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600">Start free. Upgrade when you're ready.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <p className="text-gray-600">Perfect for getting started</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-bold text-gray-900">₹0</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">AI job matching</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">Resume upload & parsing</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">Save up to 10 jobs</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">Basic search filters</span>
                </li>
              </ul>
              <button className="w-full py-4 border-2 border-gray-200 rounded-xl font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                Get Started Free
              </button>
            </div>

            {/* Premium */}
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                  RECOMMENDED
                </span>
              </div>
              <div className="mb-8 mt-4">
                <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
                <p className="text-gray-400">For serious job seekers</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-bold text-white">₹199</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-300">Everything in Free</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-300">Fresh LinkedIn jobs (24h)</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-300">Unlimited saved jobs</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-300">Salary insights</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-300">Priority support</span>
                </li>
              </ul>
              <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-colors shadow-lg shadow-orange-500/25">
                Get Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Your Dream Job?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of job seekers who found their perfect match with JobGPT.
          </p>
          <button className="px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all">
            Get Started for Free
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home
