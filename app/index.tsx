import Card from '@/components/Card'
import Container from '@/components/Container'
import IconCard from '@/components/IconCard'
import Typography from '@/components/Typography'
import { Colors } from '@/constants/Colors'
import useUser from '@/hooks/useUser'
import { Redirect } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { LineChart } from 'react-native-gifted-charts'

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
    <ScrollView style={{ height: 800 }}>
      <Container style={{ height: '100%', gap: 20 }}>
        <Typography variant="h4">Bienvenido </Typography>
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

        <Card
          style={{
            width: '100%',
            height: 'auto',
            backgroundColor: Colors.primary[200],
            borderRadius: 16,
            margin: 0,
          }}
        >
          <View style={{ padding: 20 }}>
            <Typography color="primary" variant="body">
              Ingresos
            </Typography>
            <Typography color="primary" variant="bolder">
              $19.76M
            </Typography>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Typography color="primary" variant="bold">
                +38.98%
              </Typography>
              <Typography color="primary" variant="body">
                que los anteriores 30 días
              </Typography>
            </View>
          </View>
          <LineChart
            areaChart
            hideAxesAndRules
            curved
            yAxisLabelWidth={0}
            data={lineData}
            height={200}
            width={344}
            initialSpacing={0}
            color1={Colors.primary[600]}
            hideDataPoints
            adjustToWidth
            startFillColor1={Colors.primary[500]}
            endFillColor1={Colors.primary[200]}
            startOpacity={0.9}
            endOpacity={1}
          />
        </Card>
      </Container>
    </ScrollView>
  )
}

export default Dashboard
