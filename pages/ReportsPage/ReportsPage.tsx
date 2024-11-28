import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import Typography from '@/components/Typography'
import Container from '@/components/Container'
import IconCard from '@/components/IconCard'
import { router } from 'expo-router'


const ReportsScreen = () => {
  return (
    <Container>
      <View
            style={{
              padding: 16,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <IconCard icon={'podium-outline'} color={'primary'} text={'Perdida de Stock General'} onPress={()=>{console.log("Redirigir")}}></IconCard>
            <IconCard icon={'beer-outline'} color={'primary'} text={'Perdida de stock por Producto' } onPress={()=>{console.log("Redirigir")}}></IconCard>
            <IconCard icon={'archive-outline'} color={'primary'} text={'Perdida de stock por Deposito'} onPress={()=>{console.log("Redirigir")}}></IconCard>
          </View>
      
    </Container>
  )
}


export default ReportsScreen
