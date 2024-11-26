import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { useFonts } from 'expo-font'

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
      <Stack.Screen name="reports" options={{ headerTitle: 'Reportes' }} />
    </Stack>
  )
}

export default StackLayout
