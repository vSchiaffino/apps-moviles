import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import Typography from '@/components/Typography'
import Container from '@/components/Container'
import IconCard from '@/components/IconCard'
import { router } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'


const ReportsScreen = () => {
  return (
    <Container>
      <ScrollView style={{height:'100%'}}>
        <View
            style={{
              padding: 16,
              gap: 20,
            }}
          >
            <IconCard icon={'podium-outline'} color={'primary'} text={'Perdida de Stock General'} onPress={()=>{router.push('/reports/reportsExample')}}></IconCard>
            <IconCard icon={'beer-outline'} color={'primary'} text={'Perdida de stock por Producto' } onPress={()=>{router.push('/reports/reportsExample')}}></IconCard>
            <IconCard icon={'archive-outline'} color={'primary'} text={'Perdida de stock por Deposito'} onPress={()=>{router.push('/reports/reportsExample')}}></IconCard>
          </View>
      </ScrollView>
    </Container>
  )
}


export default ReportsScreen