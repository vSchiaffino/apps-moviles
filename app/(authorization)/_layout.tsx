import { Stack } from 'expo-router'
import React from 'react'

import { useColorScheme } from '@/hooks/useColorScheme'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'

export default function AuthorizationLayout() {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='register' />
        <Stack.Screen name='login' />
      </Stack>
    </ThemeProvider>
  )
}
