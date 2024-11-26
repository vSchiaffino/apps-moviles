import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { useFonts } from 'expo-font'

const StackLayout = () => {
  const scheme = useColorScheme()
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: { fontSize: 24 },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: 'Administar Stock' }} />
      <Stack.Screen name="stock-summary" options={{ headerTitle: 'Resumen Stock' }} />
    </Stack>
  )
}

export default StackLayout
