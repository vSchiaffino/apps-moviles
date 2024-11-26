import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { Colors } from '@/constants/Colors'
import { useFonts } from 'expo-font'
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
      <Stack.Screen name="warehouse-detail" options={{ headerTitle: 'Detalle del depósito' }} />
    </Stack>
  )
}

export default StackLayout
