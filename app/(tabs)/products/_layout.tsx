import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { useFonts } from 'expo-font'

const StackLayout = () => {
  const scheme = useColorScheme()
  return (
    <Stack
      screenOptions={{ headerTitleStyle: { fontSize: 24 }, headerTitleAlign: 'center' }}
      initialRouteName="products"
    >
      <Stack.Screen name="index" options={{ headerTitle: 'Productos' }} />
    </Stack>
  )
}

export default StackLayout
