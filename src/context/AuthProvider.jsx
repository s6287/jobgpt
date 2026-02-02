import React from 'react'
import { useState,useEffect } from 'react'
import Authcontext from './AuthContext'
import { supabase } from '../services/supabase'
function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // 1. Check session on mount + listen for changes
    useEffect(() => {
        // Check if already logged in
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        // Listen for login/logout changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null)
            }
        )

        // Cleanup
        return () => subscription.unsubscribe()
    }, [])

    // 2. Signup function
    const signup = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({ email, password })
        return { data, error }
    }

    // 3. Login function
    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        return { data, error }
    }

    // 4. Logout function
    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        return { error }
    }

    return (
        <Authcontext.Provider value={{ user, loading, signup, login, logout }}>
            {children}
        </Authcontext.Provider>
    )
}

export default AuthProvider