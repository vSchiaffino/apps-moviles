import CardLineChart from '@/components/charts/CardLineChart'
import Container from '@/components/Container'
import IconCard from '@/components/IconCard'
import Typography from '@/components/Typography'
import useChartData from '@/hooks/useChartData'
import useShift from '@/hooks/useShift'
import { useAuthorizedUser } from '@/hooks/useUser'
import { router } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const Dashboard = () => {
  const { user } = useAuthorizedUser()
  const { shift } = useShift()
  const { chartData } = useChartData()
  function endShift() {
    router.push('/dashboard/egress')
  }

  function startShift() {
    router.push('/dashboard/startshift')
  }

  return (
    user && (
      <Container style={{ height: '100%' }}>
        <SafeAreaView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: 20,
              padding: 16,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 20,
              paddingBottom: 120,
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
            <IconCard
              icon="time-outline"
              color={shift ? 'yellow' : 'primary'}
              text={shift ? 'Turno en curso' : 'Iniciar turno'}
              onPress={() => {
                shift ? endShift() : startShift()
              }}
            />

            <CardLineChart
              title="Egresos"
              errorMessage="No hay suficientes egresos para mostrar"
              data={(chartData || []).map((data: any) => ({
                label: data.date,
                value: data.quantity,
              }))}
            />

            <IconCard
              icon="bar-chart-outline"
              color={'primary'}
              text="Reportes"
              onPress={() => {
                router.push('/reports')
              }}
            />
          </ScrollView>
        </SafeAreaView>
      </Container>
    )
  )
}

export default Dashboard
