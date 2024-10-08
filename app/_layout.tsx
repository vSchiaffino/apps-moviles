import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  useRoute,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack, Tabs } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect } from 'react'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import { AuthProvider } from '@/context/AuthContext'
import { Ionicons } from '@expo/vector-icons'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

function tab() {
  return <></>
}
export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <Tabs
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              display: ['login', 'register'].includes(route.name)
                ? 'none'
                : 'flex',
            },
          })}
        >
          <Tabs.Screen
            name='index'
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name='home' size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen name='login' options={{ href: null }} />
          <Tabs.Screen name='register' options={{ href: null }} />
          <Tabs.Screen name='+not-found' options={{ href: null }} />
        </Tabs>
      </AuthProvider>
    </ThemeProvider>
  )
}
