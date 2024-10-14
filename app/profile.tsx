import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useUser from '@/hooks/useUser'
import { Redirect } from 'expo-router'
import ProfilePage from '@/pages/ProfilePage/ProfilePage'

const profile = () => {
  // const { user } = useUser()
  // if (!user) return <Redirect href="/" />
  return (
    <ProfilePage
      user={{
        id: 1,
        name: 'Valentin',
        lastName: 'Schiaffino',
        mail: 'valenschg@gmail.com',
        user: 'valen',
      }}
    />
  )
}

export default profile

const styles = StyleSheet.create({})
