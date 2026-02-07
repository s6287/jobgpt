import { supabase } from './supabase'

// Save a job
export async function saveJob(userId, job) {
  const { data, error } = await supabase
    .from('saved_jobs')
    .insert({
      user_id: userId,
      job_id: job.job_id,
      job_data: job,          // store entire job object as JSONB
      match_score: null,
    })

  return { data, error }
}

// Remove a saved job
export async function unsaveJob(userId, jobId) {
  const { error } = await supabase
    .from('saved_jobs')
    .delete()
    .eq('user_id', userId)
    .eq('job_id', jobId)

  return { error }
}

// Get all saved jobs for a user
export async function getSavedJobs(userId) {
  const { data, error } = await supabase
    .from('saved_jobs')
    .select('*')
    .eq('user_id', userId)
    .order('saved_at', { ascending: false })

  return { data, error }
}

// Get saved job IDs (for quick lookup)
export async function getSavedJobIds(userId) {
  const { data, error } = await supabase
    .from('saved_jobs')
    .select('job_id')
    .eq('user_id', userId)

  if (error) return []
  return data.map(row => row.job_id)
}
