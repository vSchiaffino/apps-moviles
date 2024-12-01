import { useColorScheme } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const StackLayout = () => {
  const scheme = useColorScheme()
  return (
    <Stack
      initialRouteName="dashboard"
      screenOptions={{
        headerTitleStyle: { fontSize: 24 },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="startshift" options={{ headerTitle: 'Iniciar Turno' }} />
      <Stack.Screen name="endshift" options={{ headerTitle: 'Terminar Turno' }} />
      <Stack.Screen name="egress" options={{ headerTitle: 'Egresos del turno' }} />
    </Stack>
  )
}

export default StackLayout
