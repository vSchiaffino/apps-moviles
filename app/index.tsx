import CardLineChart from '@/components/charts/CardLineChart'
import Container from '@/components/Container'
import IconCard from '@/components/IconCard'
import Typography from '@/components/Typography'
import { useAuthorizedUser } from '@/hooks/useUser'
import { router } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const Dashboard = () => {
  const { user } = useAuthorizedUser()
  const lineData = [
    { value: 0 },
    { value: 20 },
    { value: 8 },
    { value: 40 },
    { value: 12 },
    { value: 30 },
    { value: 90 },
    { value: 75 },
  ]
  return (
    user && (
      <Container style={{ height: '100%' }}>
        <View
          style={{
            marginTop: 50,
            padding: 16,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <Typography variant="h4">Bienvenido {user.user}</Typography>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 20,
            }}
          >
            <IconCard
              icon="cube-outline"
              color={'primary'}
              text="Productos"
              onPress={() => {
                router.push('/warehouse-transfer')
              }}
            />
            <IconCard
              icon="ban-outline"
              color={'danger'}
              text="Anulaciones"
              onPress={() => {
                console.log('sape')
              }}
            />
          </View>
          <CardLineChart data={lineData} />
        </View>
      </Container>
    )
  )
}

export default Dashboard
