const JSEARCH_API_KEY = import.meta.env.VITE_JSEARCH_API_KEY
const LINKEDIN_API_KEY = import.meta.env.VITE_LINKEDIN_API_KEY

// ========== FREE: JSearch API ==========
export async function searchJobs(query, page = 1) {
  const response = await fetch(
    `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=${page}&num_pages=1`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': JSEARCH_API_KEY,
        'x-rapidapi-host': 'jsearch.p.rapidapi.com',
      },
    }
  )

  const data = await response.json()
  return data
}

// ========== PREMIUM: LinkedIn Jobs (Last 24 Hours) ==========
export async function searchLinkedInJobs24h(title, location, limit = 10) {
  const response = await fetch(
    `https://linkedin-job-search-api.p.rapidapi.com/active-jb-24h?limit=${limit}&offset=0&title_filter="${encodeURIComponent(title)}"&location_filter="${encodeURIComponent(location)}"&description_type=text`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': LINKEDIN_API_KEY,
        'x-rapidapi-host': 'linkedin-job-search-api.p.rapidapi.com',
      },
    }
  )

  const data = await response.json()
  return data
}

// ========== PREMIUM: LinkedIn Jobs (Hourly) ==========
export async function searchLinkedInJobsHourly(title, location, limit = 10) {
  const response = await fetch(
    `https://linkedin-job-search-api.p.rapidapi.com/active-jb-1h?limit=${limit}&offset=0&title_filter="${encodeURIComponent(title)}"&location_filter="${encodeURIComponent(location)}"&description_type=text`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': LINKEDIN_API_KEY,
        'x-rapidapi-host': 'linkedin-job-search-api.p.rapidapi.com',
      },
    }
  )

  const data = await response.json()
  return data
}
