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
      <Stack.Screen name="general-report" options={{ headerTitle: 'Reporte general'}} />
      <Stack.Screen name="product-report" options={{ headerTitle: 'Reporte de productos'}} />
      <Stack.Screen name="warehouse-report" options={{ headerTitle: 'Reporte de depositos'}} />
    </Stack>
  )
}

export default StackLayout
