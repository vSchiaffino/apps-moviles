import React from 'react'
import useUser from '@/hooks/useUser'
import { Redirect } from 'expo-router'
import ProfilePage from '@/pages/ProfilePage/ProfilePage'

const profile = () => {
  const { user } = useUser()
  if (!user) return <Redirect href="/" />

  return (
    <ProfilePage
      user={{user}}
    />
  )
}

export default profile
