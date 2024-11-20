import { AuthContext, AuthContextType, UserPayload } from '@/context/AuthContext'
import userService from '@/services/user.service'
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
      // router.push('/')
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
  user: UserPayload
  setUser: (user: UserPayload | null) => void
  editUser: (form: any) => Promise<void>
  changePicture: (pictureUrl: string) => Promise<void>
} {
  const { user, setUser } = useUser()
  useEffect(() => {
    if (!user)
      AsyncStorage.getItem('user').then((user) => {
        if (user) setUser(JSON.parse(user))
        else router.push('/login')
      })
  }, [user])

  return {
    user: user as UserPayload,
    setUser,
    editUser: async (form: any) => {
      const jwt = await AsyncStorage.getItem('jwt')
      if (!jwt) throw new Error('Inicia sesión para editar tus datos')
      const response = await userService.editUser(jwt, { name: form.name, lastName: form.lastName })
      const updatedUser = await response.json()
      setUser(updatedUser)
    },
    changePicture: async (pictureUrl: string) => {
      try {
        const response = await userService.changePicture(pictureUrl)
        const { profilePictureUrl } = await response.json()
        setUser({ ...user, profilePictureUrl } as any)
      } catch (error) {
        console.log('Error subiendo la imagen', error)
      }
    },
  }
}
