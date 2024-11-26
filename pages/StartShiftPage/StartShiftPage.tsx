import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Container from '@/components/Container'
import InfoCard from '@/components/InfoCard'
import { Spacing } from '@/constants/Spacing'
import StyledButton from '@/components/StyledButton'
import { router } from 'expo-router'

const StartShiftPage = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('')
  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ padding: 16, height: '100%' }}
        contentContainerStyle={{ gap: Spacing.rowGap }}
      >
        {selectedWarehouse === '' && (
          <>
            <InfoCard infoText="Seleccioná un depósito para comenzar el turno" />
            <StyledButton
              label="Seleccionar Depósito"
              onPress={() => {
                router.push('/profile')
                setSelectedWarehouse('hola')
              }}
            />
          </>
        )}
      </ScrollView>
    </Container>
  )
}

export default StartShiftPage
