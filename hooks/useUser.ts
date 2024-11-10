import { AuthContext, AuthContextType, UserPayload } from '@/context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { useContext, useEffect } from 'react'

export default function useUser(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function useNotAuthorizedUser(): (user: UserPayload) => void {
  const { user, setUser } = useUser()
  useEffect(() => {
    if (user) {
      router.push('/')
      return
    }
    AsyncStorage.getItem('user').then((user) => {
      if (user) setUser(JSON.parse(user))
    })
  }, [user])
  return (user: UserPayload) => {
    setUser(user)
    AsyncStorage.setItem('user', JSON.stringify(user))
  }
}

export function useAuthorizedUser(): {
  user: UserPayload | null
  setUser: (user: UserPayload | null) => void
} {
  const { user, setUser } = useUser()
  useEffect(() => {
    if (!user)
      AsyncStorage.getItem('user').then((user) => {
        if (user) setUser(JSON.parse(user))
        else router.push('/login')
      })
  }, [user])

  return { user, setUser }
}
