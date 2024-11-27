import CardLineChart from '@/components/charts/CardLineChart'
import Container from '@/components/Container'
import IconCard from '@/components/IconCard'
import StyledButton from '@/components/StyledButton'
import Typography from '@/components/Typography'
import useShift from '@/hooks/useShift'
import { useAuthorizedUser } from '@/hooks/useUser'
import { router, useNavigation } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const Dashboard = () => {
  const { user } = useAuthorizedUser()
  const { shift, start, end } = useShift()
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
  function endShift() {
    router.push('/dashboard/reports') //Temporary until we make endshift page
    end()
  }

  function startShift() {
    router.push('/dashboard/startshift')
    start()
  }

  return (
    user && (
      <Container style={{ height: '100%' }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{}}>
          <View
            style={{
              marginTop: 70,
              padding: 16,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 20,
              paddingBottom: 100,
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
                  router.push('/products')
                }}
              />
              <IconCard
                icon="warehouse"
                color={'gray'}
                text="Depósitos"
                onPress={() => {
                  router.push('/warehouse')
                }}
              />
            </View>
            <CardLineChart data={lineData} />
            <IconCard
              icon="bar-chart-outline"
              color={'primary'}
              text="Reportes"
              onPress={() => {
                router.push('/dashboard/reports')
              }}
            />
            <IconCard
              icon="time-outline"
              color={shift ? 'yellow' : 'primary'}
              text={shift ? 'Turno en curso' : 'Iniciar turno'}
              onPress={() => {
                shift ? endShift() : startShift()
              }}
            />
          </View>
        </ScrollView>
      </Container>
    )
  )
}

export default Dashboard
