import Container from '@/components/Container'
import { Pressable, ScrollView, View } from 'react-native'
import React from 'react'
import InfoCard from '@/components/InfoCard'
import EgressTable from './EgressTable'
import StyledButton from '@/components/StyledButton'
import { router } from 'expo-router'
import { Spacing } from '@/constants/Spacing'
import useShift from '@/hooks/useShift'

const EgressPage = () => {
  const { shift } = useShift()

  function handleSubmit(): void {
    router.push('/(tabs)/dashboard/endshift')
  }

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: '100%' }}
        contentContainerStyle={{ paddingBottom: 250 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ padding: 16, gap: Spacing.rowGap }}>
          {shift?.egresses && shift.egresses.length ? (
            <>
              <EgressTable egresses={shift.egresses} />
            </>
          ) : (
            <Pressable onPress={() => router.push('/warehouse')}>
              <InfoCard infoText="No hay egresos registrados. Empezá a registar egresos en la pantalla de depósitos tocando aquí" />
            </Pressable>
          )}
          <StyledButton label="Cerrar turno" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </Container>
  )
}

export default EgressPage
