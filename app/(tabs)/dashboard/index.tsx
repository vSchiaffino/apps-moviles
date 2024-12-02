import CardLineChart from '@/components/charts/CardLineChart'
import Container from '@/components/Container'
import IconCard from '@/components/IconCard'
import Typography from '@/components/Typography'
import { Colors } from '@/constants/Colors'
import useChartData from '@/hooks/useChartData'
import useShift from '@/hooks/useShift'
import { useAuthorizedUser } from '@/hooks/useUser'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
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
            <Typography
              variant="h5"
              style={{ width: '100%', paddingTop: 10, paddingHorizontal: 10 }}
            >
              Atajos
            </Typography>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              style={{ marginHorizontal: -16 }}
              contentContainerStyle={{
                paddingTop: 2,
                paddingBottom: 10,
                gap: 20,
                paddingHorizontal: 16,
              }}
              keyboardShouldPersistTaps="handled"
            >
              <IconCard
                style={{ width: 125, height: 125 }}
                icon={shift ? 'alert-outline' : 'time-outline'}
                color={shift ? 'danger' : 'primary'}
                text={shift ? 'Turno activo' : 'Iniciar turno'}
                onPress={() => {
                  shift ? endShift() : startShift()
                }}
                isShiftActive={!!shift}
              />
              <IconCard
                style={{ width: 125, height: 125 }}
                icon="warehouse"
                color={'gray'}
                text="Depósitos"
                onPress={() => {
                  router.push('/warehouse')
                }}
              />
              <IconCard
                style={{ width: 125, height: 125 }}
                icon="cube-outline"
                color={'primary'}
                text="Productos"
                onPress={() => {
                  router.push('/products')
                }}
              />
              <IconCard
                style={{ width: 125, height: 125 }}
                icon="person"
                color={'primary'}
                text="Cuenta"
                onPress={() => {
                  router.push('/profile')
                }}
              />
            </ScrollView>
            <Typography
              variant="h5"
              style={{ width: '100%', paddingTop: 10, paddingHorizontal: 10 }}
            >
              Métricas
            </Typography>
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
