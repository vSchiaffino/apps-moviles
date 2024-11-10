import React from 'react'
import { useAuthorizedUser } from '@/hooks/useUser'
import ProfilePage from '@/pages/ProfilePage/ProfilePage'

const profile = () => {
  const { user } = useAuthorizedUser()
  return user && <ProfilePage user={user} />
}

export default profile
