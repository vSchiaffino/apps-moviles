import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Tabs } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect } from 'react'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import { AuthProvider } from '@/context/AuthContext'
import { FontAwesome6, Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from 'react-query'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
    Geist: require('../assets/fonts/GeistMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }
  const queryClient = new QueryClient()
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView>
            <Tabs
              screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                  display: ['login', 'register'].includes(route.name) ? 'none' : 'flex',
                },
              })}
            >
              <Tabs.Screen
                name="index"
                options={{
                  title: 'Home',
                  tabBarIcon: ({ focused }) => (
                    <Ionicons
                      name="home"
                      size={24}
                      color={focused ? Colors.primary[600] : Colors.gray[600]}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="profile"
                options={{
                  title: 'Perfil',
                  tabBarIcon: ({ focused }) => (
                    <Ionicons
                      name="person"
                      size={24}
                      color={focused ? Colors.primary[600] : Colors.gray[600]}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="warehouse"
                options={{
                  title: 'Depósitos',
                  tabBarIcon: ({ focused }) => (
                    <FontAwesome6
                      name="warehouse"
                      size={21}
                      color={focused ? Colors.primary[600] : Colors.gray[600]}
                    />
                  ),
                }}
              />
              <Tabs.Screen name="login" options={{ href: null }} />
              <Tabs.Screen name="register" options={{ href: null }} />
              <Tabs.Screen name="+not-found" options={{ href: null }} />
              <Tabs.Screen name="warehouseTransfer" options={{ href: null }} />
              <Tabs.Screen name="products" options={{ href: null }} />
              <Tabs.Screen name="stockManager" options={{ href: null }} />
            </Tabs>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
