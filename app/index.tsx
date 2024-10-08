import useUser from '@/hooks/useUser'
import { Redirect } from 'expo-router'
import React from 'react'

const Dashboard = () => {
  const { user } = useUser()
  if (!user) return <Redirect href='/login' />
  return <div>Hola {user.user}</div>
}

export default Dashboard
