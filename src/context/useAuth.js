import { useContext } from 'react'
import Authcontext from './AuthContext'

export function useAuth() {
    return useContext(Authcontext)
}
