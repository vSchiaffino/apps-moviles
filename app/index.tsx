import CardLineChart from '@/components/charts/CardLineChart'
import Container from '@/components/Container'
import IconCard from '@/components/IconCard'
import OutlinedSelect from '@/components/OutlinedSelect/OutlinedSelect'
import Typography from '@/components/Typography'
import useUser from '@/hooks/useUser'
import { Redirect, router } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const Dashboard = () => {
  const { user } = useUser()
  if (!user) return <Redirect href="/login" />
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
    <Container style={{ height: '100%', gap: 20, alignItems: 'center' }}>
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
            router.push('/warehouseTransfer')
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
      {/* <OutlinedSelect
        setOption={() => {}}
        option=""
        label="Equipoos de futbol"
        options={['Boca', 'River', 'Racing', 'Independiente']}
      /> */}
    </Container>
  )
}

export default Dashboard
