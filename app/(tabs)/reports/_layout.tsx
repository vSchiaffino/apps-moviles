import { useColorScheme } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const StackLayout = () => {
  const scheme = useColorScheme()
  return (
    <Stack
      initialRouteName="reports"
      screenOptions={{
        headerTitleStyle: { fontSize: 24 },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: 'Reportes'}} />
      <Stack.Screen name="reportsExample" options={{ headerTitle: 'Reporte Ejemplo'}} />
    </Stack>
  )
}

export default StackLayout
