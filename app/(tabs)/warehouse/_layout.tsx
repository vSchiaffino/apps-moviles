import { useColorScheme } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const StackLayout = () => {
  const scheme = useColorScheme()
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: { fontSize: 24 },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: 'Depósitos' }} />
      <Stack.Screen name="[id]" options={{ headerTitle: 'Detalle del depósito' }} />
    </Stack>
  )
}

export default StackLayout
