import useUser from '@/hooks/useUser'
import { Redirect } from 'expo-router'
import React from 'react'
import { Text, View }  from 'react-native'

const Dashboard = () => {
  const { user } = useUser()
  if (!user) return <Redirect href='/login' />
  return <View><Text>Hola {user.user}</Text></View>
}

export default Dashboard
