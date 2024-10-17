import Container from '@/components/Container'
import IconCard from '@/components/IconCard'
import OutlinedSelect from '@/components/OutlinedSelect/OutlinedSelect'
import Typography from '@/components/Typography'
import useUser from '@/hooks/useUser'
import { Redirect, router } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const Dashboard = () => {
  const [option, setOption] = React.useState('')
  const { user } = useUser()
  if (!user) return <Redirect href="/login" />
  return (
    <ScrollView style={{ height: 800 }}>
      <Container style={{ height: '100%' }}>
        <Typography variant="h4">Bienvenido </Typography>
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
            onPress={() => router.push('/warehouseTransfer')}
          />
          <IconCard icon="ban-outline" color={'danger'} text="Anulaciones" />
        </View>
        <View style={{ gap: 20, marginTop: 20 }}>
          <OutlinedSelect
            label="Equipos de futbol"
            options={[
              'river',
              'boca',
              'racing',
              'independiente',
              'san lorenzo',
              'huracan',
              'velez',
            ]}
            option={option}
            setOption={setOption}
          />
        </View>
      </Container>
    </ScrollView>
  )
}

export default Dashboard
