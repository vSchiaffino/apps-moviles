import React from 'react'
import { Redirect } from 'expo-router'
import useUser from '@/hooks/useUser'

const index = () => {
  const { user } = useUser()
  return user === null ? (
    <Redirect href='/login' />
  ) : (
    <Redirect href='/dashboard' />
  )
}

export default index
