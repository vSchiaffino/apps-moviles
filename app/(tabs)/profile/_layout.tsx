import { useColorScheme, Image, Pressable } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useAuthorizedUser } from '@/hooks/useUser'

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: { fontSize: 24 },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Cuenta',
        }}
      />
    </Stack>
  )
}

export default StackLayout
