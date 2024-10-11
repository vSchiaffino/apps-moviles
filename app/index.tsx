import Container from '@/components/Container'
import IconCard from '@/components/IconCard'
import Typography from '@/components/Typography'
import useUser from '@/hooks/useUser'
import { Redirect } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const Dashboard = () => {
  const { user } = useUser()
  if (!user) return <Redirect href="/login" />
  return (
    <Container style={{ gap: 20 }}>
      <Typography variant="h4">Bienvenido {user.user}</Typography>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <IconCard icon="cube-outline" color={'primary'} text="Productos" />
        <IconCard icon="ban-outline" color={'danger'} text="Anulaciones" />
      </View>
    </Container>
  )
}

export default Dashboard
