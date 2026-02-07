import { supabase } from './supabase'

// Get user's current plan
export async function getUserPlan(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', userId)
    .single()

  if (error) return 'free'
  return data.plan || 'free'
}

// Mock payment - upgrade to premium
export async function upgradeToPremium(userId) {
  // In production: verify Razorpay payment here first
  // For now: directly update the plan
  const { data, error } = await supabase
    .from('profiles')
    .update({ plan: 'premium' })
    .eq('id', userId)

  return { data, error }
}

// Downgrade to free
export async function downgradeToFree(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ plan: 'free' })
    .eq('id', userId)

  return { data, error }
}
